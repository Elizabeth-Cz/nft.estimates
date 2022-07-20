import { assetRepository } from "./asset.repository";
import { connectToDb } from "../db/connect";

class DataCenter {
  public assets = assetRepository;

  constructor() {}

  public async init() {
    await connectToDb();
  }
}

export const dataCenter = new DataCenter();
