import { Host } from '../../../types/host.type.js';
import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean, ValidateNested} from 'class-validator';
import { OfferType } from '../../../types/offer.type.enum.js';
import CityDto from './city.dto.js';

export default class CreateOfferDto {
  @IsMongoId({message: 'UserId field must be valid an identificator'})
  public userId!: string;

  @IsInt({message: 'Bedrooms must be an integer'})
  @Min(1, {message: 'Minimum bedrooms number is 1'})
  @Max(10, {message: 'Maximum bedrooms number is 10'})
  public bedrooms!: number;

  @ValidateNested()
  public city!: CityDto;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsArray({message: 'Field goods must be an array'})
  public goods!: string[];

  public host!: Host;

  @IsMongoId({message: 'Id field must be valid an identificator'})
  public id!: number;

  @IsArray({message: 'Field images must be an array'})
  public images!: string[];

  @IsBoolean({message: 'IsPremium field must be boolean'})
  public isPremium!: boolean;

  @IsInt({message: 'MaxAdults must be an integer'})
  @Min(1, {message: 'Minimum maxAdults is 1'})
  @Max(10, {message: 'Maximum maxAdults is 10'})
  public maxAdults!: number;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @IsInt({message: 'Price must be an integer'})
  @Min(30, {message: 'Minimum price is 30'})
  @Max(20000, {message: 'Maximum price is 20000'})
  public price!: number;

  @IsInt({message: 'Rating must be an integer'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @IsEnum(OfferType, {message: 'Type must be Room/Hotel/House/Apartment'})
  public type!: OfferType;

  @IsDateString({}, {message: 'Date must be valid ISO date'})
  public date!: Date;
}
