import express from "express";
import {
  createInstrument,
  getAllInstruments,
  getInstrumentByID,
  removeInstrument,
  updateInstrument,
  updateInstrumentDeletionState
} from "../controllers/instrument.controller";

export const instrumentRouter = express.Router();

instrumentRouter.get("/", getAllInstruments);
instrumentRouter.get("/:id", getInstrumentByID);
instrumentRouter.post("/", createInstrument);
instrumentRouter.put("/:id", updateInstrument);
instrumentRouter.put("/:id",updateInstrumentDeletionState);
instrumentRouter.delete("/:id", removeInstrument);
