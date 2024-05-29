import * as _336 from "../tariff/genesis";
import * as _337 from "../tariff/params";
import * as _338 from "../tariff/query";
import * as _586 from "../tariff/query.rpc.Query";
import * as _614 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._336,
    ..._337,
    ..._338,
    ..._586
  };
  export const ClientFactory = {
    ..._614
  };
}