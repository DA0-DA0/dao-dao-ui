import * as _406 from "../tariff/genesis";
import * as _407 from "../tariff/params";
import * as _408 from "../tariff/query";
import * as _702 from "../tariff/query.rpc.Query";
import * as _743 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._406,
    ..._407,
    ..._408,
    ..._702
  };
  export const ClientFactory = {
    ..._743
  };
}