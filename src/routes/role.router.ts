import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleByID,
  removeRole,
  updateRole
} from "../controllers/role.controller";

export const roleRouter = express.Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleByID);
roleRouter.post("/", createRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", removeRole);
