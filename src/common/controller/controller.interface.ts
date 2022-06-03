import { RouteInterface } from '../../types/route.interface';
import { Response, Router } from 'express';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  send<T>(res: Response, statusCode: number, data: T): void;
}
