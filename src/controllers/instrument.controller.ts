import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Instrument, InstrumentDTO } from "../models/instrument.interface";
import * as InstrumentService from "../services/instrument.service";

export const getAllInstruments = async (req: Request, res: Response) => {
  try {
    const instruments: Instrument[] = await InstrumentService.findAll();
    res.status(200).send({
      message: `${instruments.length} instrumentos retornados.`,
      records: instruments,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getInstrumentByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const instrument: Instrument | null = await InstrumentService.findByID(id);
    if (instrument) {
      res.status(200).send({
        message: `Instrumento encontrado com sucesso.`,
        records: instrument,
      });
    } else {
      res.status(404).send({
        message: "Instrumento não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createInstrument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _instrument: InstrumentDTO = {
      instrument_type: req.body.instrument_type,
      instrument_brand: req.body.instrument_brand,
      instrument_model: req.body.instrument_model,
      instrument_student: req.body.instrument_student,
      created_by: req.body.created_by,
      is_deleted: req.body.is_deleted,
    };

    const instrument: Instrument | null = await InstrumentService.create(
      _instrument
    );

    res.status(201).send({
      message: `Instrumento criado com sucesso.`,
      records: instrument,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateInstrument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrument: Partial<Instrument> = {
    instrument_type: req.body.instrument_type,
    instrument_brand: req.body.instrument_brand,
    instrument_model: req.body.instrument_model,
    instrument_student: req.body.instrument_student,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrument);
  try {
    const existingInstrument: Instrument | null =
      await InstrumentService.findByID(id);
    if (!existingInstrument) {
      next(new HttpException(404, `Instrumento de ID ${id} não existe.`));
      return;
    }

    const instrument: Instrument | null = await InstrumentService.update(
      id,
      _instrument
    );

    res.status(200).send({
      message: `Instrumento atualizado com sucesso.`,
      records: instrument,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeInstrument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  try {
    const existingInstrument: Instrument | null =
      await InstrumentService.findByID(id);
    if (!existingInstrument) {
      next(new HttpException(404, `Instrumento de ID ${id} não existe.`));
      return;
    }

    const instrument: Instrument | null = await InstrumentService.remove(id);
    res.status(200).send({
      message: `Instrumento excluído com sucesso.`,
      records: instrument,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateInstrumentDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrument: Partial<Instrument> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrument);
  try {
    const existingInstrument: Instrument | null = await InstrumentService.findByID(id);
    if (!existingInstrument) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedInstrument: Instrument | null = await InstrumentService.update(id,_instrument);

    res.status(200).send({
      message: `Instrumento deletado com sucesso.`,
      records: deletedInstrument,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
