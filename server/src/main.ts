import Express from "express";
import { db } from "./db/database";
import cors from "cors";
import { assetRepository } from "../common/repositories/Asset.repository";
import { Routes } from "../common/routes";
import { collectionRepository } from "../common/repositories/Collection.repository";

const app = Express();
const PORT = 9000;
const HOST = "0.0.0.0";

const makeErrObj = (msg: string) => ({
  msg,
  error: true,
});

const makeResultObj = (items: any[]) => {
  const data = items.filter((item) => !!item);
  return {
    data,
    length: data.length,
  };
};

app.use(cors());

app.get(Routes.DATA_HALL_ROOT + Routes.ASSETS, async (req, res) => {
  const { query } = req;
  console.log("Serving Asset", query);
  const { tokenId, collectionId, filter_text } = query || {};
  if (typeof tokenId === "string" && typeof collectionId === "string") {
    const asset = await assetRepository.getOne({
      tokenId,
      collectionAddress: collectionId,
    });
    res.send(makeResultObj([asset]));
  } else if (typeof filter_text === "string") {
    const results = await assetRepository.getMany({
      $or: [
        { tokenId: { $regex: filter_text } },
        { $text: { $search: filter_text } },
      ],
    });
    results && res.send(makeResultObj(results));
  } else {
    res.send(makeErrObj(`Bad id (${tokenId})`));
  }
});

app.get(Routes.DATA_HALL_ROOT + Routes.COLLECTIONS, async (req, res) => {
  const { query } = req;
  console.log("Serving Collection", query);
  const { collectionId } = query || {};
  if (typeof collectionId === "string") {
    const collection = await collectionRepository.getOne({
      collectionAddress: collectionId,
    });
    res.send(makeResultObj([collection]));
  } else {
    res.send(makeErrObj(`Bad id (${collectionId})`));
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  try {
    db.connectToDb();
  } catch (e) {
    console.log(`Can't connect to db (${e})`);
    process.exit();
  }
});
