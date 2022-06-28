import {Expose, Type} from 'class-transformer';
import UserDto from '../../user/dto/user.dto.js';

export default class OfferDetailsDto {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public date!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public price!: number;

  @Expose()
  public type!: string;

  @Expose()
  public city!: {
    location: {
      latitude: number
      longitude: number
    }
    name: string
  };

  @Expose()
  public goods!: string[];

  @Expose()
  public host!: {
    avatarUrl: string
    isPro: boolean
    name: string
    email: string
    password: string
  };

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public previewImage!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserDto)
  public user!: UserDto;
}
