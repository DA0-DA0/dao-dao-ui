import * as _374 from "../tariff/genesis";
import * as _375 from "../tariff/params";
import * as _376 from "../tariff/query";
import * as _654 from "../tariff/query.rpc.Query";
import * as _691 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._374,
    ..._375,
    ..._376,
    ..._654
  };
  export const ClientFactory = {
    ..._691
  };
}