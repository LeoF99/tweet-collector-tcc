/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import twitterGateway, { IQuery, ITweetData } from '../gateways/twitter.gateway';
import queriesCsvReader from '../services/getQueriesFromCsv';
import writeTweetsToCsv from '../services/writeTweetsToCsv';

const DEFAULT_COUNT = Number(process.env.DEFAULT_COUNT) || 1000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTweets(queries: string[]) {
  const result: ITweetData[] = [];

  for (let i = 0; i < queries.length; i++) {
    const query: IQuery = {
      count: DEFAULT_COUNT,
      query: queries[i],
    };

    const data = await twitterGateway.getTweets(query);
    result.push(...data);
  }

  writeTweetsToCsv.write(result);
}

async function main() {
  queriesCsvReader.readFile();
  await sleep(1000);

  const queries: string[] = queriesCsvReader.getQueries();
  getTweets(queries);
}

main();
