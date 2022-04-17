import chalk from 'chalk';
import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }
    console.log(chalk.red(this.rawData.split('\n').filter((row) => row.trim() !== '')
      .map((line) => line.split('  '))));
    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('  '))
      .map(([cityName, name, email, avatarUrl, title, description, images, price, type, rating, bedrooms, maxAdults, goods, latitude, longitude, zoom, id, isFavorite, isPremium, date, previewImage, commentsCount, isPro, password]) => ({
        bedrooms: Number.parseInt(bedrooms, 10),
        city: {
          location: {
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude),
            zoom: Number.parseInt(zoom, 10)
          },
          name: cityName,
        },
        description: chalk.blueBright(description),
        host:  {avatarUrl,
          isPro: Boolean(isPro),
          name,
          email,
          password},
        id: Number.parseInt(id, 10),
        images: [images],
        isFavorite: Boolean(isFavorite),
        isPremium: Boolean(isPremium),
        location: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
          zoom: Number.parseInt(zoom, 10)
        },
        maxAdults: Number.parseInt(maxAdults, 10),
        previewImage,
        price: Number.parseInt(price, 10),
        rating: Number.parseFloat(rating),
        title,
        type,
        date: new Date(date),
        commentsCount: Number.parseInt(commentsCount, 10),
        goods: [goods],
      }));
  }
}
