import { BaseRepository } from "./base.repository";
import { Consumption } from "../entities/Consumption";

class ConsumptionRepository extends BaseRepository<
  Consumption,
  typeof Consumption
> {
  constructor() {
    super(Consumption);
  }
}

export const consumptionRepository = new ConsumptionRepository();
