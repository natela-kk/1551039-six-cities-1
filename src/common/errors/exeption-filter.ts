import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import HttpError from './http-error.js';
import { createErrorObject } from '../../utils/common.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register ExeptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response) {
    console.log(error.httpStatusCode, 'exeption-filter 19');
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} - ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, next: NextFunction) {
    console.log('exeption-filter 27', next);
    console.log(_req);
    console.log(StatusCodes.INTERNAL_SERVER_ERROR, 'exeption-filter 28');
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    console.log('exeption-filter-catch');
    console.log(error);
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res);
    }
    this.handleOtherError(error, req, res, next);
  }
}
