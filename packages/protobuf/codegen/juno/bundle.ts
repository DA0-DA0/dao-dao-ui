import * as _83 from "./feeshare/v1/feeshare";
import * as _84 from "./feeshare/v1/genesis";
import * as _85 from "./feeshare/v1/query";
import * as _86 from "./feeshare/v1/tx";
import * as _87 from "./mint/genesis";
import * as _88 from "./mint/mint";
import * as _89 from "./mint/query";
import * as _90 from "./mint/tx";
import * as _241 from "./feeshare/v1/tx.amino";
import * as _242 from "./mint/tx.amino";
import * as _243 from "./feeshare/v1/tx.registry";
import * as _244 from "./mint/tx.registry";
import * as _245 from "./feeshare/v1/query.rpc.Query";
import * as _246 from "./mint/query.rpc.Query";
import * as _247 from "./feeshare/v1/tx.rpc.msg";
import * as _248 from "./mint/tx.rpc.msg";
import * as _316 from "./rpc.query";
import * as _317 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._86,
      ..._241,
      ..._243,
      ..._245,
      ..._247
    };
  }
  export const mint = {
    ..._87,
    ..._88,
    ..._89,
    ..._90,
    ..._242,
    ..._244,
    ..._246,
    ..._248
  };
  export const ClientFactory = {
    ..._316,
    ..._317
  };
}