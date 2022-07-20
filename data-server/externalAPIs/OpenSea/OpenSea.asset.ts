export class OpenSeaAsset {
  name?: string;
  image_url?: string;
  description?: string;
  num_sales?: number;
  permalink?: string;
  token_id?: string;
  top_bid?: string;
  traits: OpenSeaTrait[] = [];
  asset_contract?: OpenSeaAssetContract;
  listing_date?: string | null;
  last_sale?: OpenSeaAssetLastSale;
  collection?: OpenSeaAssetCollection;
}

interface OpenSeaTrait {
  display_type: "number" | null | any;
  max_value: any;
  order: null | any;
  trait_count: number;
  trait_type: string;
  value: string;
}

interface OpenSeaAssetContract {
  address: string;
}

interface OpenSeaAssetCollection {
  name: string;
}

interface OpenSeaAssetLastSale {
  total_price?: number;
  event_timestamp?: string;
  payment_token?: OpenSeaAssetLastSalePaymentToken;
}

interface OpenSeaAssetLastSalePaymentToken {
  usd_price: number;
}
