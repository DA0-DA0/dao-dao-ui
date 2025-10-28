import * as _525 from "../tariff/genesis";
import * as _526 from "../tariff/params";
import * as _527 from "../tariff/query";
import * as _877 from "../tariff/query.rpc.Query";
import * as _926 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._525,
    ..._526,
    ..._527,
    ..._877
  };
  export const ClientFactory = {
    ..._926
  };
}