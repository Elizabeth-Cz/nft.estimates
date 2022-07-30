import { prop } from "@typegoose/typegoose";
import { Entity } from "./Entity";

export class Subscription extends Entity {
  constructor(initializer?: Partial<Subscription>) {
    super();
    Object.assign(this, initializer);
  }

  @prop({ index: true })
  public email?: string;
  @prop()
  public name?: string;
  @prop()
  public ip?: string;
  @prop()
  public country?: string;
  @prop()
  public region?: string;
  @prop()
  public city?: string;
}
