import { PrismaClient } from "@prisma/client";
import { EmployeeDTO, EmployeeResponse } from "../models/employee.interface";

const prisma = new PrismaClient();

const select = {
  employee_id: true,
  employee_name: true,
  employee_cpf: true,
  employee_email: true,
  employee_phone: true,
  employee_addr: true,
  employee_salary: true,
  employee_role: true,
  created_by: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  is_deleted: true,
};

export const findAll = async (): Promise<EmployeeResponse[]> => {
  const employees = await prisma.employees.findMany({
    select: select,
  });
  return employees;
};

export const findByID = async (
  id: number
): Promise<EmployeeResponse | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_id: id },
    select: select,
  });
  return employee;
};

export const findByEmail = async (
  email: string
): Promise<EmployeeResponse | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_email: email },
    select: select,
  });
  return employee;
};

export const findByCPF = async (
  cpf: string
): Promise<EmployeeResponse | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_cpf: cpf },
    select: select,
  });
  return employee;
};

export const findByPhone = async (
  phone: string
): Promise<EmployeeResponse | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_phone: phone },
    select: select,
  });
  return employee;
};

export const findUnique = async (
  cpf: string,
  email: string,
  phone: string
): Promise<EmployeeResponse | null> => {
  const employee = await prisma.employees.findMany({
    where: {
      OR: [
        {
          employee_cpf: cpf,
        },
        {
          employee_email: email,
        },
        {
          employee_phone: phone,
        },
      ],
    },
    select: select,
  });
  return employee[0];
};

export const create = async (
  newEmployee: EmployeeDTO
): Promise<EmployeeResponse> => {
  const employee = await prisma.employees.create({
    data: newEmployee,
    select: select,
  });
  return employee;
};

export const update = async (
  id: number,
  updatedEmploye: Partial<EmployeeDTO>
): Promise<EmployeeResponse> => {
  const updatedEmployee = await prisma.employees.update({
    data: updatedEmploye,
    where: { employee_id: id },
    select: select,
  });
  return updatedEmployee;
};

export const remove = async (id: number): Promise<EmployeeResponse> => {
  const deletedEmployee = await prisma.employees.delete({
    where: { employee_id: id },
    select: select,
  });
  return deletedEmployee;
};
