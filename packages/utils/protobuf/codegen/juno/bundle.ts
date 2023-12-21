import * as _100 from "./feeshare/v1/feeshare";
import * as _101 from "./feeshare/v1/genesis";
import * as _102 from "./feeshare/v1/query";
import * as _103 from "./feeshare/v1/tx";
import * as _104 from "./mint/genesis";
import * as _105 from "./mint/mint";
import * as _106 from "./mint/query";
import * as _107 from "./mint/tx";
import * as _277 from "./feeshare/v1/tx.amino";
import * as _278 from "./mint/tx.amino";
import * as _279 from "./feeshare/v1/tx.registry";
import * as _280 from "./mint/tx.registry";
import * as _281 from "./feeshare/v1/query.rpc.Query";
import * as _282 from "./mint/query.rpc.Query";
import * as _283 from "./feeshare/v1/tx.rpc.msg";
import * as _284 from "./mint/tx.rpc.msg";
import * as _355 from "./rpc.query";
import * as _356 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._277,
      ..._279,
      ..._281,
      ..._283
    };
  }
  export const mint = {
    ..._104,
    ..._105,
    ..._106,
    ..._107,
    ..._278,
    ..._280,
    ..._282,
    ..._284
  };
  export const ClientFactory = {
    ..._355,
    ..._356
  };
}