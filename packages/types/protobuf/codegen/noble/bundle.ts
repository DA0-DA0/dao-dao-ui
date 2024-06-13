import * as _338 from "../tariff/genesis";
import * as _339 from "../tariff/params";
import * as _340 from "../tariff/query";
import * as _588 from "../tariff/query.rpc.Query";
import * as _616 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._338,
    ..._339,
    ..._340,
    ..._588
  };
  export const ClientFactory = {
    ..._616
  };
}