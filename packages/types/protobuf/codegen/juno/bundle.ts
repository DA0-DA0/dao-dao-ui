import * as _153 from "./feeshare/v1/feeshare";
import * as _154 from "./feeshare/v1/genesis";
import * as _155 from "./feeshare/v1/query";
import * as _156 from "./feeshare/v1/tx";
import * as _157 from "./mint/genesis";
import * as _158 from "./mint/mint";
import * as _159 from "./mint/query";
import * as _160 from "./mint/tx";
import * as _493 from "./feeshare/v1/tx.amino";
import * as _494 from "./mint/tx.amino";
import * as _495 from "./feeshare/v1/tx.registry";
import * as _496 from "./mint/tx.registry";
import * as _497 from "./feeshare/v1/query.rpc.Query";
import * as _498 from "./mint/query.rpc.Query";
import * as _499 from "./feeshare/v1/tx.rpc.msg";
import * as _500 from "./mint/tx.rpc.msg";
import * as _676 from "./rpc.query";
import * as _677 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._493,
      ..._495,
      ..._497,
      ..._499
    };
  }
  export const mint = {
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._494,
    ..._496,
    ..._498,
    ..._500
  };
  export const ClientFactory = {
    ..._676,
    ..._677
  };
}