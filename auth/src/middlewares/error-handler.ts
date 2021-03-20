import { DatabaseConnectionError } from './../errors/database-connection-error';
import { RequestValidationError } from './../errors/request-validation-error';
import {CustomError} from './../errors/custom-errors'
import {Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('something went wrong: ', err);


  if(err instanceof CustomError){
    console.log('handling error as Request Validation Error');
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  res.status(400).send({
    errors: [{message: err.message || err }]
  });
}