import { Expose } from 'class-transformer';

export default class OfferDto {
  @Expose()
  public price!: number;

  @Expose()
  public title!: string;

  @Expose()
  public type!: string;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public date!: string;

  @Expose()
  public city!: {
    location: {
      latitude: number
      longitude: number
    }
    name: string
  };

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;
}
