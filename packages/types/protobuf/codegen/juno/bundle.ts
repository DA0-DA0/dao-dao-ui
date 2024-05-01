import * as _135 from "./feeshare/v1/feeshare";
import * as _136 from "./feeshare/v1/genesis";
import * as _137 from "./feeshare/v1/query";
import * as _138 from "./feeshare/v1/tx";
import * as _139 from "./mint/genesis";
import * as _140 from "./mint/mint";
import * as _141 from "./mint/query";
import * as _142 from "./mint/tx";
import * as _432 from "./feeshare/v1/tx.amino";
import * as _433 from "./mint/tx.amino";
import * as _434 from "./feeshare/v1/tx.registry";
import * as _435 from "./mint/tx.registry";
import * as _436 from "./feeshare/v1/query.rpc.Query";
import * as _437 from "./mint/query.rpc.Query";
import * as _438 from "./feeshare/v1/tx.rpc.msg";
import * as _439 from "./mint/tx.rpc.msg";
import * as _588 from "./rpc.query";
import * as _589 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._432,
      ..._434,
      ..._436,
      ..._438
    };
  }
  export const mint = {
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._433,
    ..._435,
    ..._437,
    ..._439
  };
  export const ClientFactory = {
    ..._588,
    ..._589
  };
}