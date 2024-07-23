import * as _153 from "./feeshare/v1/feeshare";
import * as _154 from "./feeshare/v1/genesis";
import * as _155 from "./feeshare/v1/query";
import * as _156 from "./feeshare/v1/tx";
import * as _157 from "./mint/genesis";
import * as _158 from "./mint/mint";
import * as _159 from "./mint/query";
import * as _160 from "./mint/tx";
import * as _489 from "./feeshare/v1/tx.amino";
import * as _490 from "./mint/tx.amino";
import * as _491 from "./feeshare/v1/tx.registry";
import * as _492 from "./mint/tx.registry";
import * as _493 from "./feeshare/v1/query.rpc.Query";
import * as _494 from "./mint/query.rpc.Query";
import * as _495 from "./feeshare/v1/tx.rpc.msg";
import * as _496 from "./mint/tx.rpc.msg";
import * as _671 from "./rpc.query";
import * as _672 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._489,
      ..._491,
      ..._493,
      ..._495
    };
  }
  export const mint = {
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._490,
    ..._492,
    ..._494,
    ..._496
  };
  export const ClientFactory = {
    ..._671,
    ..._672
  };
}