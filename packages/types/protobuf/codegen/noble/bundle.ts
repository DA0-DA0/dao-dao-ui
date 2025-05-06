import * as _410 from "../tariff/genesis";
import * as _411 from "../tariff/params";
import * as _412 from "../tariff/query";
import * as _706 from "../tariff/query.rpc.Query";
import * as _747 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._410,
    ..._411,
    ..._412,
    ..._706
  };
  export const ClientFactory = {
    ..._747
  };
}