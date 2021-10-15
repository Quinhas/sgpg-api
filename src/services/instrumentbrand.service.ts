import { PrismaClient } from "@prisma/client";
import {
  InstrumentBrand,
  InstrumentBrandDTO
} from "../models/instrumentbrand.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<InstrumentBrand[]> => {
  const instrumentBrands = await prisma.instrumentbrand.findMany();
  return instrumentBrands;
};

export const findByID = async (id: number): Promise<InstrumentBrand | null> => {
  const instrumentBrand = await prisma.instrumentbrand.findUnique({
    where: { instrumentbrand_id: id },
  });
  return instrumentBrand;
};

export const findUnique = async (
  name: string
): Promise<InstrumentBrand | null> => {
  const instrumentBrand = await prisma.instrumentbrand.findUnique({
    where: { instrumentbrand_name: name },
  });
  return instrumentBrand;
};

export const create = async (
  newInstrumentBrand: InstrumentBrandDTO
): Promise<InstrumentBrand> => {
  const instrumentBrand = await prisma.instrumentbrand.create({
    data: newInstrumentBrand,
  });
  return instrumentBrand;
};

export const update = async (
  id: number,
  _updatedInstrumentBrand: Partial<InstrumentBrandDTO>
): Promise<InstrumentBrand> => {
  const updatedInstrumentBrand = await prisma.instrumentbrand.update({
    data: _updatedInstrumentBrand,
    where: { instrumentbrand_id: id },
  });
  return updatedInstrumentBrand;
};

export const remove = async (id: number): Promise<InstrumentBrand> => {
  const deletedInstrumentBrand = await prisma.instrumentbrand.delete({
    where: { instrumentbrand_id: id },
  });
  return deletedInstrumentBrand;
};
