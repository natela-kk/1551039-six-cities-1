import { FavoriteServiceInterface } from './favorite-service.interface.js';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { Component } from '../../types/component.types.js';
import { FavoriteEntity } from './favorite.entity.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';

@injectable()
export default class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FavoriteModel) private readonly favoriteModel: ModelType<FavoriteEntity>
  ) { }

  public async create(dto: CreateFavoriteDto, userId: string): Promise<DocumentType<FavoriteEntity>> {
    const result = await this.favoriteModel.create({...dto, userId: userId});

    this.logger.info(`Offer ${result.offerId} added to favorites`);

    return result;
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.favoriteModel.findByIdAndDelete(id);
  }

  public async findByUserId(id: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [ { $toString: '$userId' }, id ],
          }
        },
      },
      {
        $addFields: {
          price:'',
        }
      },
      {
        $lookup: {
          from: 'offers',
          localField: 'price',
          foreignField: 'price',
          as: 'price'
        //   let: {offerId: '$_id', userId: id},
        //   pipeline: [
        //     {
        //       $addFields: {
        //         // name: { $toString: '$_id' },
        //         price: { $toString: 'hi'},
        //         // title: { $toString: '$_id'},
        //         // type: { $toString: '$_id'},
        //         // isFavorite: { $toString: '$_id'},
        //         // date: { $toString: '$_id'},
        //         // city: { $toString: '$_id'},
        //         // previewImage: { $toString: '$_id'},
        //         // isPremium: { $toString: '$_id'},
        //         // rating: { $toString: '$_id'},
        //         // commentCount: { $toString: '$_id'},
        //         // isFavorite: { $gt: [{ $size: '$favorites' }, 0 ]}
        //       },
        },
        //   ],
        //   as: 'offers'
        // }
      }
    ]).exec();
  }

  public async isAdded(offerId: string, userId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({offerId, userId}) !== null);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.favoriteModel
      .exists({ _id: documentId })) !== null;
  }
}
