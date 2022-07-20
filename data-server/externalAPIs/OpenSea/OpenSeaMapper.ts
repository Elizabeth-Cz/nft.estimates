import _ from "lodash";
import { OpenSeaAsset } from "./OpenSea.asset";
import mongoose from "mongoose";
import { Asset } from "@COMMON/entities/Asset";
import { AssetLiveData } from "@COMMON/entities/AssetLiveData";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";
import { Collection } from "@COMMON/entities/Collection";

const quintillion = Math.pow(10, 18);
const getPrice = (price?: number | string) => (price ? +price : 0);
const getBigPrice = (price?: number | string) => getPrice(price) / quintillion;

class OpenSeaMapper {
  constructor() {}

  public toCollection = (openSeaCollection: OpenSeaCollection): Collection => {
    const primaryAssetContracts = (openSeaCollection.primary_asset_contracts ||
      [])[0];
    return new Collection({
      contractAddress: primaryAssetContracts?.address,
      name: openSeaCollection.name,
      slug: openSeaCollection.slug,
      description: openSeaCollection.description,
      discordUrl: openSeaCollection.discord_url,
      externalUrl: openSeaCollection.external_url,
      bannerImageUrl: openSeaCollection.banner_image_url,
      telegramUrl: openSeaCollection.telegram_url,
      twitterUsername: openSeaCollection.twitter_username,
      instagramUsername: openSeaCollection.instagram_username,
    });
  };

  public toAsset = (openSeaAsset: OpenSeaAsset): Asset => {
    return new Asset({
      id: new mongoose.mongo.ObjectId().toString(),
      ..._.pick(openSeaAsset, ["name", "description", "permalink"]),
      collectionAddress: openSeaAsset.asset_contract?.address,
      collectionName: openSeaAsset.collection?.name,
      tokenId: openSeaAsset.token_id,
      imageUrl: openSeaAsset.image_url,
      traits: openSeaAsset.traits.map((trait) => ({
        name: trait.trait_type,
        value: trait.value,
        dataType: trait.display_type,
        sharersCount: trait.trait_count,
      })),
      liveData: this.toAssetLiveData(openSeaAsset),
    });
  };

  public toAssetLiveData(openSeaAsset: OpenSeaAsset): AssetLiveData {
    const lastSalePrice = getBigPrice(openSeaAsset.last_sale?.total_price);
    return new AssetLiveData({
      tokenId: openSeaAsset.token_id,
      collectionAddress: openSeaAsset.asset_contract?.address,
      onSale: openSeaAsset.listing_date !== null,
      lastSalePrice,
      lastSalePriceUSD:
        lastSalePrice *
        getPrice(openSeaAsset.last_sale?.payment_token?.usd_price),
      lastSaleDate: openSeaAsset.last_sale?.event_timestamp,
    });
  }
}

export const openSeaMapper = new OpenSeaMapper();
