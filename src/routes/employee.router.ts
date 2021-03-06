import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeByID,
  login,
  removeEmployee,
  updateEmployee
} from "../controllers/employee.controller";

export const employeeRouter = express.Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:id", getEmployeeByID);
employeeRouter.post("/", createEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", removeEmployee);
employeeRouter.post("/login", login);
