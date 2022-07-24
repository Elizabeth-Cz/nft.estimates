import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { ConsumptionDataType } from "@skeksify/nfte-common/dist/entities/Consumption";
import { collectionRepository } from "@skeksify/nfte-common/dist/repositories/Collection.repository";
import { EntityType } from "@skeksify/nfte-common/dist/entities/Entity";

class CollectionConsumer extends BaseConsumer {
  constructor() {
    super();
  }

  public async consume(
    contractAddress: string,
    consumptionDataType: ConsumptionDataType
  ) {
    const isLive = consumptionDataType === ConsumptionDataType.LIVE;
    consumptionManager.initCurrent({
      contractAddressParam: contractAddress,
      targetsType: EntityType.COLLECTION,
      consumptionDataType,
    });
    await this.fetchAllPages(
      openSeaFetcher.buildCollectionFetcher(contractAddress),
      10
    );

    const collection = this.dataBuffer.generateCollection();
    if (isLive) {
      // logger.start("Collection - Live Data Consumption");
      // const collection = this.dataBuffer.generateCollection();
      //
      // await collectionRepository.updateByFields(['slug'], {
      //   slug: contractAddress,
      //   ...colly
      // });
      // await assetLiveDataRepository.createMany(assetsLiveData);
      // logger.finish(`${assetsLiveData.length} items`);
      // consumptionManager.addConsumptionCount(assetsLiveData.length);
    } else {
      logger.start("Collection - OneTime Data Consumption");

      await collectionRepository.updateByFields(["slug"], {
        ...collection,
      });
      logger.finish(`1 item`);
      consumptionManager.addConsumptionCount(1);
    }
    await consumptionManager.finalizeAndSave();
  }
}

export const collectionConsumer = new CollectionConsumer();
