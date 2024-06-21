import * as _140 from "./feeshare/v1/feeshare";
import * as _141 from "./feeshare/v1/genesis";
import * as _142 from "./feeshare/v1/query";
import * as _143 from "./feeshare/v1/tx";
import * as _144 from "./mint/genesis";
import * as _145 from "./mint/mint";
import * as _146 from "./mint/query";
import * as _147 from "./mint/tx";
import * as _449 from "./feeshare/v1/tx.amino";
import * as _450 from "./mint/tx.amino";
import * as _451 from "./feeshare/v1/tx.registry";
import * as _452 from "./mint/tx.registry";
import * as _453 from "./feeshare/v1/query.rpc.Query";
import * as _454 from "./mint/query.rpc.Query";
import * as _455 from "./feeshare/v1/tx.rpc.msg";
import * as _456 from "./mint/tx.rpc.msg";
import * as _612 from "./rpc.query";
import * as _613 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._449,
      ..._451,
      ..._453,
      ..._455
    };
  }
  export const mint = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._450,
    ..._452,
    ..._454,
    ..._456
  };
  export const ClientFactory = {
    ..._612,
    ..._613
  };
}