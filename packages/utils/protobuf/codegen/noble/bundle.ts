import * as _200 from "../tariff/genesis";
import * as _201 from "../tariff/params";
import * as _202 from "../tariff/query";
import * as _361 from "../tariff/query.rpc.Query";
import * as _378 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._200,
    ..._201,
    ..._202,
    ..._361
  };
  export const ClientFactory = {
    ..._378
  };
}