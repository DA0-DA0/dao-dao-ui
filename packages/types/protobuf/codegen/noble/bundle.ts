import * as _335 from "../tariff/genesis";
import * as _336 from "../tariff/params";
import * as _337 from "../tariff/query";
import * as _582 from "../tariff/query.rpc.Query";
import * as _609 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._335,
    ..._336,
    ..._337,
    ..._582
  };
  export const ClientFactory = {
    ..._609
  };
}