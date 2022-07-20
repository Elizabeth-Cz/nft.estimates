export class OpenSeaCollection {
  name?: string;
  slug?: string;
  description?: string;
  discord_url?: string;
  external_url?: string;
  banner_image_url?: string;
  telegram_url?: string;
  twitter_username?: string;
  instagram_username?: string;
  primary_asset_contracts?: PrimaryAssetContracts[];
  traits?: CollectionTraits;
  stats?: CollectionStats;
}

interface PrimaryAssetContracts {
  address?: string; // Contract Address
}

type CollectionTraits = Record<string, Record<string, number>>;

interface CollectionStats {
  one_day_volume?: number;
  one_day_change?: number;
  one_day_sales?: number;
  one_day_average_price?: number;
  seven_day_volume?: number;
  seven_day_change?: number;
  seven_day_sales?: number;
  seven_day_average_price?: number;
  thirty_day_volume?: number;
  thirty_day_change?: number;
  thirty_day_sales?: number;
  thirty_day_average_price?: number;
  total_volume?: number;
  total_sales?: number;
  total_supply?: number;
  count?: number;
  num_owners?: number;
  average_price?: number;
  num_reports?: number;
  market_cap?: number;
  floor_price?: number;
}
