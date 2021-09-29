import { Prisma } from ".prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import {
  Employee,
  EmployeeDTO,
  EmployeeResponse
} from "../models/employee.interface";
import * as EmployeeService from "../services/employee.service";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees: EmployeeResponse[] = await EmployeeService.findAll();
    res.status(200).send({
      message: `${employees.length} funcionários retornados.`,
      data: employees,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getEmployeeByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const employee: EmployeeResponse | null = await EmployeeService.findByID(
      id
    );
    if (employee) {
      res.status(200).send({
        message: `Funcionário encontrado com sucesso.`,
        data: employee,
      });
    } else {
      res.status(404).send({
        message: "Funcionário não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.employee_password, salt);

    const _employee: EmployeeDTO = {
      employee_cpf: req.body.employee_cpf,
      employee_password: hash,
      employee_addr: req.body.employee_addr,
      employee_email: req.body.employee_email,
      employee_salary: new Prisma.Decimal(req.body.employee_salary),
      employee_role: req.body.employee_role,
      employee_name: req.body.employee_name,
      employee_phone: req.body.employee_phone,
      created_by: req.body.created_by,
    };

    const existingEmployee: EmployeeResponse | null =
      await EmployeeService.findUnique(
        _employee.employee_cpf,
        _employee.employee_email,
        _employee.employee_phone
      );
    if (existingEmployee) {
      next(
        new HttpException(
          404,
          `Funcionário (CPF, e-mail ou telefone) já está cadastrado no banco de dados.`
        )
      );
      return;
    }

    const employee: EmployeeResponse | null = await EmployeeService.create(
      _employee
    );

    res.status(201).send({
      message: `Funcionário criado com sucesso.`,
      data: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _employee: Partial<Employee> = {
    employee_addr: req.body.employee_addr,
    employee_email: req.body.employee_email,
    employee_salary: new Prisma.Decimal(req.body.employee_salary),
    employee_role: req.body.employee_role,
    employee_name: req.body.employee_name,
    employee_phone: req.body.employee_phone,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_employee);
  try {
    const existingEmployee: EmployeeResponse | null =
      await EmployeeService.findByID(id);
    if (!existingEmployee) {
      next(new HttpException(404, `Funcionário de ID ${id} não existe.`));
      return;
    }

    const employee: EmployeeResponse | null = await EmployeeService.update(
      id,
      _employee
    );

    res.status(200).send({
      message: `Funcionário atualizado com sucesso.`,
      data: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  try {
    const existingEmployee: EmployeeResponse | null =
      await EmployeeService.findByID(id);
    if (!existingEmployee) {
      next(new HttpException(404, `Funcionário de ID ${id} não existe.`));
      return;
    }

    const employee: EmployeeResponse | null = await EmployeeService.remove(id);
    res.status(200).send({
      message: `Funcionário excluído com sucesso.`,
      data: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
