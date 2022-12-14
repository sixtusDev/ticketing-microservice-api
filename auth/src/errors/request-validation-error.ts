import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public error: Array<ValidationError>) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
