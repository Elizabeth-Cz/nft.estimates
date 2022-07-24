import { prop } from "@typegoose/typegoose";
import { Entity } from "./Entity";

export class AssetLiveData extends Entity {
  constructor(initializer?: Partial<AssetLiveData>) {
    super();
    Object.assign(this, initializer);
  }

  @prop({ index: true })
  public tokenId?: string;
  @prop({ index: true })
  public collectionAddress?: string;
  @prop()
  public onSale?: boolean;
  @prop()
  public lastSalePrice?: number;
  @prop()
  public lastSalePriceUSD?: number;
  @prop()
  public lastSaleDate?: string;
  @prop()
  public whatever?: string;
}
