import csv from 'csv-parser';
import fs from 'fs';
import * as path from 'path';

const CSV_FILE_LOCATION = path.join(__dirname, '..', 'data/queries.csv');

class QueriesCsvReader {
  private queries: string[] = [];

  private ids: string[] = [];

  readFile = () => {
    fs.createReadStream(CSV_FILE_LOCATION)
      .pipe(csv())
      .on('data', (row) => {
        this.queries.push(
          row['Termo de busca'],
        );

        this.ids.push(
          row['user id'],
        );
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  }

  getQueries = () => this.queries;

  getIds = () => this.ids;
}

export default new QueriesCsvReader();
