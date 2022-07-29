import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Express from "express";
import cors from "cors";
import { assetRepository } from "@skeksify/nfte-common/dist/repositories/Asset.repository";
import { connectToDb } from "@skeksify/nfte-common/dist/db/connect";
import { collectionRepository } from "@skeksify/nfte-common/dist/repositories/Collection.repository";
import { Routes } from "@skeksify/nfte-common/dist/routes";

dotenv.config();

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
  if (typeof tokenId === "string" || typeof collectionId === "string") {
    if (typeof tokenId === "string") {
      const asset = await assetRepository.getOne({
        tokenId,
        collectionAddress: collectionId,
      });
      res.send(makeResultObj([asset]));
    } else {
      const assets = await assetRepository.getMany({
        collectionAddress: collectionId,
      });
      res.send(makeResultObj(assets));
    }
  } else if (typeof filter_text === "string") {
    const results = await assetRepository.getMany({
      $or: [
        { tokenId: { $regex: filter_text } },
        { $text: { $search: filter_text } },
      ],
    });
    results && res.send(makeResultObj(results));
  } else {
    res.send(makeErrObj(`Bad tokenId (${tokenId})`));
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
    res.send(makeErrObj(`Bad collectionId (${collectionId})`));
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  try {
    connectToDb();
  } catch (e) {
    console.log(`Can't connect to db (${e})`);
    process.exit();
  }
});
