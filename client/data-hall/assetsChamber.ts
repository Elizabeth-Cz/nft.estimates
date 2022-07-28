import { Chamber } from "./chamber";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { Routes } from "@skeksify/nfte-common/dist/routes";

class AssetsChamber extends Chamber<Asset> {
  constructor() {
    super(Routes.ASSETS);
  }
}

export const assetsChamber = new AssetsChamber();
