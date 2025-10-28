import * as _539 from "../tariff/genesis";
import * as _540 from "../tariff/params";
import * as _541 from "../tariff/query";
import * as _895 from "../tariff/query.rpc.Query";
import * as _946 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._539,
    ..._540,
    ..._541,
    ..._895
  };
  export const ClientFactory = {
    ..._946
  };
}