import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentByID,
  removeStudent,
  updateStudent,
  updateStudentDeletionState
} from "../controllers/student.controller";

export const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentByID);
studentRouter.post("/", createStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.put("/:id", updateStudentDeletionState);
studentRouter.delete("/:id", removeStudent);