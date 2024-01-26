import * as _231 from "../tariff/genesis";
import * as _232 from "../tariff/params";
import * as _233 from "../tariff/query";
import * as _408 from "../tariff/query.rpc.Query";
import * as _425 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._231,
    ..._232,
    ..._233,
    ..._408
  };
  export const ClientFactory = {
    ..._425
  };
}