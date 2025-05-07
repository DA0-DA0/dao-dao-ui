import * as _417 from "../tariff/genesis";
import * as _418 from "../tariff/params";
import * as _419 from "../tariff/query";
import * as _717 from "../tariff/query.rpc.Query";
import * as _760 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._417,
    ..._418,
    ..._419,
    ..._717
  };
  export const ClientFactory = {
    ..._760
  };
}