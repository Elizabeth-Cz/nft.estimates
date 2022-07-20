import { Entity } from "./entity";
import { prop } from "@typegoose/typegoose";

export class Collection extends Entity {
  constructor(initializer: Partial<Collection>) {
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
  bannerImageUrl?: string;
  @prop()
  telegramUrl?: string;
  @prop()
  twitterUsername?: string;
  @prop()
  instagramUsername?: string;
}
