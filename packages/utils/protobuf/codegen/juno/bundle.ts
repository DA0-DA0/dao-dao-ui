import * as _101 from "./feeshare/v1/feeshare";
import * as _102 from "./feeshare/v1/genesis";
import * as _103 from "./feeshare/v1/query";
import * as _104 from "./feeshare/v1/tx";
import * as _105 from "./mint/genesis";
import * as _106 from "./mint/mint";
import * as _107 from "./mint/query";
import * as _108 from "./mint/tx";
import * as _345 from "./feeshare/v1/tx.amino";
import * as _346 from "./mint/tx.amino";
import * as _347 from "./feeshare/v1/tx.registry";
import * as _348 from "./mint/tx.registry";
import * as _349 from "./feeshare/v1/query.rpc.Query";
import * as _350 from "./mint/query.rpc.Query";
import * as _351 from "./feeshare/v1/tx.rpc.msg";
import * as _352 from "./mint/tx.rpc.msg";
import * as _469 from "./rpc.query";
import * as _470 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._345,
      ..._347,
      ..._349,
      ..._351
    };
  }
  export const mint = {
    ..._105,
    ..._106,
    ..._107,
    ..._108,
    ..._346,
    ..._348,
    ..._350,
    ..._352
  };
  export const ClientFactory = {
    ..._469,
    ..._470
  };
}