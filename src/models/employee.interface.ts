import { Prisma } from ".prisma/client";

export interface EmployeeDTO {
  employee_name: string;
  employee_cpf: string;
  employee_email: string;
  employee_password: string;
  employee_phone: string;
  employee_addr: string;
  employee_salary: Prisma.Decimal;
  employee_role: number;
  created_by: number;
  is_deleted: boolean | null;
}

export interface Employee extends EmployeeDTO {
  employee_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
export interface Login {
  employee_email: string;
  employee_password: string;
}
