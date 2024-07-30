import * as _153 from "./feeshare/v1/feeshare";
import * as _154 from "./feeshare/v1/genesis";
import * as _155 from "./feeshare/v1/query";
import * as _156 from "./feeshare/v1/tx";
import * as _157 from "./mint/genesis";
import * as _158 from "./mint/mint";
import * as _159 from "./mint/query";
import * as _160 from "./mint/tx";
import * as _490 from "./feeshare/v1/tx.amino";
import * as _491 from "./mint/tx.amino";
import * as _492 from "./feeshare/v1/tx.registry";
import * as _493 from "./mint/tx.registry";
import * as _494 from "./feeshare/v1/query.rpc.Query";
import * as _495 from "./mint/query.rpc.Query";
import * as _496 from "./feeshare/v1/tx.rpc.msg";
import * as _497 from "./mint/tx.rpc.msg";
import * as _673 from "./rpc.query";
import * as _674 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._490,
      ..._492,
      ..._494,
      ..._496
    };
  }
  export const mint = {
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._491,
    ..._493,
    ..._495,
    ..._497
  };
  export const ClientFactory = {
    ..._673,
    ..._674
  };
}