import Twit from 'twit';
import dotenv from 'dotenv';

dotenv.config();

const {
  TWIT_API_KEY,
  TWIT_API_SECRET_KEY,
} = process.env;

export interface IQuery {
  query: string;
  count: number;
}

export interface ITweetData {
  text: string;
  query: string;
  timestamp: Date;
  createdAt: Date;
}

class TwitterGateway {
  private readonly T: Twit;

  constructor() {
    this.T = new Twit(
      {
        consumer_key: String(TWIT_API_KEY),
        consumer_secret: String(TWIT_API_SECRET_KEY),
        app_only_auth: true,
      },
    );
  }

  async getTweets(data: IQuery) {
    const tweets = await this.T.get(
      'search/tweets',
      {
        q: data.query,
        count: data.count,
        lang: 'pt',
        result_type: 'recent',
      },
    );

    return this.parseTwitResult(tweets, data.query);
  }

  private parseTwitResult(twitResult: Twit.PromiseResponse, query: string) {
    // @ts-ignore
    const parsedData: ITweetData[] = twitResult.data.statuses.map((status) => ({
      text: status.text,
      query,
      timestamp: new Date(),
      createdAt: new Date(status.created_at),
    }));

    return parsedData;
  }
}

export default new TwitterGateway();
