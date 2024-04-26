import * as _135 from "./feeshare/v1/feeshare";
import * as _136 from "./feeshare/v1/genesis";
import * as _137 from "./feeshare/v1/query";
import * as _138 from "./feeshare/v1/tx";
import * as _139 from "./mint/genesis";
import * as _140 from "./mint/mint";
import * as _141 from "./mint/query";
import * as _142 from "./mint/tx";
import * as _411 from "./feeshare/v1/tx.amino";
import * as _412 from "./mint/tx.amino";
import * as _413 from "./feeshare/v1/tx.registry";
import * as _414 from "./mint/tx.registry";
import * as _415 from "./feeshare/v1/query.rpc.Query";
import * as _416 from "./mint/query.rpc.Query";
import * as _417 from "./feeshare/v1/tx.rpc.msg";
import * as _418 from "./mint/tx.rpc.msg";
import * as _551 from "./rpc.query";
import * as _552 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._411,
      ..._413,
      ..._415,
      ..._417
    };
  }
  export const mint = {
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._412,
    ..._414,
    ..._416,
    ..._418
  };
  export const ClientFactory = {
    ..._551,
    ..._552
  };
}