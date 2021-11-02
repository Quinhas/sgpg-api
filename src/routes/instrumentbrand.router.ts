import express from "express";
import {
  createInstrumentBrand,
  getAllInstrumentBrands,
  getInstrumentBrandByID,
  removeInstrumentBrand,
  updateInstrumentBrand,
  updateInstrumentBrandDeletionState
} from "../controllers/instrumentbrand.controller";

export const instrumentBrandRouter = express.Router();

instrumentBrandRouter.get("/", getAllInstrumentBrands);
instrumentBrandRouter.get("/:id", getInstrumentBrandByID);
instrumentBrandRouter.post("/", createInstrumentBrand);
instrumentBrandRouter.put("/:id", updateInstrumentBrand);
instrumentBrandRouter.put("/:id",updateInstrumentBrandDeletionState);
instrumentBrandRouter.delete("/:id", removeInstrumentBrand);
