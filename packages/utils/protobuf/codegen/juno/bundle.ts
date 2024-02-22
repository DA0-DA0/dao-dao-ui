import * as _112 from "./feeshare/v1/feeshare";
import * as _113 from "./feeshare/v1/genesis";
import * as _114 from "./feeshare/v1/query";
import * as _115 from "./feeshare/v1/tx";
import * as _116 from "./mint/genesis";
import * as _117 from "./mint/mint";
import * as _118 from "./mint/query";
import * as _119 from "./mint/tx";
import * as _360 from "./feeshare/v1/tx.amino";
import * as _361 from "./mint/tx.amino";
import * as _362 from "./feeshare/v1/tx.registry";
import * as _363 from "./mint/tx.registry";
import * as _364 from "./feeshare/v1/query.rpc.Query";
import * as _365 from "./mint/query.rpc.Query";
import * as _366 from "./feeshare/v1/tx.rpc.msg";
import * as _367 from "./mint/tx.rpc.msg";
import * as _486 from "./rpc.query";
import * as _487 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._360,
      ..._362,
      ..._364,
      ..._366
    };
  }
  export const mint = {
    ..._116,
    ..._117,
    ..._118,
    ..._119,
    ..._361,
    ..._363,
    ..._365,
    ..._367
  };
  export const ClientFactory = {
    ..._486,
    ..._487
  };
}