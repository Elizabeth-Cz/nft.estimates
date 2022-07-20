import { Chamber } from "./chamber";
import {Collection} from "@skeksify/nfte-common/entities/Collection";
import {Routes} from "@skeksify/nfte-common/routes";

class CollectionsChamber extends Chamber<Collection> {
  constructor() {
    super(Routes.COLLECTIONS);
  }
}

export const collectionsChamber = new CollectionsChamber();
