/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import twitterGateway, { ICollection, IQuery } from '../gateways/twitter.gateway';
import queriesCsvReader from '../services/getQueriesFromCsv';
import writeTweetsToCsv from '../services/writeTweetsToCsv';

const DEFAULT_COUNT = Number(process.env.DEFAULT_COUNT) || 1000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTweets(ids: string[]) {
  let result: ICollection;

  for (let i = 0; i < ids.length; i++) {
    const query: IQuery = {
      count: DEFAULT_COUNT,
      query: ids[i],
    };

    result = await twitterGateway.getTweetsByUserIds(query);
    writeTweetsToCsv.write(result);
  }
}

async function main() {
  queriesCsvReader.readFile();
  await sleep(1000);

  const queries: string[] = queriesCsvReader.getIds();
  getTweets(queries);
}

main();
