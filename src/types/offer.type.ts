import { Location } from './city.type';
import { Host } from './host.type';
import { User } from './user.type';

export type Offer = {
  user: User;
  bedrooms: number;
  city: {
    location: Location;
    name: string;
  }
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  date: Date;
  commentsCount: number;
};
