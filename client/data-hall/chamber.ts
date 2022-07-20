import { Entity } from "@COMMON/entities/entity";
import axios from "axios";
import { Routes } from "@COMMON/routes";
import _ from "lodash";

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
      "//localhost:9000" + this.rootUrl,
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
