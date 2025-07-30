import * as _516 from "../tariff/genesis";
import * as _517 from "../tariff/params";
import * as _518 from "../tariff/query";
import * as _864 from "../tariff/query.rpc.Query";
import * as _913 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._516,
    ..._517,
    ..._518,
    ..._864
  };
  export const ClientFactory = {
    ..._913
  };
}