import typegoose, { getModelForClass, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface FavoriteEntity extends Base { }

@modelOptions({
  schemaOptions: {
    collection: 'favorites'
  }
})

export class FavoriteEntity extends TimeStamps {
  @prop({ required: true })
  public offerId!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);


