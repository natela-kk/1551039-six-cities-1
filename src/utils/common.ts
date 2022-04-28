import { Offer } from '../types/offer.type';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [cityName, name, password, email, avatarUrl, title, description, previewImage, images, type, rating, maxAdults, id, goods, bedrooms, latitude, longitude, isFavorite, isPremium, isPro, date, commentsCount, price] = tokens;
  console.log(images);
  return {
    bedrooms: Number.parseInt(bedrooms, 10),
    city: {
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
      name: cityName,
    },
    description: description,
    host:  {avatarUrl,
      isPro: Boolean(isPro),
      name,
      email,
      password},
    id: Number.parseInt(id, 10),
    images: images.split(';'),
    isFavorite: Boolean(isFavorite),
    isPremium: Boolean(isPremium),
    maxAdults: Number.parseInt(maxAdults, 10),
    previewImage,
    price: Number.parseInt(price, 10),
    rating: Number.parseFloat(rating),
    title,
    type,
    date: new Date(date),
    commentsCount: Number.parseInt(commentsCount, 10),
    goods: goods.split(';'),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
