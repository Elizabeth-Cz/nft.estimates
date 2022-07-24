import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";
import _ from "lodash";
import { openSeaMapper } from "@APIs/OpenSea/OpenSeaMapper";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { AssetLiveData } from "@skeksify/nfte-common/dist/entities/AssetLiveData";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";

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
