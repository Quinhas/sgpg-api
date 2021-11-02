import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleByID,
  removeRole,
  updateRole,
  updateRoleDeletionState
} from "../controllers/role.controller";

export const roleRouter = express.Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleByID);
roleRouter.post("/", createRole);
roleRouter.put("/:id", updateRole);
roleRouter.put("/:id",updateRoleDeletionState);
roleRouter.delete("/:id", removeRole);
