import { Entity } from "./Entity";
import { prop } from "@typegoose/typegoose";

export enum AssetEventTypes {
  CREATION = "CREATION",
  SALE = "SALE",
  BID = "BID",
}

export class OpenSeaUserAccount {
  @prop()
  username?: string;
  @prop()
  address?: string;
  @prop()
  profileImageUrl?: string;

  constructor(initializer: Partial<OpenSeaUserAccount>) {
    Object.assign(this, initializer);
  }
}

export class AssetEvent extends Entity {
  @prop()
  eventId?: number;
  @prop()
  contractAddress?: string;
  @prop()
  tokenId?: string;
  @prop({
    enum: AssetEventTypes,
    type: String,
  })
  eventType?: AssetEventTypes;
  @prop()
  eventTime?: string;
  @prop()
  price?: number;
  @prop()
  usdPrice?: string;
  @prop()
  quantity?: string;
  @prop()
  seller?: OpenSeaUserAccount;
  @prop()
  buyer?: OpenSeaUserAccount;

  constructor(initializer: Partial<AssetEvent>) {
    super();
    Object.assign(this, initializer);
  }
}
