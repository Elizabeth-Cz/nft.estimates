import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { EntityType } from "@skeksify/nfte-common/dist/entities/Entity";
import { AssetEventTypes } from "@skeksify/nfte-common/dist/sub-entities/AssetEvent";
import { assetRepository } from "@skeksify/nfte-common/dist/repositories/Asset.repository";

class EventConsumer extends BaseConsumer {
  constructor() {
    super();
  }

  public async consume(
    eventType: AssetEventTypes,
    contractAddress: string,
    tokenId?: string
  ) {
    const now = Date.now();
    consumptionManager.initCurrent({
      contractAddressParam: contractAddress,
      targetsType: EntityType.EVENT,
      tokenIdParam: tokenId,
    });

    const fromTimestamp = await this.getLastConsumption(
      contractAddress,
      tokenId || "___temporary___",
      eventType
    );

    await this.fetchAllPages(
      openSeaFetcher.buildEventFetcher(
        eventType,
        fromTimestamp,
        contractAddress,
        tokenId
      ),
      10
    );

    this.dataBuffer.chewEvents();

    logger.start("Events - Data Consumption");
    const assetEvents = this.dataBuffer.generateEvents();

    await assetRepository.addEvents(
      {
        tokenId,
        collectionAddress: contractAddress,
      },
      assetEvents,
      now
    );
    logger.finish(`${assetEvents.length} items`);
    consumptionManager.addConsumptionCount(assetEvents.length);
    await consumptionManager.finalizeAndSave();
  }

  private async getLastConsumption(
    contractAddress: string,
    tokenId: string,
    eventType: AssetEventTypes
  ): Promise<number> {
    const targetAsset = await assetRepository.getAsset(
      contractAddress,
      tokenId || ""
    );

    if (targetAsset) {
      if (eventType === AssetEventTypes.SALE) {
        return targetAsset.events?.sales?.lastConsumption || 0;
      } else if (eventType === AssetEventTypes.BID) {
        return targetAsset.events?.bids?.lastConsumption || 0;
      }
    } else {
      throw new Error("Asset not found - Can't consume events");
    }
    return 0;
  }
}

export const eventsConsumer = new EventConsumer();
