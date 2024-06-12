import * as _341 from "../tariff/genesis";
import * as _342 from "../tariff/params";
import * as _343 from "../tariff/query";
import * as _595 from "../tariff/query.rpc.Query";
import * as _623 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._341,
    ..._342,
    ..._343,
    ..._595
  };
  export const ClientFactory = {
    ..._623
  };
}