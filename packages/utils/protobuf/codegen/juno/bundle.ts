import * as _100 from "./feeshare/v1/feeshare";
import * as _101 from "./feeshare/v1/genesis";
import * as _102 from "./feeshare/v1/query";
import * as _103 from "./feeshare/v1/tx";
import * as _104 from "./mint/genesis";
import * as _105 from "./mint/mint";
import * as _106 from "./mint/query";
import * as _107 from "./mint/tx";
import * as _315 from "./feeshare/v1/tx.amino";
import * as _316 from "./mint/tx.amino";
import * as _317 from "./feeshare/v1/tx.registry";
import * as _318 from "./mint/tx.registry";
import * as _319 from "./feeshare/v1/query.rpc.Query";
import * as _320 from "./mint/query.rpc.Query";
import * as _321 from "./feeshare/v1/tx.rpc.msg";
import * as _322 from "./mint/tx.rpc.msg";
import * as _417 from "./rpc.query";
import * as _418 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._315,
      ..._317,
      ..._319,
      ..._321
    };
  }
  export const mint = {
    ..._104,
    ..._105,
    ..._106,
    ..._107,
    ..._316,
    ..._318,
    ..._320,
    ..._322
  };
  export const ClientFactory = {
    ..._417,
    ..._418
  };
}