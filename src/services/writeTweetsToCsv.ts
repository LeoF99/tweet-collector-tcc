import { createObjectCsvWriter } from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';
import * as path from 'path';
import { ICollection } from '../gateways/twitter.gateway';

class Writer {
  private writer: CsvWriter<ObjectMap<any>> | undefined;

  write = (data: ICollection, label: string = '') => {
    const date = new Date().toString();
    let pathString: string;

    if (!label.length) {
      pathString = `/politics/merged/${data.query}/collection_${data.query}_${date}.csv`;
    } else {
      pathString = `/politics/users_post/${label}/${label}_${data.query}_${date}.csv`;
    }

    this.writer = createObjectCsvWriter({
      path: path.join(__dirname, '..', pathString),
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
