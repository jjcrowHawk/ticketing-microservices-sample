import {CustomError} from './../errors/custom-errors'
import {Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('something went wrong: ', err);


  if(err instanceof CustomError){
    console.log('handling error: ', err);
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  res.status(400).send({
    errors: [{message: err.message || err }]
  });
}