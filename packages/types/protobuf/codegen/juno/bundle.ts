import * as _140 from "./feeshare/v1/feeshare";
import * as _141 from "./feeshare/v1/genesis";
import * as _142 from "./feeshare/v1/query";
import * as _143 from "./feeshare/v1/tx";
import * as _144 from "./mint/genesis";
import * as _145 from "./mint/mint";
import * as _146 from "./mint/query";
import * as _147 from "./mint/tx";
import * as _468 from "./feeshare/v1/tx.amino";
import * as _469 from "./mint/tx.amino";
import * as _470 from "./feeshare/v1/tx.registry";
import * as _471 from "./mint/tx.registry";
import * as _472 from "./feeshare/v1/query.rpc.Query";
import * as _473 from "./mint/query.rpc.Query";
import * as _474 from "./feeshare/v1/tx.rpc.msg";
import * as _475 from "./mint/tx.rpc.msg";
import * as _648 from "./rpc.query";
import * as _649 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._468,
      ..._470,
      ..._472,
      ..._474
    };
  }
  export const mint = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._469,
    ..._471,
    ..._473,
    ..._475
  };
  export const ClientFactory = {
    ..._648,
    ..._649
  };
}