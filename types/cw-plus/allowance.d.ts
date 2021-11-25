/* tslint:disable */
import { Coin, Expiration } from "./shared-types";

export type NativeBalance = Coin[];

export interface Allowance {
  balance: NativeBalance;
  expires: Expiration;
  [k: string]: unknown;
}
