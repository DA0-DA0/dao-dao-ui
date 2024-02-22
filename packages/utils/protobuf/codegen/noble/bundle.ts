import * as _272 from "../tariff/genesis";
import * as _273 from "../tariff/params";
import * as _274 from "../tariff/query";
import * as _475 from "../tariff/query.rpc.Query";
import * as _496 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._272,
    ..._273,
    ..._274,
    ..._475
  };
  export const ClientFactory = {
    ..._496
  };
}