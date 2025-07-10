import * as _516 from "../tariff/genesis";
import * as _517 from "../tariff/params";
import * as _518 from "../tariff/query";
import * as _859 from "../tariff/query.rpc.Query";
import * as _904 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._516,
    ..._517,
    ..._518,
    ..._859
  };
  export const ClientFactory = {
    ..._904
  };
}