import * as _100 from "./feeshare/v1/feeshare";
import * as _101 from "./feeshare/v1/genesis";
import * as _102 from "./feeshare/v1/query";
import * as _103 from "./feeshare/v1/tx";
import * as _104 from "./mint/genesis";
import * as _105 from "./mint/mint";
import * as _106 from "./mint/query";
import * as _107 from "./mint/tx";
import * as _274 from "./feeshare/v1/tx.amino";
import * as _275 from "./mint/tx.amino";
import * as _276 from "./feeshare/v1/tx.registry";
import * as _277 from "./mint/tx.registry";
import * as _278 from "./feeshare/v1/query.rpc.Query";
import * as _279 from "./mint/query.rpc.Query";
import * as _280 from "./feeshare/v1/tx.rpc.msg";
import * as _281 from "./mint/tx.rpc.msg";
import * as _351 from "./rpc.query";
import * as _352 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._274,
      ..._276,
      ..._278,
      ..._280
    };
  }
  export const mint = {
    ..._104,
    ..._105,
    ..._106,
    ..._107,
    ..._275,
    ..._277,
    ..._279,
    ..._281
  };
  export const ClientFactory = {
    ..._351,
    ..._352
  };
}