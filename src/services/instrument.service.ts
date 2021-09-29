import { PrismaClient } from "@prisma/client";
import { Instrument, InstrumentDTO } from "../models/instrument.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Instrument[]> => {
  const instruments = await prisma.instruments.findMany();
  return instruments;
};

export const findByID = async (id: number): Promise<Instrument | null> => {
  const instrument = await prisma.instruments.findUnique({
    where: { instrument_id: id },
  });
  return instrument;
};

export const create = async (
  newInstrument: InstrumentDTO
): Promise<Instrument> => {
  const instrument = await prisma.instruments.create({
    data: newInstrument,
  });
  return instrument;
};

export const update = async (
  id: number,
  _updatedInstrument: Partial<InstrumentDTO>
): Promise<Instrument> => {
  const updatedInstrument = await prisma.instruments.update({
    data: _updatedInstrument,
    where: { instrument_id: id },
  });
  return updatedInstrument;
};

export const remove = async (id: number): Promise<Instrument> => {
  const deletedInstrument = await prisma.instruments.delete({
    where: { instrument_id: id },
  });
  return deletedInstrument;
};
