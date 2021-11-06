import { PrismaClient } from "@prisma/client";
import { Employee, EmployeeDTO } from "../models/employee.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Employee[]> => {
  const employees = await prisma.employees.findMany({
    // select: select,
    include: {
      roles: true,
    },
  });
  return employees;
};

export const findByID = async (id: number): Promise<Employee | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_id: id },
    include: {
      roles: true,
    },
  });
  return employee;
};

export const findByEmail = async (email: string): Promise<Employee | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_email: email },
  });
  return employee;
};

export const findByCPF = async (cpf: string): Promise<Employee | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_cpf: cpf },
  });
  return employee;
};

export const findByPhone = async (phone: string): Promise<Employee | null> => {
  const employee = await prisma.employees.findUnique({
    where: { employee_phone: phone },
  });
  return employee;
};

export const findUnique = async (
  cpf: string,
  email: string,
  phone: string
): Promise<Employee | null> => {
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
  });
  return employee[0];
};

export const create = async (newEmployee: EmployeeDTO): Promise<Employee> => {
  const employee = await prisma.employees.create({
    data: newEmployee,
  });
  return employee;
};

export const update = async (
  id: number,
  _updatedEmployee: Partial<EmployeeDTO>
): Promise<Employee> => {
  const updatedEmployee = await prisma.employees.update({
    data: _updatedEmployee,
    where: { employee_id: id },
  });
  return updatedEmployee;
};

export const remove = async (id: number): Promise<Employee> => {
  const deletedEmployee = await prisma.employees.delete({
    where: { employee_id: id },
  });
  return deletedEmployee;
};
