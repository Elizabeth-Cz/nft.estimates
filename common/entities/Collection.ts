import { Entity } from "./Entity";
import { prop } from "@typegoose/typegoose";
import { CollectionCalculatedData } from "../sub-entities/CollectionCalculatedData";

export class Collection extends Entity {
  constructor(initializer?: Partial<Collection>) {
    super();
    Object.assign(this, initializer);
  }
  @prop()
  contractAddress?: string;
  @prop()
  name?: string;
  @prop()
  slug?: string;
  @prop()
  description?: string;
  @prop()
  discordUrl?: string;
  @prop()
  externalUrl?: string;
  @prop()
  imageUrl?: string;
  @prop()
  bannerImageUrl?: string;
  @prop()
  telegramUrl?: string;
  @prop()
  twitterUsername?: string;
  @prop()
  instagramUsername?: string;
  @prop()
  supply?: number;
  @prop({ type: () => CollectionCalculatedData })
  calculatedData?: CollectionCalculatedData;
}
