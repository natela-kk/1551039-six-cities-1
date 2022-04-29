import got from 'got';
import OfferGenerator from '../common/file-reader/offer-generator/offer-generator.js';
import { MockData } from '../types/mock-data.type';
import { CliCommandInterface } from './cli-command.interface';
import chalk from 'chalk';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(chalk.green(`File ${filepath} was created!`));
  }
}
