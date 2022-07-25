import { Asset, AssetEventData, AssetEventsData } from "../entities/Asset";
import { BaseRepository } from "./base.repository";
import { AssetEvent } from "../entities/AssetEvent";
import { FilterQuery } from "mongoose";

class AssetRepository extends BaseRepository<Asset, typeof Asset> {
  constructor() {
    super(Asset);
  }

  public async addEvent(
    filter: FilterQuery<Asset>,
    event: AssetEvent,
    timestamp: number
  ) {
    await this.initEvents(filter);
    return this.model.update(filter, {
      $push: { "events.sales.history": event },
      $set: { "events.sales.lastConsumption": timestamp },
    });
  }

  public async addEvents(
    filter: FilterQuery<Asset>,
    events: AssetEvent[],
    timestamp: number
  ) {
    await this.initEvents(filter);
    return this.model.update(filter, {
      $push: { "events.sales.history": { $each: events } },
      $set: { "events.sales.lastConsumption": timestamp },
    });
  }

  public async getAsset(contractAddress: string, tokenId: string) {
    return await this.getOne({
      contractAddress,
      tokenId,
    });
  }

  private async initEvents(filter: FilterQuery<Asset>) {
    await this.update(
      {
        ...filter,
        events: { $exists: false },
      },
      {
        events: new AssetEventsData({
          sales: new AssetEventData({
            history: [],
            lastConsumption: 0,
          }),
          bids: new AssetEventData({
            history: [],
            lastConsumption: 0,
          }),
        }),
      },
      false
    );
  }
}

export const assetRepository = new AssetRepository();
