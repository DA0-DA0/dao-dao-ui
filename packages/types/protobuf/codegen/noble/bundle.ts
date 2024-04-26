import * as _311 from "../tariff/genesis";
import * as _312 from "../tariff/params";
import * as _313 from "../tariff/query";
import * as _538 from "../tariff/query.rpc.Query";
import * as _563 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._311,
    ..._312,
    ..._313,
    ..._538
  };
  export const ClientFactory = {
    ..._563
  };
}