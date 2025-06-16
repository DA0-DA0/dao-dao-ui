import * as _505 from "../tariff/genesis";
import * as _506 from "../tariff/params";
import * as _507 from "../tariff/query";
import * as _844 from "../tariff/query.rpc.Query";
import * as _889 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._505,
    ..._506,
    ..._507,
    ..._844
  };
  export const ClientFactory = {
    ..._889
  };
}