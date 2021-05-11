import { ErrorRequestHandler } from 'express';

export class EntityNotFound extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Handle any errors here that were purposefully thrown to cause expected results
 */
export const handleKnownErrors: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof EntityNotFound) {
    return res.status(404).end();
  }

  if (error.code === 'ConditionalCheckFailedException') {
    return res.status(409).json({
      type: 'ServerError',
      message: error.message,
    });
  }

  next(error);
};

/**
 * Handle any uncaught and unexpected errors
 */
export const uncaughtErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof Error) {
    return res.status(500).json({
      type: 'ServerError',
      message: error.message,
    });
  }
  next(error);
};
