import axios from "axios";
import { getArgs } from "../../index";
import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";
import { Asset } from "@COMMON/entities/asset";
import { Collection } from "@COMMON/entities/Collection";
import { dataCenter } from "@COMMON/repositories/dataCenter";
import { PingThrottler } from "../../toolset/pingThrottler";
import { openSeaMapper } from "@APIs/OpenSea/OpenSeaMapper";

type NullableString = string | null;

interface AssetsApiResponse {
  assets: OpenSeaAsset[];
  next: NullableString;
  previous: NullableString;
}

let i = 0;

const fetchAssets = async (
  contractAddress: string,
  limit: string,
  cursor?: string
): Promise<AssetsApiResponse> => {
  console.log(`Fetching page ${cursor || "#1"}`);
  const { data } = await axios.get<AssetsApiResponse>(
    `https://api.opensea.io/api/v1/assets`,
    {
      headers: {
        "X-API-KEY": "0037e16da01741fd8bd8ae743c911b3d",
      },
      params: {
        cursor,
        limit,
        asset_contract_address: contractAddress,
        order_direction: "asc",
        include_orders: "false",
      },
    }
  );
  return data;
};

const saveAssetsToDb = async (assets: Asset[]): Promise<void> => {
  if (getArgs().skipDb) {
    return;
  }
  console.time("DB Save");
  console.log(
    `Saving assets ${assets[assets.length - 1]?.tokenId} to ${
      assets[0]?.tokenId
    }...`
  );
  // await syncForEach(assets, async (asset) => {
  //     await dataCenter.assets.save(asset);
  //     console.log("Saved", asset.tokenId);
  // })
  await dataCenter.assets.createMany(assets);
  console.timeEnd("DB Save");
};

async function fetchAndSaveByCursor(
  contractAddress: string,
  limit: string,
  receivedCursor?: string
): Promise<NullableString> {
  const { assets, previous }: AssetsApiResponse = await fetchAssets(
    contractAddress,
    limit,
    receivedCursor
  );
  console.log(`Received ${assets.length} records, starting DB writing`);
  // await saveAssetsToDb(assets);
  return previous;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const consumeFirstAsset = async (contractAddress: string) => {
  const { assets } = await fetchAssets(contractAddress, "20");
  const localAssets = assets.map((openSeaAsset) =>
    openSeaMapper.toAsset(openSeaAsset)
  );
  await saveAssetsToDb(localAssets);
};

export const consumeAssets = async (contractAddress: string) => {
  console.time("Total Time");
  console.log(`Fetching assets for contract address ${contractAddress}`);
  let cursor: NullableString | undefined = undefined;
  while (i++ < 300 && cursor) {
    console.timeLog("Total Time");
    cursor = await fetchAndSaveByCursor(contractAddress, "50", cursor);
  }
  console.timeEnd("Total Time");
  console.log(`Consumption complete after ${i} iterations`);
};

export const playground = async () => {
  // const pingo = new PingThrottler(5, 2);
  //
  // await sleep(pingo.delayRequired());
  // pingo.ping();
};
