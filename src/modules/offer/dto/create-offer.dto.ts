import { Location } from '../../../types/city.type.js';
import { Host } from '../../../types/host.type.js';

export default class CreateOfferDto {
  public userId!: string;
  public bedrooms!: number;
  public city!: {
    location: Location;
    name: string;
  };

  public description!: string;
  public goods!: string[];
  public host!: Host;
  public id!: number;
  public images!: string[];
  public isFavorite!: boolean;
  public isPremium!: boolean;
  public maxAdults!: number;
  public previewImage!: string;
  public price!: number;
  public rating!: number;
  public title!: string;
  public type!: string;
  public date!: Date;
  public commentsCount!: number;
}
