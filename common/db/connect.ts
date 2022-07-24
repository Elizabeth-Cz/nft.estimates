import mongoose from "mongoose";

export async function connectToDb() {
  console.log("Connecting to DB...");
  const connStr = process.env.DB_CONN_STR;
  if (!connStr) {
    throw new Error(
      "No DB Connection String (Missing env variable DB_CONN_STR)"
    );
  }
  await mongoose
    .connect(connStr)
    .catch((e) => console.log("DB CONN FAILED", e));
  console.log("Connected.");
}
