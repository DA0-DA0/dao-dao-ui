import * as _139 from "./feeshare/v1/feeshare";
import * as _140 from "./feeshare/v1/genesis";
import * as _141 from "./feeshare/v1/query";
import * as _142 from "./feeshare/v1/tx";
import * as _143 from "./mint/genesis";
import * as _144 from "./mint/mint";
import * as _145 from "./mint/query";
import * as _146 from "./mint/tx";
import * as _448 from "./feeshare/v1/tx.amino";
import * as _449 from "./mint/tx.amino";
import * as _450 from "./feeshare/v1/tx.registry";
import * as _451 from "./mint/tx.registry";
import * as _452 from "./feeshare/v1/query.rpc.Query";
import * as _453 from "./mint/query.rpc.Query";
import * as _454 from "./feeshare/v1/tx.rpc.msg";
import * as _455 from "./mint/tx.rpc.msg";
import * as _609 from "./rpc.query";
import * as _610 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._448,
      ..._450,
      ..._452,
      ..._454
    };
  }
  export const mint = {
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._449,
    ..._451,
    ..._453,
    ..._455
  };
  export const ClientFactory = {
    ..._609,
    ..._610
  };
}