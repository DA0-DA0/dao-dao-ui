import * as _367 from "../tariff/genesis";
import * as _368 from "../tariff/params";
import * as _369 from "../tariff/query";
import * as _642 from "../tariff/query.rpc.Query";
import * as _676 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._367,
    ..._368,
    ..._369,
    ..._642
  };
  export const ClientFactory = {
    ..._676
  };
}