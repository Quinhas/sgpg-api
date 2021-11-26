import { PrismaClient } from "@prisma/client";
import { Responsible, ResponsibleDTO } from "../models/responsible.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Responsible[]> => {
  const responsibles = await prisma.responsibles.findMany();
  return responsibles;
};

export const findUnique = async (
  cpf: string,
  email: string | null,
  phone: string | null
): Promise<Responsible | null> => {
  const responsible = await prisma.responsibles.findMany({
    where: {
      OR: [
        {
          responsible_cpf: cpf,
        },
        {
          responsible_email: email,
        },
        {
          responsible_phone: phone ?? undefined,
        },
      ],
    },
  });
  return responsible[0];
};

export const findByID = async (id: number): Promise<Responsible | null> => {
  const _responsible = await prisma.responsibles.findUnique({
    where: { responsible_id: id },
  });
  return _responsible;
};

export const create = async (
  newResponsible: ResponsibleDTO
): Promise<Responsible> => {
  const _responsible = await prisma.responsibles.create({
    data: newResponsible,
  });
  return _responsible;
};

export const update = async (
  id: number,
  _updatedResponsible: Partial<ResponsibleDTO>
): Promise<Responsible> => {
  const updatedResponsible = await prisma.responsibles.update({
    data: _updatedResponsible,
    where: { responsible_id: id },
  });
  return updatedResponsible;
};

export const remove = async (id: number): Promise<Responsible> => {
  const deletedResponsible = await prisma.responsibles.delete({
    where: { responsible_id: id },
  });
  return deletedResponsible;
};
