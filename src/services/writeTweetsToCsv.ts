import { createObjectCsvWriter } from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';
import * as path from 'path';
import { ICollection } from '../gateways/twitter.gateway';

class Writer {
  private writer: CsvWriter<ObjectMap<any>> | undefined;

  write = (data: ICollection) => {
    const date = new Date().toString();
    this.writer = createObjectCsvWriter({
      path: path.join(__dirname, '..', `/output/politics/${data.query}/collection_${data.query}_${date}.csv`),
      // path: path.join(__dirname, '..', `/output/posts/09-08/posts_${data.query}_${date}.csv`),
      header: [
        { id: 'text', title: 'text' },
        { id: 'query', title: 'query' },
        { id: 'country', title: 'country' },
        { id: 'city', title: 'city' },
        { id: 'userId', title: 'userId' },
        { id: 'username', title: 'username' },
        { id: 'quote_count', title: 'quote_count' },
        { id: 'reply_count', title: 'reply_count' },
        { id: 'retweet_count', title: 'retweet_count' },
        { id: 'favorite_count', title: 'favorite_count' },
        { id: 'timestamp', title: 'timestamp' },
        { id: 'createdAt', title: 'createdAt' },
      ],
    });

    this.writer.writeRecords(data.tweets)
      .then(() => console.log('The CSV file was written successfully'));
  }
}

export default new Writer();
