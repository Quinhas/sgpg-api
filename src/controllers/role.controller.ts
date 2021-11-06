import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Role, RoleDTO } from "../models/role.interface";
import * as RoleService from "../services/role.service";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles: Role[] = await RoleService.findAll();
    res.status(200).send({
      message: `${roles.length} cargos retornados.`,
      records: roles,
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

export const getRoleByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const role: Role | null = await RoleService.findByID(id);
    if (role) {
      res.status(200).send({
        message: `Cargo encontrado com sucesso.`,
        records: role,
      });
    } else {
      res.status(404).send({
        message: "Cargo não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _role: RoleDTO = {
      role_title: req.body.role_title,
      role_desc: req.body.role_desc,
      created_by: req.body.created_by,
      is_deleted: req.body.is_deleted,
    };

    const existingRole: Role | null = await RoleService.findUnique(
      _role.role_title
    );
    if (existingRole) {
      next(
        new HttpException(404, `Cargo já está cadastrado no banco de dados.`)
      );
      return;
    }

    const role: Role | null = await RoleService.create(_role);

    res.status(201).send({
      message: `Cargo criado com sucesso.`,
      records: role,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _role: Partial<Role> = {
    role_title: req.body.role_title,
    role_desc: req.body.role_desc,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_role);
  try {
    const existingRole: Role | null = await RoleService.findByID(id);
    if (!existingRole) {
      next(new HttpException(404, `Cargo de ID ${id} não existe.`));
      return;
    }

    const role: Role | null = await RoleService.update(id, _role);

    res.status(200).send({
      message: `Cargo atualizado com sucesso.`,
      records: role,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateRoleDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _role: Partial<Role> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_role);
  try {
    const existingRole: Role | null = await RoleService.findByID(id);
    if (!existingRole) {
      next(new HttpException(404, `Cargo de ID ${id} não existe.`));
      return;
    }

    const role: Role | null = await RoleService.update(id, _role);

    res.status(200).send({
      message: `Cargo deletado com sucesso.`,
      records: role,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeRole = async (
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
    const existingRole: Role | null = await RoleService.findByID(id);
    if (!existingRole) {
      next(new HttpException(404, `Cargo de ID ${id} não existe.`));
      return;
    }

    const role: Role | null = await RoleService.remove(id);
    res.status(200).send({
      message: `Cargo excluído com sucesso.`,
      records: role,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
