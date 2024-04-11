import * as _136 from "./feeshare/v1/feeshare";
import * as _137 from "./feeshare/v1/genesis";
import * as _138 from "./feeshare/v1/query";
import * as _139 from "./feeshare/v1/tx";
import * as _140 from "./mint/genesis";
import * as _141 from "./mint/mint";
import * as _142 from "./mint/query";
import * as _143 from "./mint/tx";
import * as _455 from "./feeshare/v1/tx.amino";
import * as _456 from "./mint/tx.amino";
import * as _457 from "./feeshare/v1/tx.registry";
import * as _458 from "./mint/tx.registry";
import * as _459 from "./feeshare/v1/query.rpc.Query";
import * as _460 from "./mint/query.rpc.Query";
import * as _461 from "./feeshare/v1/tx.rpc.msg";
import * as _462 from "./mint/tx.rpc.msg";
import * as _629 from "./rpc.query";
import * as _630 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._455,
      ..._457,
      ..._459,
      ..._461
    };
  }
  export const mint = {
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._456,
    ..._458,
    ..._460,
    ..._462
  };
  export const ClientFactory = {
    ..._629,
    ..._630
  };
}