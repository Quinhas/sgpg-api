import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import {
  InstrumentBrand,
  InstrumentBrandDTO
} from "../models/instrumentbrand.interface";
import * as InstrumentBrandService from "../services/instrumentbrand.service";

export const getAllInstrumentBrands = async (req: Request, res: Response) => {
  try {
    const instrumentBrands: InstrumentBrand[] =
      await InstrumentBrandService.findAll();
    res.status(200).send({
      message: `${instrumentBrands.length} marcas retornados.`,
      records: instrumentBrands,
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

export const getInstrumentBrandByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const instrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.findByID(id);
    if (instrumentBrand) {
      res.status(200).send({
        message: `Marca encontrada com sucesso.`,
        records: instrumentBrand,
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

export const createInstrumentBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _instrumentBrand: InstrumentBrandDTO = {
      instrumentbrand_name: req.body.instrumentbrand_name,
      instrumentbrand_desc: req.body.instrumentbrand_desc,
      instrumentbrand_logo: req.body.instrumentbrand_logo,
      created_by: req.body.created_by,
      is_deleted: req.body.is_deleted,
    };

    const existingInstrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.findUnique(
        _instrumentBrand.instrumentbrand_name
      );
    if (existingInstrumentBrand) {
      next(
        new HttpException(404, `Marca já está cadastrada no banco de dados.`)
      );
      return;
    }

    const instrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.create(_instrumentBrand);

    res.status(201).send({
      message: `Marca criada com sucesso.`,
      records: instrumentBrand,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateInstrumentBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrumentBrand: Partial<InstrumentBrand> = {
    instrumentbrand_name: req.body.instrumentbrand_name,
    instrumentbrand_desc: req.body.instrumentbrand_desc,
    instrumentbrand_logo: req.body.instrumentbrand_logo,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrumentBrand);
  try {
    const existingInstrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.findByID(id);
    if (!existingInstrumentBrand) {
      next(new HttpException(404, `Marca de ID ${id} não existe.`));
      return;
    }

    const instrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.update(id, _instrumentBrand);

    res.status(200).send({
      message: `Marca atualizada com sucesso.`,
      records: instrumentBrand,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeInstrumentBrand = async (
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
    const existingInstrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.findByID(id);
    if (!existingInstrumentBrand) {
      next(new HttpException(404, `Marca de ID ${id} não existe.`));
      return;
    }

    const instrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.remove(id);
    res.status(200).send({
      message: `Marca excluída com sucesso.`,
      records: instrumentBrand,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateInstrumentBrandDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _instrumentBrand: Partial<InstrumentBrand> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_instrumentBrand);
  try {
    const existingInstrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.findByID(id);
    if (!existingInstrumentBrand) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedInstrumentBrand: InstrumentBrand | null =
      await InstrumentBrandService.update(id, _instrumentBrand);

    res.status(200).send({
      message: `InstrumentBrando deletado com sucesso.`,
      records: deletedInstrumentBrand,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
