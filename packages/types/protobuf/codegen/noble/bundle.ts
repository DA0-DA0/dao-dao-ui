import * as _307 from "../tariff/genesis";
import * as _308 from "../tariff/params";
import * as _309 from "../tariff/query";
import * as _530 from "../tariff/query.rpc.Query";
import * as _555 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._307,
    ..._308,
    ..._309,
    ..._530
  };
  export const ClientFactory = {
    ..._555
  };
}