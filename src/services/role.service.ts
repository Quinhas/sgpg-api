import { PrismaClient } from "@prisma/client";
import { Role, RoleDTO } from "../models/role.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Role[]> => {
  const roles = await prisma.roles.findMany();
  return roles;
};

export const findByID = async (id: number): Promise<Role | null> => {
  const role = await prisma.roles.findUnique({
    where: { role_id: id },
  });
  return role;
};

export const findUnique = async (title: string): Promise<Role | null> => {
  const role = await prisma.roles.findUnique({
    where: { role_title: title },
  });
  return role;
};

export const create = async (newRole: RoleDTO): Promise<Role> => {
  const role = await prisma.roles.create({
    data: newRole,
  });
  return role;
};

export const update = async (
  id: number,
  _updatedRole: Partial<RoleDTO>
): Promise<Role> => {
  const updatedRole = await prisma.roles.update({
    data: _updatedRole,
    where: { role_id: id },
  });
  return updatedRole;
};

export const remove = async (id: number): Promise<Role> => {
  const deletedRole = await prisma.roles.delete({
    where: { role_id: id },
  });
  return deletedRole;
};
