import { Chamber } from "./chamber";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { Routes } from "@skeksify/nfte-common/dist/routes";

class CollectionsChamber extends Chamber<Collection> {
  constructor() {
    super(Routes.COLLECTIONS);
  }
}

export const collectionsChamber = new CollectionsChamber();
