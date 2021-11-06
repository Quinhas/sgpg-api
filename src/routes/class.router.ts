import express from "express";
import {
  createClass,
  getAllClasses,
  getClassByID,
  removeClass,
  updateClass
} from "../controllers/class.controller";

export const classRouter = express.Router();

classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassByID);
classRouter.post("/", createClass);
classRouter.put("/:id", updateClass);
classRouter.delete("/:id", removeClass);
