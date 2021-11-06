import express from "express";
import {
  createInstrument,
  getAllInstruments,
  getInstrumentByID,
  removeInstrument,
  updateInstrument
} from "../controllers/instrument.controller";

export const instrumentRouter = express.Router();

instrumentRouter.get("/", getAllInstruments);
instrumentRouter.get("/:id", getInstrumentByID);
instrumentRouter.post("/", createInstrument);
instrumentRouter.put("/:id", updateInstrument);
instrumentRouter.delete("/:id", removeInstrument);
