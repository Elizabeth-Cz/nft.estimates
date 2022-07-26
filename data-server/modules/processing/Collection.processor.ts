import { assetRepository } from "@skeksify/nfte-common/dist/repositories/Asset.repository";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import _ from "lodash";
import { AssetCalculatedData } from "@skeksify/nfte-common/dist/sub-entities/AssetCalculatedData";
import { BaseProcessor } from "./base.processor";
import { DocumentType } from "@typegoose/typegoose/lib/types";
import { CollectionCalculatedData } from "@skeksify/nfte-common/dist/sub-entities/CollectionCalculatedData";
import { collectionRepository } from "@skeksify/nfte-common/dist/repositories/Collection.repository";
import { calculatedDataHistoryRepository } from "@skeksify/nfte-common/dist/repositories/CalculatedDataHistory.repository";
import {
  CalculatedDataHistory,
  HistoryType,
} from "@skeksify/nfte-common/dist/entities/CalculatedDataHistory";

class CollectionProcessor extends BaseProcessor {
  private collectionCalculatedData: CollectionCalculatedData =
    new CollectionCalculatedData();

  public async process(contractAddress: string) {
    this.collectionCalculatedData = new CollectionCalculatedData();
    console.log("Processing", contractAddress);
    const allAssets = await assetRepository.getMany({
      $and: [{ contractAddress }, { events: { $exists: true } }],
    });
    allAssets.forEach((asset) => this.calculatePricesAndSales(asset));
    console.log(`Saving ${allAssets.length} documents`);
    await assetRepository.saveMany(allAssets);
    console.log("Updating Collection");
    await collectionRepository.update(
      { contractAddress },
      { calculatedData: this.collectionCalculatedData }
    );
    await calculatedDataHistoryRepository.createOne(
      new CalculatedDataHistory({
        collectionAddress: contractAddress,
        historyType: HistoryType.COLLECTION,
        collectionData: this.collectionCalculatedData,
      })
    );
    console.log("Collection Processing Complete");
  }

  private calculatePricesAndSales(asset: DocumentType<Asset>) {
    const saleEvents = asset.events?.sales?.history || [];
    const salesAmount = _.size(saleEvents);
    const lastSalePrice = asset.liveData?.lastSalePrice;
    this.collectionCalculatedData.accumulateDataFromAsset(asset);
    if (salesAmount !== asset.calculatedData?.salesAmount?.selfValue?.value) {
      const calculatedAssetData =
        asset.calculatedData || new AssetCalculatedData();

      calculatedAssetData.lastPrice = this.buildRankedChangingNumber(
        calculatedAssetData.lastPrice,
        this.buildChangingNumber(
          calculatedAssetData.lastPrice?.selfValue,
          lastSalePrice,
          calculatedAssetData.lastPrice?.selfValue?.value
        )
      );

      calculatedAssetData.salesAmount = this.buildRankedChangingNumber(
        calculatedAssetData.salesAmount,
        this.buildChangingNumber(
          calculatedAssetData.salesAmount?.selfValue,
          salesAmount,
          calculatedAssetData.salesAmount?.selfValue?.value
        )
      );

      calculatedAssetData.salesSum = this.buildRankedChangingNumber(
        calculatedAssetData.salesSum,
        this.buildChangingNumber(
          calculatedAssetData.salesSum?.selfValue,
          _.sumBy(saleEvents, (sale) => sale.price || 0),
          calculatedAssetData.salesSum?.selfValue?.value
        )
      );

      calculatedAssetData.snapshotTime = Date.now();

      asset.calculatedData = calculatedAssetData;
      asset.markModified("calculatedData");
    }
  }
}

export const collectionProcessor = new CollectionProcessor();
