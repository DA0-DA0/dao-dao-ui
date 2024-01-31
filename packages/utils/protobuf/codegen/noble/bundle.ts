import * as _261 from "../tariff/genesis";
import * as _262 from "../tariff/params";
import * as _263 from "../tariff/query";
import * as _460 from "../tariff/query.rpc.Query";
import * as _479 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._261,
    ..._262,
    ..._263,
    ..._460
  };
  export const ClientFactory = {
    ..._479
  };
}