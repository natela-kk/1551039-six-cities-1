import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface';
import { ConfigInterface } from '../common/config/config.interface';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import express, { Express } from 'express';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import UserController from '../modules/user/user.controller.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.ExeptionFilterInterface) private exeptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: UserController,
  ) {
    this.expressApp = express();
  }

  public registerRoutes() {
    this.expressApp.use('/users', this.userController.router);
  }

  public registerMiddlewares() {
    this.expressApp.use(express.json());
  }

  public registerExpectionFilters() {
    this.expressApp.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    this.logger.info(uri);
    await this.databaseClient.connect(uri);

    this.registerMiddlewares();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost2:${this.config.get('PORT')}`);
  }
}
