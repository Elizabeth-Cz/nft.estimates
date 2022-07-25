import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";
import _ from "lodash";
import { openSeaMapper } from "@APIs/OpenSea/OpenSeaMapper";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { AssetLiveData } from "@skeksify/nfte-common/dist/entities/AssetLiveData";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { OpenSeaEvent } from "@APIs/OpenSea/OpenSea.event";
import { AssetEvent } from "@skeksify/nfte-common/dist/entities/AssetEvent";

const chewChunksArray = <T>(chunks: T[][]): T[] =>
  _.flatten(chunks.reverse()).reverse();

export class DataBuffer {
  private rawAssetChunks: OpenSeaAsset[][] = [];
  private rawEventChunks: OpenSeaEvent[][] = [];
  private rawCollection: OpenSeaCollection | null = null;
  public chewedAssets: OpenSeaAsset[] = [];
  private chewedEvents: OpenSeaEvent[] = [];

  constructor() {}

  public loadRawAssetChunk(chunk: OpenSeaAsset[]) {
    this.rawAssetChunks.push(chunk);
  }

  public loadRawCollection(collection: OpenSeaCollection) {
    this.rawCollection = collection;
  }

  public loadRawEventsChunk(chunk: OpenSeaEvent[]) {
    this.rawEventChunks.push(chunk);
  }

  public generateAssets(): Asset[] {
    return this.chewedAssets.map(openSeaMapper.toAsset);
  }

  public generateAssetsLiveData(): AssetLiveData[] {
    return this.chewedAssets.map(openSeaMapper.toAssetLiveData);
  }

  public generateCollection(): Collection | null {
    return this.rawCollection && openSeaMapper.toCollection(this.rawCollection);
  }

  public generateEvents(): AssetEvent[] {
    return this.chewedEvents.map(openSeaMapper.toEvent);
  }

  public chewAssets() {
    this.chewedAssets = chewChunksArray(this.rawAssetChunks);
  }

  public chewEvents() {
    this.chewedEvents = chewChunksArray(this.rawEventChunks);
  }
}
