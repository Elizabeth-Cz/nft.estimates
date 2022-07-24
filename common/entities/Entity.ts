import { pre, prop } from "@typegoose/typegoose";
import moment from "moment";
import { DateFormat } from "../toolset/dateTime";

export enum EntityType {
  ASSET = "ASSET",
  COLLECTION = "COLLECTION",
  EVENT = "EVENT",
}

@pre<Entity>(/^update/, function () {
  const now = moment().format(DateFormat.FULL);
  this.updated = now;
  if (!this.created) {
    this.created = now;
  }
})
export class Entity {
  id?: string = "";

  @prop()
  public updated?: string;
  @prop()
  public created?: string;
}
