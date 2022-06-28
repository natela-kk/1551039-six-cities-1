import {IsMongoId} from 'class-validator';

class CreateFavoriteDto {
  @IsMongoId({message: 'Id field must be valid an identificator'})
  public offerId!: string;
}

export default CreateFavoriteDto;
