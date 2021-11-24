import { PrismaClient } from "@prisma/client";
import { Class, ClassDTO } from "../models/class.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Class[]> => {
  const classes = await prisma.classes.findMany({
    include: {
      employees: true,
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
