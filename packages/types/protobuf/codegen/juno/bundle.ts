import * as _140 from "./feeshare/v1/feeshare";
import * as _141 from "./feeshare/v1/genesis";
import * as _142 from "./feeshare/v1/query";
import * as _143 from "./feeshare/v1/tx";
import * as _144 from "./mint/genesis";
import * as _145 from "./mint/mint";
import * as _146 from "./mint/query";
import * as _147 from "./mint/tx";
import * as _463 from "./feeshare/v1/tx.amino";
import * as _464 from "./mint/tx.amino";
import * as _465 from "./feeshare/v1/tx.registry";
import * as _466 from "./mint/tx.registry";
import * as _467 from "./feeshare/v1/query.rpc.Query";
import * as _468 from "./mint/query.rpc.Query";
import * as _469 from "./feeshare/v1/tx.rpc.msg";
import * as _470 from "./mint/tx.rpc.msg";
import * as _639 from "./rpc.query";
import * as _640 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._463,
      ..._465,
      ..._467,
      ..._469
    };
  }
  export const mint = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._464,
    ..._466,
    ..._468,
    ..._470
  };
  export const ClientFactory = {
    ..._639,
    ..._640
  };
}