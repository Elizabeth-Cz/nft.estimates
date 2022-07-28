import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { EntityType } from "@skeksify/nfte-common/dist/entities/Entity";
import { AssetEventTypes } from "@skeksify/nfte-common/dist/sub-entities/AssetEvent";
import { assetRepository } from "@skeksify/nfte-common/dist/repositories/Asset.repository";
import { syncForEach } from "@skeksify/nfte-common/dist/toolset/iterators";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import _ from "lodash";
import { FilterQuery } from "mongoose";

class EventConsumer extends BaseConsumer {
  constructor() {
    super();
  }

  public async consume(
    eventType: AssetEventTypes,
    contractAddress: string,
    tokenId?: string
  ) {
    logger.start("Events - Data Consumption");
    consumptionManager.initCurrent({
      contractAddressParam: contractAddress,
      targetsType: EntityType.EVENT,
      tokenIdParam: tokenId || "ALL",
    });
    let totalEventsConsumed = 0;
    const consumedTokenIds: string[] = [];

    const query: FilterQuery<Asset> = {
      contractAddress,
    };
    if (tokenId) {
      query.tokenId = tokenId;
    }
    const targetAssets = await assetRepository.getMany(query);

    await syncForEach(targetAssets, async (asset) => {
      const now = Date.now();
      logger.log(`Fetching #${asset.tokenId}'s events`);
      const fromTimestamp = this.getLastConsumption(asset, eventType);

      await this.fetchAllPages(
        openSeaFetcher.buildEventFetcher(
          eventType,
          fromTimestamp,
          contractAddress,
          asset.tokenId
        )
      );

      this.dataBuffer.chewEvents();

      const assetEvents = this.dataBuffer.generateEvents();

      await assetRepository.addEvents(
        {
          tokenId: asset.tokenId,
          collectionAddress: contractAddress,
        },
        assetEvents,
        now
      );
      totalEventsConsumed += _.size(assetEvents);
      console.log("Fetched ", assetEvents.length, " items on ", fromTimestamp);
      asset.tokenId && consumedTokenIds.push(asset.tokenId);
      this.dataBuffer.dropEvents();
    });
    logger.finish(`Total Events consumed: ${totalEventsConsumed}`);
    console.log("CONSUMED TOKEN IDS");
    console.log(consumedTokenIds.join("-"));
    consumptionManager.addConsumptionCount(totalEventsConsumed);
    await consumptionManager.finalizeAndSave();
  }

  private getLastConsumption(asset: Asset, eventType: AssetEventTypes): number {
    if (asset) {
      if (eventType === AssetEventTypes.SALE) {
        return asset.events?.sales?.lastConsumption || 0;
      } else if (eventType === AssetEventTypes.BID) {
        return asset.events?.bids?.lastConsumption || 0;
      }
    } else {
      throw new Error("Asset not found - Can't consume events");
    }
    return 0;
  }
}

export const eventsConsumer = new EventConsumer();
