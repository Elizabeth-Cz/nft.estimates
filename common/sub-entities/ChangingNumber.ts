import { prop } from "@typegoose/typegoose";

export class ChangingNumber {
  constructor(initializer?: Partial<ChangingNumber>) {
    Object.assign(this, initializer);
  }
  @prop()
  value: number = 0;
  @prop()
  changePercent?: number;
}
