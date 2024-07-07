import * as _356 from "../tariff/genesis";
import * as _357 from "../tariff/params";
import * as _358 from "../tariff/query";
import * as _624 from "../tariff/query.rpc.Query";
import * as _657 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._356,
    ..._357,
    ..._358,
    ..._624
  };
  export const ClientFactory = {
    ..._657
  };
}