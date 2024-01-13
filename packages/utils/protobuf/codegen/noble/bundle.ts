import * as _193 from "../tariff/genesis";
import * as _194 from "../tariff/params";
import * as _195 from "../tariff/query";
import * as _346 from "../tariff/query.rpc.Query";
import * as _361 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._193,
    ..._194,
    ..._195,
    ..._346
  };
  export const ClientFactory = {
    ..._361
  };
}