import { IsInt, IsString, ValidateNested } from 'class-validator';

class Location {
  @IsInt({message: 'Latitude must be an integer'})
  public latitude!: number;

  @IsInt({message: 'Longitude must be an integer'})
  public longitude!: number;
}

export default class CityDto {
  @ValidateNested()
  public location!: Location;

  @IsString()
  public name!: string;
}
