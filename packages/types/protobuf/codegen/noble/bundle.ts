import * as _356 from "../tariff/genesis";
import * as _357 from "../tariff/params";
import * as _358 from "../tariff/query";
import * as _623 from "../tariff/query.rpc.Query";
import * as _655 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._356,
    ..._357,
    ..._358,
    ..._623
  };
  export const ClientFactory = {
    ..._655
  };
}