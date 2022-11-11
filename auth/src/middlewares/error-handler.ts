import { Response, Request, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formatedErrors = err.error.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
    return res.status(400).send({ errors: formatedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    message: err.message,
  });
};
