/* tslint:disable */
import { Decimal, Uint128 } from "./shared-types";

export interface CurveInfoResponse {
  reserve: Uint128;
  reserve_denom: string;
  spot_price: Decimal;
  supply: Uint128;
  [k: string]: unknown;
}
