/* tslint:disable */
import { Coin, Cw20Coin } from "./shared-types";

export interface DetailsResponse {
  /**
   * arbiter can decide to approve or refund the escrow
   */
  arbiter: string;
  /**
   * Balance in cw20 tokens
   */
  cw20_balance: Cw20Coin[];
  /**
   * Whitelisted cw20 tokens
   */
  cw20_whitelist: string[];
  /**
   * When end height set and block height exceeds this value, the escrow is expired. Once an escrow is expired, it can be returned to the original funder (via "refund").
   */
  end_height?: number | null;
  /**
   * When end time (in seconds since epoch 00:00:00 UTC on 1 January 1970) is set and block time exceeds this value, the escrow is expired. Once an escrow is expired, it can be returned to the original funder (via "refund").
   */
  end_time?: number | null;
  /**
   * id of this escrow
   */
  id: string;
  /**
   * Balance in native tokens
   */
  native_balance: Coin[];
  /**
   * if approved, funds go to the recipient
   */
  recipient: string;
  /**
   * if refunded, funds go to the source
   */
  source: string;
  [k: string]: unknown;
}
