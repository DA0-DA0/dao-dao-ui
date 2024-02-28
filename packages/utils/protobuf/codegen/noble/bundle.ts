import * as _288 from "../tariff/genesis";
import * as _289 from "../tariff/params";
import * as _290 from "../tariff/query";
import * as _495 from "../tariff/query.rpc.Query";
import * as _518 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._288,
    ..._289,
    ..._290,
    ..._495
  };
  export const ClientFactory = {
    ..._518
  };
}