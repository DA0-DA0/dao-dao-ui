import * as _291 from "../tariff/genesis";
import * as _292 from "../tariff/params";
import * as _293 from "../tariff/query";
import * as _502 from "../tariff/query.rpc.Query";
import * as _525 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._291,
    ..._292,
    ..._293,
    ..._502
  };
  export const ClientFactory = {
    ..._525
  };
}