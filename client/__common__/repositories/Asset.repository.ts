import { Asset } from "../entities/Asset";
import { BaseRepository } from "./base.repository";

class AssetRepository extends BaseRepository<Asset, typeof Asset> {
  constructor() {
    super(Asset);
  }
}

export const assetRepository = new AssetRepository();
