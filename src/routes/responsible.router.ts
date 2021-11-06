import express from "express";
import {
  createResponsible,
  getAllResponsibles,
  getResponsibleByID,
  removeResponsible,
  updateResponsible
} from "../controllers/responsible.controller";

export const responsibleRouter = express.Router();

responsibleRouter.get("/", getAllResponsibles);
responsibleRouter.get("/:id", getResponsibleByID);
responsibleRouter.post("/", createResponsible);
responsibleRouter.put("/:id", updateResponsible);
responsibleRouter.delete("/", removeResponsible);