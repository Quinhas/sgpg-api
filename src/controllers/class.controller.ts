import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Class, ClassDTO } from "../models/class.interface";
import * as ClassService from "../services/class.service";

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes: Class[] = await ClassService.findAll();
    res.status(200).send({
      message: `${classes.length} turmas retornadas.`,
      data: classes,
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

export const getClassByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const _class: Class | null = await ClassService.findByID(id);
    if (_class) {
      res.status(200).send({
        message: `Turma encontrada com sucesso.`,
        data: _class,
      });
    } else {
      res.status(404).send({
        message: "Turma não encontrada.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _class: ClassDTO = {
      class_name: req.body.class_name,
      class_days: req.body.class_days,
      class_desc: req.body.class_desc,
      class_duration: req.body.class_duration,
      class_teacher: req.body.class_teacher,
      created_by: req.body.created_by,
    };

    const existingClass: Class | null = await ClassService.findUnique(
      _class.class_name
    );
    if (existingClass) {
      next(
        new HttpException(404, `Turma já está cadastrada no banco de dados.`)
      );
      return;
    }

    const newClass: Class | null = await ClassService.create(_class);

    res.status(201).send({
      message: `Turma criada com sucesso.`,
      data: newClass,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _class: Partial<Class> = {
    class_name: req.body.class_name,
    class_days: req.body.class_days,
    class_desc: req.body.class_desc,
    class_duration: req.body.class_duration,
    class_teacher: req.body.class_teacher,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  try {
    const existingClass: Class | null = await ClassService.findByID(id);
    if (!existingClass) {
      next(new HttpException(404, `Turma de ID ${id} não existe.`));
      return;
    }

    const updatedClass: Class | null = await ClassService.update(id, _class);

    res.status(200).send({
      message: `Turma atualizada com sucesso.`,
      data: updatedClass,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeClass = async (
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
    const existingClass: Class | null = await ClassService.findByID(id);
    if (!existingClass) {
      next(new HttpException(404, `Turma de ID ${id} não existe.`));
      return;
    }

    const _class: Class | null = await ClassService.remove(id);
    res.status(200).send({
      message: `Turma excluída com sucesso.`,
      data: _class,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateClassDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _class: Partial<Class> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_class);
  try {
    const existingClass: Class | null = await ClassService.findByID(id);
    if (!existingClass) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedClass: Class | null = await ClassService.update(id,_class);

    res.status(200).send({
      message: `Classe deletada com sucesso.`,
      data: deletedClass,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
