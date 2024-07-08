import * as _361 from "../tariff/genesis";
import * as _362 from "../tariff/params";
import * as _363 from "../tariff/query";
import * as _632 from "../tariff/query.rpc.Query";
import * as _666 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._361,
    ..._362,
    ..._363,
    ..._632
  };
  export const ClientFactory = {
    ..._666
  };
}