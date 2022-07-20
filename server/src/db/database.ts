import mongoose from "mongoose";
import { connStr } from "./conn";

export class Database {
  constructor() {}

  public async connectToDb() {
    console.log("Connecting to DB...");
    await mongoose.connect(connStr);
    console.log("Connected.");
  }
}

export const db = new Database();
