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
