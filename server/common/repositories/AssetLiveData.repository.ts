import { BaseRepository } from "./base.repository";
import { AssetLiveData } from "../entities/AssetLiveData";

class AssetLiveDataRepository extends BaseRepository<
  AssetLiveData,
  typeof AssetLiveData
> {
  constructor() {
    super(AssetLiveData);
  }
}

export const assetLiveDataRepository = new AssetLiveDataRepository();
