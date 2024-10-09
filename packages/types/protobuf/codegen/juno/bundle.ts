import * as _154 from "./feeshare/v1/feeshare";
import * as _155 from "./feeshare/v1/genesis";
import * as _156 from "./feeshare/v1/query";
import * as _157 from "./feeshare/v1/tx";
import * as _158 from "./mint/genesis";
import * as _159 from "./mint/mint";
import * as _160 from "./mint/query";
import * as _161 from "./mint/tx";
import * as _494 from "./feeshare/v1/tx.amino";
import * as _495 from "./mint/tx.amino";
import * as _496 from "./feeshare/v1/tx.registry";
import * as _497 from "./mint/tx.registry";
import * as _498 from "./feeshare/v1/query.rpc.Query";
import * as _499 from "./mint/query.rpc.Query";
import * as _500 from "./feeshare/v1/tx.rpc.msg";
import * as _501 from "./mint/tx.rpc.msg";
import * as _677 from "./rpc.query";
import * as _678 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._494,
      ..._496,
      ..._498,
      ..._500
    };
  }
  export const mint = {
    ..._158,
    ..._159,
    ..._160,
    ..._161,
    ..._495,
    ..._497,
    ..._499,
    ..._501
  };
  export const ClientFactory = {
    ..._677,
    ..._678
  };
}