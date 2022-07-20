import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";
import _ from "lodash";
import { Asset } from "@COMMON/entities/Asset";
import { openSeaMapper } from "@APIs/OpenSea/OpenSeaMapper";
import { AssetLiveData } from "@COMMON/entities/AssetLiveData";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";
import { Collection } from "@COMMON/entities/Collection";

const chewChunksArray = <T>(chunks: T[][]): T[] =>
  _.flatten(chunks.reverse()).reverse();

export class DataBuffer {
  private rawAssetChunks: OpenSeaAsset[][] = [];
  private rawCollection: OpenSeaCollection | null = null;
  public chewedAssets: OpenSeaAsset[] = [];

  constructor() {}

  public loadRawCollection(collection: OpenSeaCollection) {
    this.rawCollection = collection;
  }

  public loadRawAssetChunk(chunk: OpenSeaAsset[]) {
    this.rawAssetChunks.push(chunk);
  }

  public generateCollection(): Collection | null {
    return this.rawCollection && openSeaMapper.toCollection(this.rawCollection);
  }

  public generateAssets(): Asset[] {
    return this.chewedAssets.map(openSeaMapper.toAsset);
  }

  public generateAssetsLiveData(): AssetLiveData[] {
    return this.chewedAssets.map(openSeaMapper.toAssetLiveData);
  }

  public chewAssets() {
    this.chewedAssets = chewChunksArray(this.rawAssetChunks);
  }
}
