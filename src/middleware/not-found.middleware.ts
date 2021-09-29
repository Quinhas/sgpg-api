import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "Endpoint não encontrada.";

  response.status(404).send(new HttpException(404, message));
};
