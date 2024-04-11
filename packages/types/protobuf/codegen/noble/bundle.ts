import * as _293 from "../tariff/genesis";
import * as _294 from "../tariff/params";
import * as _295 from "../tariff/query";
import * as _507 from "../tariff/query.rpc.Query";
import * as _530 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._293,
    ..._294,
    ..._295,
    ..._507
  };
  export const ClientFactory = {
    ..._530
  };
}