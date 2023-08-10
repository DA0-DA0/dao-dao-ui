import * as _79 from "./feeshare/v1/feeshare";
import * as _80 from "./feeshare/v1/genesis";
import * as _81 from "./feeshare/v1/query";
import * as _82 from "./feeshare/v1/tx";
import * as _83 from "./mint/genesis";
import * as _84 from "./mint/mint";
import * as _85 from "./mint/query";
import * as _86 from "./mint/tx";
import * as _214 from "./feeshare/v1/tx.amino";
import * as _215 from "./mint/tx.amino";
import * as _216 from "./feeshare/v1/tx.registry";
import * as _217 from "./mint/tx.registry";
import * as _218 from "./feeshare/v1/query.rpc.Query";
import * as _219 from "./mint/query.rpc.Query";
import * as _220 from "./feeshare/v1/tx.rpc.msg";
import * as _221 from "./mint/tx.rpc.msg";
import * as _276 from "./rpc.query";
import * as _277 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._79,
      ..._80,
      ..._81,
      ..._82,
      ..._214,
      ..._216,
      ..._218,
      ..._220
    };
  }
  export const mint = {
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._215,
    ..._217,
    ..._219,
    ..._221
  };
  export const ClientFactory = {
    ..._276,
    ..._277
  };
}