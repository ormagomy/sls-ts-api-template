import { RequestHandler, NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

// This is the same as the express RequestHandler type, but has a return type of a Promise instead of void.
export interface RequestHandlerWrapper<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> {
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): Promise<any>;
}

// Read about why this is needed here: https://thecodebarbarian.com/80-20-guide-to-express-error-handling
export const wrapAsync = (fn: RequestHandlerWrapper) => {
  const requestHandler: RequestHandler = (req, res, next) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
  return requestHandler;
};
