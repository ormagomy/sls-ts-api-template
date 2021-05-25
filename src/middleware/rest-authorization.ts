import { RequestHandler } from 'express';

export const restAuthorization: RequestHandler = (req, res, next) => {
  if (
    // Support simple REST authentication with a list of allowed API tokens.
    req.headers.authorization &&
    process.env.API_TOKENS?.split(',').includes(req.headers.authorization)
  ) {
    next();
  } else {
    res.status(403);
    res.end();
  }
};
