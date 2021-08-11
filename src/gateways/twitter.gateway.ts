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

export interface ICollection {
  tweets: ITweetData[];
  query: string;
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

  async getTweetsByUserIds(data: IQuery) {
    const tweets = await this.T.get(
      'statuses/user_timeline',
      {
        user_id: data.query,
        count: data.count,
      },
    );

    return this.parseTwitResult(tweets, data.query, true);
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

  private parseTwitResult(
    twitResult: Twit.PromiseResponse, query: string, isId: boolean = false,
  ): ICollection {
    if (isId) {
      // @ts-ignore
      const parsedData: ITweetData[] = twitResult.data.map((status) => ({
        text: status.text,
        query,
        country: status.place?.country,
        city: status?.place?.full_name,
        userId: status?.user?.id,
        username: status?.user?.screen_name,
        quote_count: status.quote_count,
        reply_count: status.reply_count,
        retweet_count: status.retweet_count,
        favorite_count: status.favorite_count,
        timestamp: new Date(),
        createdAt: new Date(status.created_at),
      }));

      return {
        tweets: parsedData,
        query,
      };
    }

    // @ts-ignore
    const parsedData: ITweetData[] = twitResult.data.statuses.map((status) => ({
      text: status.text,
      query,
      country: status.place?.country,
      city: status?.place?.full_name,
      userId: status?.user?.id,
      username: status?.user?.screen_name,
      quote_count: status.quote_count,
      reply_count: status.reply_count,
      retweet_count: status.retweet_count,
      favorite_count: status.favorite_count,
      timestamp: new Date(),
      createdAt: new Date(status.created_at),
    }));

    return {
      tweets: parsedData,
      query,
    };
  }
}

export default new TwitterGateway();
