import axios from "axios";
import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";
import { NullableString } from "../../toolset/types";
import { OpenSeaPageFetcher } from "../../modules/consumption/base.consumer";
import { consumptionManager } from "../../modules/consumption/consumptionManager";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";

export interface OpenSeaApiResponse {
  next: NullableString;
  previous: NullableString;
  assets?: OpenSeaAsset[];
  asset_events?: unknown[];
  collection?: OpenSeaCollection;
}

const DEBUG_CALLS: boolean = false;

const baseUrl = `https://api.opensea.io/api/v1/`;
const headersObj = {
  headers: {
    "X-API-KEY": "0037e16da01741fd8bd8ae743c911b3d",
  },
};
// Can be created for new auctions, successful for sales,
// cancelled, bid_entered, bid_withdrawn, transfer, offer_entered, or approve
type EventTypes =
  | "created"
  | "successful"
  | "cancelled"
  | "bid_entered"
  | "bid_withdrawn"
  | "transfer"
  | "offer_entered"
  | "approve";

type EndPoint = "assets" | "collections" | "events";
const buildEndPoint: (endPoint: EndPoint, param1?: string) => string = (
  endPoint,
  param1
) => {
  const map: Record<EndPoint, string> = {
    assets: `${baseUrl}assets`,
    collections: `${baseUrl}collection/${param1}`,
    events: `${baseUrl}events`,
  };
  return map[endPoint];
};

type Params = Record<string, string | undefined>;

class OpenSeaFetcher {
  constructor() {}

  public buildCollectionFetcher(contractAddress: string): OpenSeaPageFetcher {
    return async () =>
      await this.fetchAny<OpenSeaApiResponse>(
        "collections",
        {},
        contractAddress
      );
  }

  public buildAssetFetcher(contractAddress: string): OpenSeaPageFetcher {
    return async (cursor) =>
      await this.fetchAny<OpenSeaApiResponse>("assets", {
        cursor,
        asset_contract_address: contractAddress,
        limit: "50",
        order_direction: "asc",
        include_orders: "false",
      });
  }

  public buildEventFetcher(
    eventType: EventTypes = "successful",
    contractAddress: string,
    tokenId?: string
  ): OpenSeaPageFetcher {
    return async (cursor) =>
      await this.fetchAny<OpenSeaApiResponse>("events", {
        cursor,
        asset_contract_address: contractAddress,
        event_type: eventType,
        occurred_after: "0",
        token_id: tokenId,
      });
  }

  private async fetchAny<T extends OpenSeaApiResponse>(
    endPoint: EndPoint,
    params: Params,
    param1?: string
  ) {
    consumptionManager.addAPICallCount();
    const url = buildEndPoint(endPoint, param1);
    const paramsObj = this.getAxiosConfig(params);
    DEBUG_CALLS &&
      console.log({
        url,
        paramsObj,
      });
    const { data, status } = await axios.get<T>(url, paramsObj);
    DEBUG_CALLS && console.log({ data });
    return data;
  }

  private getAxiosConfig(params: Params) {
    return {
      ...headersObj,
      params: {
        ...params,
      },
    };
  }
}

export const openSeaFetcher = new OpenSeaFetcher();
