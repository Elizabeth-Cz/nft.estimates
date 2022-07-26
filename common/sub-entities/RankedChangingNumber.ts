import { prop } from "@typegoose/typegoose";
import { ChangingNumber } from "./ChangingNumber";
import { ChangingRank } from "./ChangingRank";

export class RankedChangingNumber {
  constructor(initializer?: Partial<RankedChangingNumber>) {
    Object.assign(this, initializer);
  }
  @prop()
  selfValue?: ChangingNumber;
  @prop()
  collectionRank?: ChangingRank;
  @prop()
  globalRank?: ChangingRank;
}
