import { prop } from "@typegoose/typegoose";
import { AssetEvent } from "./AssetEvent";

export class AssetEventData {
  @prop({ default: 0 })
  lastConsumption?: number;
  @prop({ type: () => [AssetEvent] })
  history?: AssetEvent[];

  constructor(initializer?: Partial<AssetEventData>) {
    Object.assign(this, initializer);
  }
}
