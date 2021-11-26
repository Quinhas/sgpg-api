import express from "express";
import {
  createClass, createStudentOfClass,
  deleteStudentOfClass, getAllClasses,
  getClassByID,
  removeClass,
  updateClass
} from "../controllers/class.controller";

export const classRouter = express.Router();

classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassByID);
classRouter.post("/", createClass);
classRouter.post("/:id", createStudentOfClass);
classRouter.put("/:id", updateClass);
classRouter.delete("/:id", removeClass);
classRouter.delete("/:classId/:studentId", deleteStudentOfClass);
