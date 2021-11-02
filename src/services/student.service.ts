import { PrismaClient } from "@prisma/client";
import { Student, StudentDTO } from "../models/student.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Student[]> => {
    const students = await prisma.students.findMany();
    return students;
  };
  
  export const findByID = async (id: number): Promise<Student | null> => {
    const _student = await prisma.students.findUnique({
      where: { student_id: id },
    });
    return _student;
  };
 
  export const findUnique = async (
    cpf: string,
    email: string | null,
    phone: string | null
  ): Promise<Student | null> => {
    const student = await prisma.students.findMany({
      where: {
        OR: [
          {
            student_cpf: cpf,
          },
          {
            student_email: email,
          },
          {
            student_phone: phone,
          },
        ],
      },
    });
    return student[0];
  };
  
  export const create = async (newStudent: StudentDTO): Promise<Student> => {
    const _student = await prisma.students.create({
      data: newStudent,
    });
    return _student;
  };
  
  export const update = async (
    id: number,
    _updatedStudent: Partial<StudentDTO>
  ): Promise<Student> => {
    const updatedStudent = await prisma.students.update({
      data: _updatedStudent,
      where: { student_id: id },
    });
    return updatedStudent;
  };
  
  export const remove = async (id: number): Promise<Student> => {
    const deletedStudent = await prisma.students.delete({
      where: { student_id: id },
    });
    return deletedStudent;
  };