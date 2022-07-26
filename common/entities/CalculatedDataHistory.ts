import { Entity } from "./Entity";
import { prop } from "@typegoose/typegoose";
import { AssetCalculatedData } from "../sub-entities/AssetCalculatedData";
import { CollectionCalculatedData } from "../sub-entities/CollectionCalculatedData";

export enum HistoryType {
  ASSET = "ASSET",
  COLLECTION = "COLLECTION",
}

export class CalculatedDataHistory extends Entity {
  @prop({ index: true })
  public tokenId?: string;
  @prop({ index: true })
  public collectionAddress?: string;
  @prop({ enum: HistoryType })
  public historyType?: HistoryType;
  @prop({ type: () => AssetCalculatedData })
  public assetData?: AssetCalculatedData;
  @prop({ type: () => CollectionCalculatedData })
  public collectionData?: CollectionCalculatedData;

  constructor(initializer?: Partial<CalculatedDataHistory>) {
    super();
    Object.assign(this, initializer);
  }
}
