import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ApiErrorPayload } from '../types/index.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    const payload: ApiErrorPayload = {
      message: 'Validation failed.',
      details: error.flatten(),
    };
    response.status(400).json(payload);
    return;
  }

  if (error instanceof Error) {
    const statusByName: Record<string, number> = {
      ConflictError: 409,
      NotFoundError: 404,
      ValidationError: 400,
    };

    response.status(statusByName[error.name] ?? 500).json({ message: error.message });
    return;
  }

  response.status(500).json({ message: 'Unexpected server error.' });
};
