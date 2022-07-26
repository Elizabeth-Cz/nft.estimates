import { BaseConsumer } from "./base.consumer";
import { openSeaFetcher } from "@APIs/OpenSea/OpenSeaFetcher";
import { syncForEach } from "../../toolset/iterators";
import { logger } from "../../toolset/logger";
import { consumptionManager } from "./consumptionManager";
import { assetRepository } from "@skeksify/nfte-common/dist/repositories/Asset.repository";
import { ConsumptionDataType } from "@skeksify/nfte-common/dist/entities/Consumption";
import { assetLiveDataRepository } from "@skeksify/nfte-common/dist/repositories/AssetLiveData.repository";
import { EntityType } from "@skeksify/nfte-common/dist/entities/Entity";

const numberOfAssetsToTake = 100;

class AssetConsumer extends BaseConsumer {
  constructor() {
    super();
  }

  public async consume(
    contractAddress: string,
    consumptionDataType: ConsumptionDataType,
    tokenId?: string
  ) {
    const isLive = consumptionDataType === ConsumptionDataType.LIVE;
    consumptionManager.initCurrent({
      contractAddressParam: contractAddress,
      targetsType: EntityType.ASSET,
      consumptionDataType,
    });
    await this.fetchAllPages(
      openSeaFetcher.buildAssetFetcher(contractAddress, tokenId),
      10
    );

    this.dataBuffer.chewAssets();

    if (isLive) {
      logger.start("Assets - Live Data Consumption");
      const assetsLiveData = this.dataBuffer
        .generateAssetsLiveData()
        .slice(0, numberOfAssetsToTake);

      await syncForEach(assetsLiveData, async (liveData) => {
        await assetRepository.updateByFields(["tokenId", "collectionAddress"], {
          collectionAddress: liveData.collectionAddress,
          tokenId: liveData.tokenId,
          liveData,
        });
      });
      await assetLiveDataRepository.createMany(assetsLiveData);
      logger.finish(`${assetsLiveData.length} items`);
      consumptionManager.addConsumptionCount(assetsLiveData.length);
    } else {
      logger.start("Assets - OneTime Data Consumption");
      const assets = this.dataBuffer
        .generateAssets()
        .slice(0, numberOfAssetsToTake);
      await syncForEach(assets, async (asset) => {
        await assetRepository.updateByFields(
          ["tokenId", "collectionAddress"],
          asset
        );
      });
      logger.finish(`${assets.length} items`);
      consumptionManager.addConsumptionCount(assets.length);
    }
    await consumptionManager.finalizeAndSave();
  }
}

export const assetConsumer = new AssetConsumer();
