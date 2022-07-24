import { Time } from "../../toolset/time";
import moment from "moment";
import { Consumption } from "@skeksify/nfte-common/dist/entities/Consumption";
import { consumptionRepository } from "@skeksify/nfte-common";

class ConsumptionManager {
  private current: Consumption;
  private startTimeUnix: number = 0;

  constructor(info?: Partial<Consumption>) {
    this.current = new Consumption(info);
  }

  public initCurrent(info: Partial<Consumption>) {
    this.current = new Consumption(info);
    this.startTimeUnix = Date.now();
  }

  public updateCurrent(updates: Partial<Consumption>) {
    Object.assign(this.current, updates);
  }

  public addAPICallCount(countAmount: number = 1) {
    this.current.apiCallsCount =
      (this.current.apiCallsCount || 0) + countAmount;
  }

  public addConsumptionCount(amount: number = 1) {
    this.current.consumedCount = (this.current.consumedCount || 0) + amount;
  }

  public async finalizeAndSave(): Promise<void> {
    this.current.startTime = Time.format(this.startTimeUnix);
    this.current.endTime = Time.now();
    this.current.consumptionDuration = Date.now() - this.startTimeUnix;
    this.current.consumptionDurationText = moment
      .duration(this.current.consumptionDuration)
      .humanize();

    await consumptionRepository.createMany([this.current]);
  }

  public getCurrent(): Consumption | null {
    return this.current;
  }
}

export const consumptionManager = new ConsumptionManager();
