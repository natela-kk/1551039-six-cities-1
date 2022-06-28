import {OfferServiceInterface} from './offer-service.interface.js';
import {inject, injectable} from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
// import { SortType } from '../../types/sort.type.enum.js';

const DEFAULT_OFFER_COUNT = 10;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  // public async find(userId: string): Promise<DocumentType<OfferEntity>[]> {
  //   console.log(userId);
  //   return this.offerModel
  //     .find()
  //     .populate(['userId'])
  //     .exec();
  // }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findFavorites(id: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.find(id, Number.MAX_SAFE_INTEGER, undefined, true);
  }

  public async find(userId = '', countToFetch?: number, searchOptions?: Record<string | number, unknown>, isFavoriteOnly = false): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = countToFetch ?? DEFAULT_OFFER_COUNT;
    const match = searchOptions ? Object.entries(searchOptions).map(([key, value]) => ({ $eq: [`$${key}`, value] })) : {};
    console.log(limit, match, isFavoriteOnly, userId);
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'favorites',
          let: { offerId: '$offerId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$offerId', '$$offerId'] },
                    // { $eq: [{ $toString: '$userId' }, userId] },
                  ]
                }
              }
            }
          ],
          as: 'favorites'
        }
      },
      // {
      //   $match: { $expr: { $and: match } }
      // },
      {
        $addFields: {
          id: { $toString: '$_id' },
          favoritesSize: { $size: '$favorites' },
          isFavorite: { $gt: [{ $size: '$favorites' }, 0] }
        }
      },
      // {
      //   $match: {
      //     $expr: {
      //       $switch: {
      //         branches: [
      //           {
      //             case: { $eq: [isFavoriteOnly, false] },
      //             then: true
      //           }
      //         ], default: { $eq: ['$isFavorite', true] }
      //       }
      //     }
      //   }
      // },
      // { $unset: 'favorites' },
      // { $limit: limit },
      // { $sort: { publicationDate: SortType.Down } },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'userId',
      //     foreignField: '_id',
      //     as: 'userId'
      //   }
      // },
      // {
      //   $unwind: '$userId'
      // }
    ]).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount:  1,
      }}).exec();
  }
}
