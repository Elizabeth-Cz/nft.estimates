import { Chamber } from "./chamber";
import { Routes } from "@COMMON/routes";
import { Collection } from "@COMMON/entities/Collection";

class CollectionsChamber extends Chamber<Collection> {
  constructor() {
    super(Routes.COLLECTIONS);
  }
}

export const collectionsChamber = new CollectionsChamber();
