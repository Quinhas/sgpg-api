import express from "express";
import {
  createClass,
  getAllClasses,
  getClassByID,
  removeClass,
  updateClass,
  updateClassDeletionState
} from "../controllers/class.controller";

export const classRouter = express.Router();

classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassByID);
classRouter.post("/", createClass);
classRouter.put("/:id", updateClass);
classRouter.put("/:id",updateClassDeletionState);
classRouter.delete("/:id", removeClass);
