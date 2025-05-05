import * as _406 from "../tariff/genesis";
import * as _407 from "../tariff/params";
import * as _408 from "../tariff/query";
import * as _698 from "../tariff/query.rpc.Query";
import * as _739 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._406,
    ..._407,
    ..._408,
    ..._698
  };
  export const ClientFactory = {
    ..._739
  };
}