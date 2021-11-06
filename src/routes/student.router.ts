import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentByID,
  removeStudent,
  updateStudent
} from "../controllers/student.controller";

export const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentByID);
studentRouter.post("/", createStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", removeStudent);