import dayjs from 'dayjs';
import { MockData } from '../../../types/mock-data.type';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface';

const MIN_PRICE = 50;
const MAX_PRICE = 300;

const MIN_RATING = 0;
const MAX_RATING = 5;
const RATING_AFTER_DIGITS = 1;

const MIN_ADULTS = 1;
const MAX_ADULTS = 5;

const MIN_ID = 0;
const MAX_ID = 30;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 5;

const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 15;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const city = getRandomItem<string>(this.mockData.cities);
    const user = getRandomItem<string>(this.mockData.users);
    const password = getRandomItem<string>(this.mockData.passwords);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.previewImages).join(';');
    const type = getRandomItem<string>(this.mockData.types);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_AFTER_DIGITS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const id = generateRandomValue(MIN_ID, MAX_ID).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const latitudes = getRandomItem<string>(this.mockData.latitudes);
    const longitudes = getRandomItem<string>(this.mockData.longitudes);
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const isPro = getRandomItem<string>(this.mockData.isPro);
    const createdDate =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const commentsCounts = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();

    return [
      city, user, password, email,
      avatar, title, description,
      previewImage, images, type, rating, maxAdults,
      id, goods, bedrooms, latitudes, longitudes, isPremium, isPro,
      createdDate, commentsCounts, price
    ].join('\t');
  }
}
