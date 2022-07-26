import { BaseRepository } from "./base.repository";
import { CalculatedDataHistory } from "../entities/CalculatedDataHistory";

class CollectionRepository extends BaseRepository<
  CalculatedDataHistory,
  typeof CalculatedDataHistory
> {
  constructor() {
    super(CalculatedDataHistory);
  }
}

export const calculatedDataHistoryRepository = new CollectionRepository();
