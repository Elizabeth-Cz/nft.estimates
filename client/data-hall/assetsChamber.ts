import { Chamber } from "./chamber";
import { Asset } from "@skeksify/nfte-common/entities/Asset";
import { Routes } from "@skeksify/nfte-common/routes";

class AssetsChamber extends Chamber<Asset> {
  constructor() {
    super(Routes.ASSETS);
  }
}

export const assetsChamber = new AssetsChamber();
