import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { assetRepository } from "@COMMON/repositories/asset.repository";
import { syncForEach } from "../../toolset/iterators";
import { assetLiveDataRepository } from "@COMMON/repositories/assetLiveData.repository";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { EntityType } from "@COMMON/entities/entity";
import { ConsumptionDataType } from "@COMMON/entities/Consumption";
import { collectionRepository } from "@COMMON/repositories/Collection.repository";

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
