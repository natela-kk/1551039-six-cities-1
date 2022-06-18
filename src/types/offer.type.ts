import { Location } from './city.type.js';
import { Host } from './host.type.js';
import { OfferType } from './offer.type.enum.js';

export type Offer = {
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
  type: OfferType;
  date: Date;
  commentsCount: number;
};
