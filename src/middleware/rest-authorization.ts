import { RequestHandler } from 'express';

export const restAuthorization: RequestHandler = (req, res, next) => {
  if (
    // Support REST authZ. Having support for headers is nice to help hide the token.
    req.headers.authorization === process.env.API_TOKEN
  ) {
    next();
  } else {
    res.status(403);
    res.end();
  }
};
