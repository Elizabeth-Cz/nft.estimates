import { OpenSeaPaymentToken } from "@APIs/OpenSea/OpenSea.paymentToken";
import { OpenSeaAsset } from "@APIs/OpenSea/OpenSea.asset";

export class OpenSeaEvent {
  id?: number;
  asset?: OpenSeaAsset;
  event_type?: string;
  event_timestamp?: string;
  total_price?: string;
  payment_token?: OpenSeaPaymentToken;
  quantity?: string;
  seller?: OpenSeaAccount;
  winner_account?: OpenSeaAccount;
}

interface OpenSeaAccount {
  user?: OpenSeaAccountUser;
  profile_img_url?: string;
  address?: string;
  config?: string;
}

interface OpenSeaAccountUser {
  username?: string;
}
