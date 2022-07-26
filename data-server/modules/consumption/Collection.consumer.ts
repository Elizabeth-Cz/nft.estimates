import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { collectionRepository } from "@skeksify/nfte-common/dist/repositories/Collection.repository";
import { EntityType } from "@skeksify/nfte-common/dist/entities/Entity";

class CollectionConsumer extends BaseConsumer {
  constructor() {
    super();
  }

  public async consume(contractAddress: string) {
    consumptionManager.initCurrent({
      contractAddressParam: contractAddress,
      targetsType: EntityType.COLLECTION,
    });
    await this.fetchAllPages(
      openSeaFetcher.buildCollectionFetcher(contractAddress),
      10
    );

    const collection = this.dataBuffer.generateCollection();
    logger.start("Collection - OneTime Data Consumption");

    await collectionRepository.updateByFields(["slug"], {
      ...collection,
    });
    logger.finish(`1 item`);
    consumptionManager.addConsumptionCount(1);
    await consumptionManager.finalizeAndSave();
  }
}

export const collectionConsumer = new CollectionConsumer();
