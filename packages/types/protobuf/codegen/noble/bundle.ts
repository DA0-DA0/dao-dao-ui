import * as _352 from "../tariff/genesis";
import * as _353 from "../tariff/params";
import * as _354 from "../tariff/query";
import * as _615 from "../tariff/query.rpc.Query";
import * as _645 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._352,
    ..._353,
    ..._354,
    ..._615
  };
  export const ClientFactory = {
    ..._645
  };
}