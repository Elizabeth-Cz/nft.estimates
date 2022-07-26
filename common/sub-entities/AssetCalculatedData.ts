import { prop } from "@typegoose/typegoose";
import { RankedChangingNumber } from "./RankedChangingNumber";

export class AssetCalculatedData {
  constructor(initializer?: Partial<AssetCalculatedData>) {
    Object.assign(this, initializer);
  }
  @prop({ type: () => RankedChangingNumber })
  estimatedValue?: RankedChangingNumber;
  @prop({ type: () => RankedChangingNumber })
  lastPrice?: RankedChangingNumber;
  @prop({ type: () => RankedChangingNumber })
  salesSum?: RankedChangingNumber;
  @prop({ type: () => RankedChangingNumber })
  salesAmount?: RankedChangingNumber;
  @prop()
  snapshotTime?: number;
}
