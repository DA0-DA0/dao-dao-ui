import * as _140 from "./feeshare/v1/feeshare";
import * as _141 from "./feeshare/v1/genesis";
import * as _142 from "./feeshare/v1/query";
import * as _143 from "./feeshare/v1/tx";
import * as _144 from "./mint/genesis";
import * as _145 from "./mint/mint";
import * as _146 from "./mint/query";
import * as _147 from "./mint/tx";
import * as _464 from "./feeshare/v1/tx.amino";
import * as _465 from "./mint/tx.amino";
import * as _466 from "./feeshare/v1/tx.registry";
import * as _467 from "./mint/tx.registry";
import * as _468 from "./feeshare/v1/query.rpc.Query";
import * as _469 from "./mint/query.rpc.Query";
import * as _470 from "./feeshare/v1/tx.rpc.msg";
import * as _471 from "./mint/tx.rpc.msg";
import * as _641 from "./rpc.query";
import * as _642 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._464,
      ..._466,
      ..._468,
      ..._470
    };
  }
  export const mint = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._465,
    ..._467,
    ..._469,
    ..._471
  };
  export const ClientFactory = {
    ..._641,
    ..._642
  };
}