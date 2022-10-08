import express from 'express';
export interface BaseHttpError {
  code: number;
  message: string;
  metadata?: object;
}

export class HttpError extends Error {
  code: number;
  message: string;
  metadata?: object;
  constructor({ code, message, metadata }: BaseHttpError) {
    super(message);
    this.code = code;
    this.message = message;
    this.metadata = metadata;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super({ message, code: 404 });
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super({ message, code: 403 });
  }
}

export class ValidationError extends HttpError {
  constructor(errors: object[]) {
    super({ code: 422, message: 'invalid data', metadata: { errors } });
  }
}

export class UnAuthorizedError extends HttpError{
  constructor() {
    super({code:401,message:"UnAuthorized"});
  }
}

export function isHttpError(error: Error): error is HttpError {
  return error instanceof HttpError;
}

export function handleHttpError(err: HttpError, res: express.Response) {
  const { code, message, metadata } = err;
  res.status(code || 500).send({
    message,
    metadata,
  });
}