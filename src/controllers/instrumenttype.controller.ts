import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import {
  InstrumentType,
  InstrumentTypeDTO
} from "../models/instrumenttype.interface";
import * as InstrumentTypeService from "../services/instrumenttype.service";

export const getAllInstrumentTypes = async (req: Request, res: Response) => {
  try {
    const instrumentTypes: InstrumentType[] =
      await InstrumentTypeService.findAll();
    res.status(200).send({
      message: `${instrumentTypes.length} tipos retornados.`,
      records: instrumentTypes,
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

export const getInstrumentTypesByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const instrumentType: InstrumentType | null =
      await InstrumentTypeService.findByID(id);
    if (instrumentType) {
      res.status(200).send({
        message: `Tipo encontrado com sucesso.`,
        records: instrumentType,
      });
    } else {
      res.status(404).send({
        message: "Marca não encontrada.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createInstrumentType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _instrumentType: InstrumentTypeDTO = {
      instrumenttype_name: req.body.instrumenttype_name,
      instrumenttype_desc: req.body.instrumenttype_desc,
      created_by: req.body.created_by,
      is_deleted: req.body.is_deleted,
    };

    const existingInstrumentType: InstrumentType | null =
      await InstrumentTypeService.findUnique(
        _instrumentType.instrumenttype_name
      );
    if (existingInstrumentType) {
      next(
        new HttpException(404, `Tipo já está cadastrado no banco de dados.`)
      );
      return;
    }

    const instrumentType: InstrumentType | null =
      await InstrumentTypeService.create(_instrumentType);

    res.status(201).send({
      message: `Tipo criado com sucesso.`,
      records: instrumentType,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateInstrumentType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrumentType: Partial<InstrumentType> = {
    instrumenttype_name: req.body.instrumenttype_name,
    instrumenttype_desc: req.body.instrumenttype_desc,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrumentType);
  try {
    const existingInstrumentType: InstrumentType | null =
      await InstrumentTypeService.findByID(id);
    if (!existingInstrumentType) {
      next(new HttpException(404, `Tipo de ID ${id} não existe.`));
      return;
    }

    const instrumentType: InstrumentType | null =
      await InstrumentTypeService.update(id, _instrumentType);

    res.status(200).send({
      message: `Tipo atualizado com sucesso.`,
      records: instrumentType,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeInstrumentType = async (
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
    const existingInstrumentType: InstrumentType | null =
      await InstrumentTypeService.findByID(id);
    if (!existingInstrumentType) {
      next(new HttpException(404, `Tipo de ID ${id} não existe.`));
      return;
    }

    const instrumentType: InstrumentType | null =
      await InstrumentTypeService.remove(id);
    res.status(200).send({
      message: `Tipo excluído com sucesso.`,
      records: instrumentType,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateInstrumentTypeDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrumentType: Partial<InstrumentType> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrumentType);
  try {
    const existingInstrumentType: InstrumentType | null =
      await InstrumentTypeService.findByID(id);
    if (!existingInstrumentType) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedInstrumentType: InstrumentType | null =
      await InstrumentTypeService.update(id, _instrumentType);

    res.status(200).send({
      message: `InstrumentTypee deletada com sucesso.`,
      records: deletedInstrumentType,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
