import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import { FavoriteEntity } from './favorite.entity.js';

export interface FavoriteServiceInterface  extends DocumentExistsInterface {
  deleteById(id: string): Promise<void | null>;
  create(dto: CreateFavoriteDto, userId: string): Promise<DocumentType<FavoriteEntity>>;
  isAdded(offerId: string, userId: string): Promise<boolean>;
  exists(offerId: string): Promise<boolean>;
}
