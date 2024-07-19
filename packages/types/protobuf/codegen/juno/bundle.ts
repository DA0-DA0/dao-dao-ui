import * as _146 from "./feeshare/v1/feeshare";
import * as _147 from "./feeshare/v1/genesis";
import * as _148 from "./feeshare/v1/query";
import * as _149 from "./feeshare/v1/tx";
import * as _150 from "./mint/genesis";
import * as _151 from "./mint/mint";
import * as _152 from "./mint/query";
import * as _153 from "./mint/tx";
import * as _478 from "./feeshare/v1/tx.amino";
import * as _479 from "./mint/tx.amino";
import * as _480 from "./feeshare/v1/tx.registry";
import * as _481 from "./mint/tx.registry";
import * as _482 from "./feeshare/v1/query.rpc.Query";
import * as _483 from "./mint/query.rpc.Query";
import * as _484 from "./feeshare/v1/tx.rpc.msg";
import * as _485 from "./mint/tx.rpc.msg";
import * as _658 from "./rpc.query";
import * as _659 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._146,
      ..._147,
      ..._148,
      ..._149,
      ..._478,
      ..._480,
      ..._482,
      ..._484
    };
  }
  export const mint = {
    ..._150,
    ..._151,
    ..._152,
    ..._153,
    ..._479,
    ..._481,
    ..._483,
    ..._485
  };
  export const ClientFactory = {
    ..._658,
    ..._659
  };
}