import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Event, EventDTO } from "../models/event.interface";
import * as EventService from "../services/event.service";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events: Event[] = await EventService.findAll();
    res.status(200).send({
      message: `${events.length} Eventos retornados.`,
      data: events,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getEventByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const _event: Event | null = await EventService.findByID(id);
    if (_event) {
      res.status(200).send({
        message: `Evento encontrado com sucesso.`,
        data: _event,
      });
    } else {
      res.status(404).send({
        message: "Evento não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _event: EventDTO = {
      event_name: req.body.event_name,
      event_desc: req.body.event_desc,
      created_by: req.body.created_by,
    };


    const newEvent: Event | null = await EventService.create(_event);
    res.status(201).send({
      message: `Evento criado com sucesso.`,
      data: newEvent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _event: Partial<Event> = {
    event_name: req.body.event_name,
    event_desc: req.body.event_desc,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  try {
    const existingEvent: Event | null = await EventService.findByID(id);
    if (!existingEvent) {
      next(new HttpException(404, `Evento de ID ${id} não existe.`));
      return;
    }

    const updatedEvent: Event | null = await EventService.update(id, _event);

    res.status(200).send({
      message: `Evento atualizado com sucesso.`,
      data: updatedEvent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  try {
    const existingEvent: Event | null = await EventService.findByID(id);
    if (!existingEvent) {
      next(new HttpException(404, `Evento de ID ${id} não existe.`));
      return;
    }

    const _event: Event | null = await EventService.remove(id);
    res.status(200).send({
      message: `Evento excluído com sucesso.`,
      data: _event,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateEventDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _event: Partial<Event> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_event);
  try {
    const existingEvent: Event | null = await EventService.findByID(id);
    if (!existingEvent) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedEvent: Event | null = await EventService.update(id,_event);

    res.status(200).send({
      message: `Evento deletado com sucesso.`,
      data: deletedEvent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
