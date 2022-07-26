import { prop } from "@typegoose/typegoose";

export class ChangingRank {
  constructor(initializer?: Partial<ChangingRank>) {
    Object.assign(this, initializer);
  }
  @prop()
  value?: number;
  @prop()
  rankOffset?: number;
}
