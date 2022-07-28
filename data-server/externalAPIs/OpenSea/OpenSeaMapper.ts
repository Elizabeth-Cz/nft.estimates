import _ from "lodash";
import { OpenSeaAsset } from "./OpenSea.asset";
import mongoose from "mongoose";
import { OpenSeaCollection } from "@APIs/OpenSea/OpenSea.collection";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { AssetLiveData } from "@skeksify/nfte-common/dist/entities/AssetLiveData";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { OpenSeaEvent } from "@APIs/OpenSea/OpenSea.event";
import {
  AssetEvent,
  OpenSeaUserAccount,
} from "@skeksify/nfte-common/dist/sub-entities/AssetEvent";
import {
  OpenSeaAssetEventTypes,
  openSeaEventTypeToEventType,
} from "@APIs/OpenSea/OpenSeaFetcher";
import moment from "moment";

const quintillion = Math.pow(10, 18);
const getPrice = (price?: number | string) => (price ? +price : 0);
const getBigPrice = (price?: number | string) => getPrice(price) / quintillion;

class OpenSeaMapper {
  constructor() {}

  public toAsset = (openSeaAsset: OpenSeaAsset): Asset => {
    return new Asset({
      id: new mongoose.mongo.ObjectId().toString(),
      ..._.pick(openSeaAsset, ["name", "description", "permalink"]),
      collectionAddress: openSeaAsset.asset_contract?.address,
      collectionName: openSeaAsset.collection?.name,
      tokenId: openSeaAsset.token_id,
      mintingDate: openSeaAsset.asset_contract?.created_date,
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
      supply: openSeaCollection.stats?.total_supply,
    });
  };

  public toEvent = (openSeaEvent: OpenSeaEvent): AssetEvent => {
    const eventType = openSeaEvent.event_type as OpenSeaAssetEventTypes;
    const eventTime = +moment.utc(openSeaEvent.event_timestamp);
    return new AssetEvent({
      eventId: openSeaEvent.id,
      contractAddress: openSeaEvent.asset?.asset_contract?.address,
      tokenId: openSeaEvent.asset?.token_id,
      eventType: openSeaEventTypeToEventType[eventType],
      eventTime: eventTime,
      price: getBigPrice(openSeaEvent.total_price),
      quantity: openSeaEvent.quantity,
      usdPrice: openSeaEvent.payment_token?.usd_price,
      seller: new OpenSeaUserAccount({
        username: openSeaEvent.seller?.user?.username,
        address: openSeaEvent.seller?.address,
        profileImageUrl: openSeaEvent.seller?.profile_img_url,
      }),
      buyer: new OpenSeaUserAccount({
        username: openSeaEvent.winner_account?.user?.username,
        address: openSeaEvent.winner_account?.address,
        profileImageUrl: openSeaEvent.winner_account?.profile_img_url,
      }),
    });
  };
}

export const openSeaMapper = new OpenSeaMapper();
