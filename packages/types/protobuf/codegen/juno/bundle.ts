import * as _131 from "./feeshare/v1/feeshare";
import * as _132 from "./feeshare/v1/genesis";
import * as _133 from "./feeshare/v1/query";
import * as _134 from "./feeshare/v1/tx";
import * as _135 from "./mint/genesis";
import * as _136 from "./mint/mint";
import * as _137 from "./mint/query";
import * as _138 from "./mint/tx";
import * as _387 from "./feeshare/v1/tx.amino";
import * as _388 from "./mint/tx.amino";
import * as _389 from "./feeshare/v1/tx.registry";
import * as _390 from "./mint/tx.registry";
import * as _391 from "./feeshare/v1/query.rpc.Query";
import * as _392 from "./mint/query.rpc.Query";
import * as _393 from "./feeshare/v1/tx.rpc.msg";
import * as _394 from "./mint/tx.rpc.msg";
import * as _515 from "./rpc.query";
import * as _516 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._387,
      ..._389,
      ..._391,
      ..._393
    };
  }
  export const mint = {
    ..._135,
    ..._136,
    ..._137,
    ..._138,
    ..._388,
    ..._390,
    ..._392,
    ..._394
  };
  export const ClientFactory = {
    ..._515,
    ..._516
  };
}