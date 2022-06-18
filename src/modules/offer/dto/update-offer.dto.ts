import { Location } from '../../../types/city.type.js';
import { Host } from '../../../types/host.type.js';
import { OfferType } from '../../../types/offer.type.enum.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  // isObject,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export default class UpdateOfferDto {

  @IsOptional()
  @IsInt({message: 'Bedrooms must be an integer'})
  @Min(100, {message: 'Minimum bedrooms number is 1'})
  @Max(200000, {message: 'Maximum bedrooms number is 10'})
  public bedrooms?: number;

  ///////////
  public city?: {
    location: Location;
    name: string;
  };

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsArray({message: 'Field goods must be an array'})
  public goods?: string[];

  /////////
  @IsOptional()
  // @isObject({message: '' })
  public host?: Host;

  @IsOptional()
  @IsMongoId({message: 'Id field must be valid an identificator'})
  public id?: number;

  @IsOptional()
  @IsArray({message: 'Field images must be an array'})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: 'IsFavorite field must be boolean'})
  public isFavorite?: boolean;

  @IsOptional()
  @IsBoolean({message: 'IsPremium field must be boolean'})
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({message: 'MaxAdults must be an integer'})
  @Min(1, {message: 'Minimum maxAdults is 1'})
  @Max(10, {message: 'Maximum maxAdults is 10'})
  public maxAdults?: number;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewImage?: string;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(30, {message: 'Minimum price is 30'})
  @Max(20000, {message: 'Maximum price is 20000'})
  public price?: number;

  @IsOptional()
  @IsInt({message: 'Rating must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating?: number;

  @IsOptional()
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @IsEnum(OfferType, {message: 'Type must be Room/Hotel/House/Apartment'})
  public type?: OfferType;

  @IsOptional()
  @IsDateString({}, {message: 'Date must be valid ISO date'})
  public date?: Date;

  @IsOptional()
  @IsInt({message: 'CommentsCount must be an integer'})
  public commentsCount?: number;
}
