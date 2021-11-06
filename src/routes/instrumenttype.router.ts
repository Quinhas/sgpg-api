import express from "express";
import {
  createInstrumentType,
  getAllInstrumentTypes,
  getInstrumentTypesByID,
  removeInstrumentType,
  updateInstrumentType
} from "../controllers/instrumenttype.controller";

export const instrumentTypeRouter = express.Router();

instrumentTypeRouter.get("/", getAllInstrumentTypes);
instrumentTypeRouter.get("/:id", getInstrumentTypesByID);
instrumentTypeRouter.post("/", createInstrumentType);
instrumentTypeRouter.put("/:id", updateInstrumentType);
instrumentTypeRouter.delete("/:id", removeInstrumentType);