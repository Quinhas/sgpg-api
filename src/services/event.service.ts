import { PrismaClient } from "@prisma/client";
import { Event, EventDTO } from "../models/event.interface";

const prisma = new PrismaClient();

export const findAll = async (): Promise<Event[]> => {
    const events = await prisma.events.findMany();
    return events;
  };
  
  export const findByID = async (id: number): Promise<Event | null> => {
    const _event = await prisma.events.findUnique({
      where: { event_id: id },
    });
    return _event;
  }; 
  
  export const create = async (newEvent: EventDTO): Promise<Event> => {
    const _event = await prisma.events.create({
      data: newEvent,
    });
    return _event;
  };
  
  export const update = async (
    id: number,
    _updatedEvent: Partial<EventDTO>
  ): Promise<Event> => {
    const updatedEvent = await prisma.events.update({
      data: _updatedEvent,
      where: { event_id: id },
    });
    return updatedEvent;
  };
  
  export const remove = async (id: number): Promise<Event> => {
    const deletedEvent = await prisma.events.delete({
      where: { event_id: id },
    });
    return deletedEvent;
  };