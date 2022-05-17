import typegoose, { getModelForClass, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { OfferType } from '../../types/offer.type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions} = typegoose;

export interface OfferEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })

  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
