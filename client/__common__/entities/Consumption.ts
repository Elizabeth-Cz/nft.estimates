import { Entity, EntityType } from "./entity";
import { prop } from "@typegoose/typegoose";

export enum ConsumptionDataType {
  ONETIME = "ONETIME",
  LIVE = "LIVE",
}

export class Consumption extends Entity {
  constructor(initializer?: Partial<Consumption>) {
    super();
    Object.assign(this, initializer);
  }

  @prop()
  public targetsType?: EntityType;
  @prop()
  public consumptionDataType?: ConsumptionDataType;
  @prop()
  public consumedCount?: number;
  @prop()
  public apiCallsCount?: number;
  @prop()
  public contractAddressParam?: string;
  @prop()
  public tokenIdParam?: string;
  @prop()
  public params?: string;
  @prop()
  public startTime?: string;
  @prop()
  public endTime?: string;
  @prop()
  public consumptionDuration?: number;
  @prop()
  public consumptionDurationText?: string;
}
