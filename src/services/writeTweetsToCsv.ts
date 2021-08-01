import { createObjectCsvWriter } from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';
import * as path from 'path';
import { ITweetData } from '../gateways/twitter.gateway';

class Writer {
  private readonly writer: CsvWriter<ObjectMap<any>>;

  constructor() {
    const date = new Date().toString().split('T')[0];
    this.writer = createObjectCsvWriter({
      path: path.join(__dirname, '..', `output/tweets_${date}.csv`),
      header: [
        { id: 'text', title: 'text' },
        { id: 'query', title: 'query' },
        { id: 'timestamp', title: 'timestamp' },
        { id: 'createdAt', title: 'createdAt' },
      ],
    });
  }

  write = (data: ITweetData[]) => {
    this.writer.writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  }
}

export default new Writer();
