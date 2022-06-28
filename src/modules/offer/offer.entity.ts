import typegoose, { getModelForClass, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { OfferType } from '../../types/offer.type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public date!: Date;

  @prop()
  public price!: number;

  @prop()
  public bedrooms!: number;

  @prop()
  public city!: {
    location: {
      latitude: number
      longitude: number
    }
    name: string
  };

  @prop()
  public goods!: string[];

  @prop()
  public host!: {
    avatarUrl: string
    isPro: boolean
    name: string
    email: string
    password: string
  };

  @prop()
  public images!: string[];

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop()
  public isPremium!: boolean;

  @prop()
  public maxAdults!: number;

  @prop()
  public previewImage!: string;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);

