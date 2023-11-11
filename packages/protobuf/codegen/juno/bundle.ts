import * as _86 from "./feeshare/v1/feeshare";
import * as _87 from "./feeshare/v1/genesis";
import * as _88 from "./feeshare/v1/query";
import * as _89 from "./feeshare/v1/tx";
import * as _90 from "./mint/genesis";
import * as _91 from "./mint/mint";
import * as _92 from "./mint/query";
import * as _93 from "./mint/tx";
import * as _248 from "./feeshare/v1/tx.amino";
import * as _249 from "./mint/tx.amino";
import * as _250 from "./feeshare/v1/tx.registry";
import * as _251 from "./mint/tx.registry";
import * as _252 from "./feeshare/v1/query.rpc.Query";
import * as _253 from "./mint/query.rpc.Query";
import * as _254 from "./feeshare/v1/tx.rpc.msg";
import * as _255 from "./mint/tx.rpc.msg";
import * as _325 from "./rpc.query";
import * as _326 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._248,
      ..._250,
      ..._252,
      ..._254
    };
  }
  export const mint = {
    ..._90,
    ..._91,
    ..._92,
    ..._93,
    ..._249,
    ..._251,
    ..._253,
    ..._255
  };
  export const ClientFactory = {
    ..._325,
    ..._326
  };
}