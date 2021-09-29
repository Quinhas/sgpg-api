import { Prisma } from ".prisma/client";

export interface StudentDTO {
  student_name: string;
  student_rg: string | null;
  student_cpf: string;
  student_email: string | null;
  student_phone: string | null;
  student_addr: string;
  student_responsible: number | null;
  student_scholarship: Prisma.Decimal | null;
  created_by: number;
}

export interface Student extends StudentDTO {
  student_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  is_deleted: boolean | null;
}
