import { prop } from "@typegoose/typegoose";
import { AssetEventData } from "./AssetEventData";

export class AssetEventsData {
  @prop({ type: () => AssetEventData })
  sales?: AssetEventData;
  @prop({ type: () => AssetEventData })
  bids?: AssetEventData;

  constructor(initializer?: Partial<AssetEventsData>) {
    Object.assign(this, initializer);
  }
}
