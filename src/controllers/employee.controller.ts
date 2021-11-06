import { Prisma } from ".prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Employee, EmployeeDTO } from "../models/employee.interface";
import * as EmployeeService from "../services/employee.service";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees: Employee[] = await EmployeeService.findAll();
    res.status(200).send({
      message: `${employees.length} funcionários retornados.`,
      records: employees,
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
    const employee: Employee | null = await EmployeeService.findByID(id);
    if (employee) {
      res.status(200).send({
        message: `Funcionário encontrado com sucesso.`,
        records: employee,
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
      is_deleted: req.body.is_deleted,
    };

    const existingEmployee: Employee | null = await EmployeeService.findUnique(
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

    const employee: Employee | null = await EmployeeService.create(_employee);

    res.status(201).send({
      message: `Funcionário criado com sucesso.`,
      records: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    console.log(error);
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

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.employee_password, salt);

  const _employee: Partial<Employee> = {
    employee_name: req.body.employee_name,
    employee_email: req.body.employee_email,
    employee_password: hash,
    employee_phone: req.body.employee_phone,
    employee_addr: req.body.employee_addr,
    employee_salary: new Prisma.Decimal(req.body.employee_salary),
    employee_role: req.body.employee_role,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_employee);
  try {
    const existingEmployee: Employee | null = await EmployeeService.findByID(
      id
    );
    if (!existingEmployee) {
      next(new HttpException(404, `Funcionário de ID ${id} não existe.`));
      return;
    }

    const employee: Employee | null = await EmployeeService.update(
      id,
      _employee
    );

    res.status(200).send({
      message: `Funcionário atualizado com sucesso.`,
      records: employee,
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
    const existingEmployee: Employee | null = await EmployeeService.findByID(
      id
    );
    if (!existingEmployee) {
      next(new HttpException(404, `Funcionário de ID ${id} não existe.`));
      return;
    }

    const employee: Employee | null = await EmployeeService.remove(id);
    res.status(200).send({
      message: `Funcionário excluído com sucesso.`,
      records: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateEmployeeDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.employee_password, salt);

  const _employee: Partial<Employee> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_employee);
  try {
    const existingEmployee: Employee | null = await EmployeeService.findByID(
      id
    );
    if (!existingEmployee) {
      next(new HttpException(404, `Funcionário de ID ${id} não existe.`));
      return;
    }

    const employee: Employee | null = await EmployeeService.update(
      id,
      _employee
    );

    res.status(200).send({
      message: `Funcionário excluído com sucesso..`,
      records: employee,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { employee_email, employee_password } = req.body;

  try {
    if (!employee_email || !employee_password) {
      next(
        new HttpException(400, `O e-mail e a senha são dados obrigatórios.`)
      );
      return;
    }

    const existingEmployee: Employee | null = await EmployeeService.findByEmail(
      employee_email
    );

    if (!existingEmployee) {
      next(
        new HttpException(404, `Funcionário não cadastrado no banco de dados.`)
      );
      return;
    }

    const check = await bcrypt.compare(
      employee_password,
      existingEmployee.employee_password
    );

    const records: Employee = {
      employee_id: existingEmployee.employee_id,
      employee_name: existingEmployee.employee_name,
      employee_email: existingEmployee.employee_email,
      employee_phone: existingEmployee.employee_phone,
      employee_role: existingEmployee.employee_role,
      created_by: existingEmployee.created_by,
      created_at: existingEmployee.created_at,
      updated_at: existingEmployee.updated_at,
      deleted_at: existingEmployee.deleted_at,
      is_deleted: existingEmployee.is_deleted,
      employee_addr: existingEmployee.employee_addr,
      employee_cpf: existingEmployee.employee_cpf,
      employee_salary: existingEmployee.employee_salary,
      employee_password: existingEmployee.employee_password,
    };

    if (check) {
      res.status(200).send({
        message: `Funcionário logado com sucesso.`,
        records,
      });
    } else {
      next(new HttpException(403, `E-mail e/ou senha estão incorretos.`));
      return;
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
