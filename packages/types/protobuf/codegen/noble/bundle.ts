import * as _332 from "../tariff/genesis";
import * as _333 from "../tariff/params";
import * as _334 from "../tariff/query";
import * as _575 from "../tariff/query.rpc.Query";
import * as _602 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._332,
    ..._333,
    ..._334,
    ..._575
  };
  export const ClientFactory = {
    ..._602
  };
}