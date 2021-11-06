import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventByID,
  removeEvent,
  updateEvent
} from "../controllers/event.controller";

export const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventByID);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", removeEvent);