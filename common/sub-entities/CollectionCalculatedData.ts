import { prop } from "@typegoose/typegoose";
import { ChangingNumber } from "./ChangingNumber";
import { Asset } from "../entities/Asset";
import moment from "moment";
import _ from "lodash";

export class CollectionCalculatedData {
  constructor(initializer?: Partial<CollectionCalculatedData>) {
    this.onSaleAmount = new ChangingNumber({ value: 0 });
    Object.assign(this, initializer);
  }
  @prop({ type: () => ChangingNumber })
  totalValue?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  totalEstimatedValue?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  salesSum24h?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  salesSum7d?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  salesAmount24h?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  salesAmount7d?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  onSaleAmount?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  floorPrice?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  ceilPrice?: ChangingNumber;
  @prop({ type: () => ChangingNumber })
  bidVolume24h?: ChangingNumber;
  @prop()
  snapshotTime?: number;

  public accumulateDataFromAsset = (asset: Asset) => {
    const { lastSalePrice, allSalePrices, last7dSales, last24hSales } =
      this.crunchData(asset);
    this.processTotalValue(lastSalePrice);
    this.processSalesSum24h(_.sumBy(last24hSales, (sale) => sale.price || 0));
    this.processSalesSum7d(_.sumBy(last7dSales, (sale) => sale.price || 0));
    this.processSalesAmount24h(_.size(last24hSales));
    this.processSalesAmount7d(_.size(last7dSales));
    asset.liveData?.onSale && this.processOnSaleAmount(1);
    this.processFloor(Math.min(...allSalePrices));
    this.processCeil(Math.max(...allSalePrices));
  };

  private crunchData(asset: Asset) {
    const sevenDaysAgo = +moment().subtract(7, "days");
    const oneDayAgo = +moment().subtract(1, "days");
    const lastSalePrice = asset.liveData?.lastSalePrice;
    const allSales = asset.events?.sales?.history || [];
    const allSalePrices = allSales.map((sale) => sale.price || 0);
    const last7dSales = allSales.filter(
      (sale) => sale.eventTime && sale.eventTime > sevenDaysAgo
    );
    const last24hSales = last7dSales.filter(
      (sale) => sale.eventTime && sale.eventTime > oneDayAgo
    );
    return {
      lastSalePrice,
      allSalePrices,
      last7dSales,
      last24hSales,
    };
  }

  private processTotalValue(value: number = 0) {
    if (!this.totalValue) {
      this.totalValue = new ChangingNumber({ value });
    } else {
      this.totalValue.value += value;
    }
  }

  private processSalesSum24h(value: number = 0) {
    if (!this.salesSum24h) {
      this.salesSum24h = new ChangingNumber({ value });
    } else {
      this.salesSum24h.value += value;
    }
  }

  private processSalesSum7d(value: number = 0) {
    if (!this.salesSum7d) {
      this.salesSum7d = new ChangingNumber({ value });
    } else {
      this.salesSum7d.value += value;
    }
  }

  private processSalesAmount24h(value: number = 0) {
    if (!this.salesAmount24h) {
      this.salesAmount24h = new ChangingNumber({ value });
    } else {
      this.salesAmount24h.value += value;
    }
  }

  private processSalesAmount7d(value: number = 0) {
    if (!this.salesAmount7d) {
      this.salesAmount7d = new ChangingNumber({ value });
    } else {
      this.salesAmount7d.value += value;
    }
  }

  private processOnSaleAmount(value: number = 0) {
    if (!this.onSaleAmount) {
      this.onSaleAmount = new ChangingNumber({ value });
    } else {
      this.onSaleAmount.value += value;
    }
  }

  private processFloor(value: number = Infinity) {
    if (!this.floorPrice) {
      this.floorPrice = new ChangingNumber({ value });
    } else {
      this.floorPrice.value = Math.min(this.floorPrice.value, value);
    }
  }

  private processCeil(value: number = -Infinity) {
    if (!this.ceilPrice) {
      this.ceilPrice = new ChangingNumber({ value });
    } else {
      this.ceilPrice.value = Math.max(this.ceilPrice.value, value);
    }
  }
}
/*
  Collection value - Sum of Last Sale Price for all NFTs in collection.
  Est. Collection Value - Sum of Estimated value for all NFTs in collection.
  Collection Volume (24H) - Sum of sale prices in past 24H for all NFTs in collection.
  Collection Volume (7D) - Sum of sale prices in past 7D for all NFTs in collection.
  NFTs sold (24H) - Amount of NFTs sold from that collection in past 24h
  NFTs sold (7D) - Amount of NFTs sold from that collection in past 24h
  On sale - Amount of NFTs from collection currently for sale
  Floor Price - Collection floor price
  Bid Volume - Sum of bids placed on NFTs from collection in past 24H
  Collection supply - Collection supply :)  (Number of NFTs in collection)
  */
