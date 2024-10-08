import * as _378 from "../tariff/genesis";
import * as _379 from "../tariff/params";
import * as _380 from "../tariff/query";
import * as _658 from "../tariff/query.rpc.Query";
import * as _695 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._378,
    ..._379,
    ..._380,
    ..._658
  };
  export const ClientFactory = {
    ..._695
  };
}