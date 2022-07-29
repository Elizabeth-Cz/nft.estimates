import { Entity } from "@skeksify/nfte-common/dist/entities/entity";
import axios from "axios";
import { Routes } from "@skeksify/nfte-common/dist/routes";
import _ from "lodash";

const domain =
  typeof location !== "undefined" && location.hostname === "localhost"
    ? "localhost"
    : "3.22.181.242";

type Query = Record<string, string>;

interface Response<T> {
  data: T;
  length: number;
}

/*
 Est. Collection Value - Sum of Estimated value for all NFTs in collection.
 Collection Volume (24H) - Sum of sale prices in past 24H for all NFTs in collection.
 Collection Volume (7D) - Sum of sale prices in past 7D for all NFTs in collection .
 NFTs sold (24H) - Amount of NFTs sold from that collection in past 24h.
 NFTs sold (7D) - Amount of NFTs sold from that collection in past 24h.
 On sale - Amount of NFTs from collection currently for sale.
 Floor Price - Collection floor price.
 Bid Volume - Sum of bids placed on NFTs from collection in past 24H.
 Collection supply - Collection supply :)  (Number of NFTs in collection).
 */
export class Chamber<ENTITY_TYPE extends Entity> {
  private rootUrl: string;

  constructor(rootUrl: string) {
    this.rootUrl = Routes.DATA_HALL_ROOT + rootUrl;
  }

  async get(query: Query): Promise<Response<ENTITY_TYPE[]>> {
    const { data } = await axios.get<Response<ENTITY_TYPE[]>>(
      `//${domain}:9000${this.rootUrl}`,
      {
        params: query,
      }
    );
    return data;
  }

  async getOne(query: Query): Promise<ENTITY_TYPE | null> {
    const { data } = await this.get(query);
    return _.first(data) || null;
  }
}
