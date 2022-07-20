import { BaseRepository } from "./base.repository";
import { Collection } from "../entities/collection";

class CollectionRepository extends BaseRepository<
  Collection,
  typeof Collection
> {
  constructor() {
    super(Collection);
  }
}

export const collectionRepository = new CollectionRepository();
