import e from 'cors'
import { NextFunction, Request, Response } from 'express'
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send({ message: err.message } || 'Something went wrong')
}
