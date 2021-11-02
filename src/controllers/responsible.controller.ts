import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Responsible, ResponsibleDTO } from "../models/responsible.interface";
import * as ResponsibleService from "../services/responsible.service";

export const getAllResponsibles = async (req: Request, res: Response) => {
  try {
    const responsibles: Responsible[] = await ResponsibleService.findAll();
    res.status(200).send({
      message: `${responsibles.length} responsáveis retornadas.`,
      data: responsibles,
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

export const getResponsibleByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const _responsible: Responsible | null = await ResponsibleService.findByID(id);
    if (_responsible) {
      res.status(200).send({
        message: `Responsável encontrado com sucesso.`,
        data: _responsible,
      });
    } else {
      res.status(404).send({
        message: "Responsável não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createResponsible = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _responsible: ResponsibleDTO = {
      responsible_name: req.body.responsible_name,
      responsible_cpf: req.body.responsible_cpf,
      responsible_email: req.body.responsible_email,
      responsible_phone: req.body.responsible_phone,
      responsible_addr: req.body.responsible_addr,
      created_by: req.body.created_by,
    };

    const existingResponsible: Responsible  | null =
    await ResponsibleService.findUnique(
      _responsible.responsible_cpf,
      _responsible.responsible_email,
      _responsible.responsible_phone,
    );
    if (existingResponsible) {
      next(
        new HttpException(404, `Responsável já está cadastrado no banco de dados.`)
      );
      return;
    }

    const newResponsible: Responsible | null = await ResponsibleService.create(_responsible);

    res.status(201).send({
      message: `Responsável criado com sucesso.`,
      data: newResponsible,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateResponsible = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _responsible: Partial<Responsible> = {
    responsible_name: req.body.responsible_name,
    responsible_cpf: req.body.responsible_cpf,
    responsible_email: req.body.responsible_email,
    responsible_phone: req.body.responsible_phone,
    responsible_addr: req.body.responsible_addr,
    created_by: req.body.created_by,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  try {
    const existingResponsible: Responsible | null = await ResponsibleService.findByID(id);
    if (!existingResponsible) {
      next(new HttpException(404, `Responsável de ID ${id} não existe.`));
      return;
    }

    const updatedResponsible: Responsible | null = await ResponsibleService.update(id, _responsible);

    res.status(200).send({
      message: `Responsável atualizado com sucesso.`,
      data: updatedResponsible,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeResponsible = async (
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
    const existingResponsible: Responsible | null = await ResponsibleService.findByID(id);
    if (!existingResponsible) {
      next(new HttpException(404, `Responsável de ID ${id} não existe.`));
      return;
    }

    const _responsible: Responsible | null = await ResponsibleService.remove(id);
    res.status(200).send({
      message: `Turma excluída com sucesso.`,
      data: _responsible,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateResponsibleDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _responsible: Partial<Responsible> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_responsible);
  try {
    const existingResponsible: Responsible | null = await ResponsibleService.findByID(id);
    if (!existingResponsible) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedResponsible: Responsible | null = await ResponsibleService.update(id,_responsible);

    res.status(200).send({
      message: `Responsiblee deletada com sucesso.`,
      data: deletedResponsible,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

