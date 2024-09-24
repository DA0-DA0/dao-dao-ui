import * as _377 from "../tariff/genesis";
import * as _378 from "../tariff/params";
import * as _379 from "../tariff/query";
import * as _657 from "../tariff/query.rpc.Query";
import * as _694 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._377,
    ..._378,
    ..._379,
    ..._657
  };
  export const ClientFactory = {
    ..._694
  };
}