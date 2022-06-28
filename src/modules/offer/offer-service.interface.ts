import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface OfferServiceInterface  extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  // find(userId: string): Promise<DocumentType<OfferEntity>[]>
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  find(userId: string, countToFetch?: number, searchOptions?: Record<string | number, unknown>, isFavoriteOnly?: boolean): Promise<DocumentType<OfferEntity>[] | null>;
  exists(offerId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
