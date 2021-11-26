import { PrismaClient } from "@prisma/client";
import { Class, ClassDTO } from "../models/class.interface";
import { SocDTO, StudentOfClass } from "../models/soc.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Class[]> => {
  const classes = await prisma.classes.findMany({
    include: {
      employees: true,
      studentsofclass: {
        include: { students: true },
      },
    },
  });
  return classes;
};

export const findByID = async (id: number): Promise<Class | null> => {
  const _class = await prisma.classes.findUnique({
    where: { class_id: id },
  });
  return _class;
};

export const findUnique = async (name: string): Promise<Class | null> => {
  const _class = await prisma.classes.findUnique({
    where: { class_name: name },
  });
  return _class;
};

export const create = async (newClass: ClassDTO): Promise<Class> => {
  const _class = await prisma.classes.create({
    data: newClass,
  });
  return _class;
};

export const findSocUnique = async (
  classId: number,
  studentId: number
): Promise<StudentOfClass | null> => {
  const studentClass = await prisma.studentsofclass.findUnique({
    where: {
      student_id_class_id: {
        class_id: classId,
        student_id: studentId,
      },
    },
  });
  return studentClass;
};

export const createStudentOfClass = async (
  newSoc: SocDTO
): Promise<StudentOfClass> => {
  const studentClass = await prisma.studentsofclass.create({
    data: newSoc,
  });
  return studentClass;
};

export const removeStudentOfClass = async (
  classId: number,
  studentId: number
): Promise<StudentOfClass> => {
  const studentClass = await prisma.studentsofclass.delete({
    where: {
      student_id_class_id: {
        class_id: classId,
        student_id: studentId,
      },
    },
  });
  return studentClass;
};

export const update = async (
  id: number,
  _updatedClass: Partial<ClassDTO>
): Promise<Class> => {
  const updatedClass = await prisma.classes.update({
    data: _updatedClass,
    where: { class_id: id },
  });
  return updatedClass;
};

export const remove = async (id: number): Promise<Class> => {
  const deletedClass = await prisma.classes.delete({
    where: { class_id: id },
  });
  return deletedClass;
};
