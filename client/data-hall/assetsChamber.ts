import { Chamber } from "./chamber";
import { Asset } from "@COMMON/entities/Asset";
import { Routes } from "@COMMON/routes";

class AssetsChamber extends Chamber<Asset> {
  constructor() {
    super(Routes.ASSETS);
  }
}

export const assetsChamber = new AssetsChamber();
