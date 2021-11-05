import { PrismaClient } from "@prisma/client";
import {
  InstrumentType,
  InstrumentTypeDTO
} from "../models/instrumenttype.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<InstrumentType[]> => {
  const instrumenttype = await prisma.instrumenttype.findMany();
  return instrumenttype;
};
export const findUnique = async (
  name: string
): Promise<InstrumentType | null> => {
  const _instrumenttype = await prisma.instrumenttype.findUnique({
    where: { instrumenttype_name: name },
  });
  return _instrumenttype;
};

export const findByID = async (id: number): Promise<InstrumentType | null> => {
  const _instrumenttype = await prisma.instrumenttype.findUnique({
    where: { instrumenttype_id: id },
  });
  return _instrumenttype;
};

export const create = async (
  newIntrumentType: InstrumentTypeDTO
): Promise<InstrumentType> => {
  const _instrumenttype = await prisma.instrumenttype.create({
    data: newIntrumentType,
  });
  return _instrumenttype;
};

export const update = async (
  id: number,
  _updatedIntrumentType: Partial<InstrumentTypeDTO>
): Promise<InstrumentType> => {
  const updatedIntrumentType = await prisma.instrumenttype.update({
    data: _updatedIntrumentType,
    where: { instrumenttype_id: id },
  });
  return updatedIntrumentType;
};

export const remove = async (id: number): Promise<InstrumentType> => {
  const deletedInstrumentType = await prisma.instrumenttype.delete({
    where: { instrumenttype_id: id },
  });
  return deletedInstrumentType;
};
