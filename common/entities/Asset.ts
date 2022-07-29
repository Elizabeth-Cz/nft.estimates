import { Entity } from "./Entity";
import { prop } from "@typegoose/typegoose";
import { AssetLiveData } from "./AssetLiveData";
import { AssetEventsData } from "../sub-entities/AssetEventsData";
import { AssetCalculatedData } from "../sub-entities/AssetCalculatedData";

export class Asset extends Entity {
  @prop({ index: true })
  public tokenId?: string;
  @prop({ index: true })
  public collectionAddress?: string;
  @prop()
  public collectionName?: string;
  @prop()
  public name?: string;
  @prop()
  public imageUrl?: string;
  @prop()
  public thumbnailImageUrl?: string;
  @prop()
  public description?: string;
  @prop()
  public permalink?: string;
  @prop()
  public mintingDate?: string;
  @prop({ type: () => [Trait] })
  public traits?: Trait[] = [];
  @prop({ type: AssetLiveData })
  public liveData?: AssetLiveData;
  @prop({ type: () => AssetEventsData })
  public events?: AssetEventsData;
  @prop({ type: () => AssetCalculatedData })
  public calculatedData?: AssetCalculatedData;

  constructor(initializer?: Partial<Asset>) {
    super();
    Object.assign(this, initializer);
  }
}

export class Trait {
  @prop()
  name?: string;
  @prop()
  value?: string;
  @prop()
  dataType?: null | "number";
  @prop()
  sharersCount?: number;
}
