import { db } from "../../src/db/database";
import { assetRepository } from "./asset.repository";

class DataCenter {
  public assets = assetRepository;

  constructor() {}

  public async init() {
    await db.connectToDb();
  }
}

export const dataCenter = new DataCenter();
