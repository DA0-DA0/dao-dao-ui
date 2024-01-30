import * as _233 from "../tariff/genesis";
import * as _234 from "../tariff/params";
import * as _235 from "../tariff/query";
import * as _410 from "../tariff/query.rpc.Query";
import * as _427 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._233,
    ..._234,
    ..._235,
    ..._410
  };
  export const ClientFactory = {
    ..._427
  };
}