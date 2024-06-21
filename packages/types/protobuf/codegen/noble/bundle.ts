import * as _342 from "../tariff/genesis";
import * as _343 from "../tariff/params";
import * as _344 from "../tariff/query";
import * as _596 from "../tariff/query.rpc.Query";
import * as _626 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._342,
    ..._343,
    ..._344,
    ..._596
  };
  export const ClientFactory = {
    ..._626
  };
}