import { Controller } from '../../common/controller/controller.js';
import { inject } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/common.js';
import { FavoriteServiceInterface } from './favorite-service.interface.js';
import FavoriteDto from './dto/favorite.dto.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import OfferDto from '../offer/dto/offer.dto.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';


export default class FavoriteController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFavoriteDto)
      ]
    });
    this.addRoute({
      path: '/:favoriteId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('favoriteId'),
        new DocumentExistsMiddleware(this.favoriteService, 'Favorites', 'favoriteId')
      ]
    });
  }

  // public async index(_req: Request, res: Response): Promise<void> {
  //   const result = await this.favoriteService.findByUserId(_req.user.id);

  //   this.ok(res, fillDTO(OfferDto, result));
  // }

  public async create(req: Request<Record<string, string>, Record<string, unknown>, CreateFavoriteDto>,
    res: Response): Promise<void> {
    const userId = req.user.id;
    const isAdded = await this.favoriteService.isAdded(req.body.offerId, userId);

    if (isAdded) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer ${req.body.offerId} has already been added to favorites.`,
        'FavoriteController',
      );
    }

    const result = await this.favoriteService.create(req.body, userId);

    this.created(res, fillDTO(FavoriteDto, result));
  }

  public async delete({params}: Request, res: Response): Promise<void> {
    await this.favoriteService.deleteById(params['favoriteId']);

    this.noContent(res);
  }

  public async getFavorites({ user: { id } }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorites(id);

    this.ok(res, fillDTO(OfferDto, offers));
  }
}
