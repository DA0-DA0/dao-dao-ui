import * as _374 from "../tariff/genesis";
import * as _375 from "../tariff/params";
import * as _376 from "../tariff/query";
import * as _653 from "../tariff/query.rpc.Query";
import * as _689 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._374,
    ..._375,
    ..._376,
    ..._653
  };
  export const ClientFactory = {
    ..._689
  };
}