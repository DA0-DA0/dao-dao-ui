import * as _95 from "./feeshare/v1/feeshare";
import * as _96 from "./feeshare/v1/genesis";
import * as _97 from "./feeshare/v1/query";
import * as _98 from "./feeshare/v1/tx";
import * as _99 from "./mint/genesis";
import * as _100 from "./mint/mint";
import * as _101 from "./mint/query";
import * as _102 from "./mint/tx";
import * as _265 from "./feeshare/v1/tx.amino";
import * as _266 from "./mint/tx.amino";
import * as _267 from "./feeshare/v1/tx.registry";
import * as _268 from "./mint/tx.registry";
import * as _269 from "./feeshare/v1/query.rpc.Query";
import * as _270 from "./mint/query.rpc.Query";
import * as _271 from "./feeshare/v1/tx.rpc.msg";
import * as _272 from "./mint/tx.rpc.msg";
import * as _342 from "./rpc.query";
import * as _343 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._265,
      ..._267,
      ..._269,
      ..._271
    };
  }
  export const mint = {
    ..._99,
    ..._100,
    ..._101,
    ..._102,
    ..._266,
    ..._268,
    ..._270,
    ..._272
  };
  export const ClientFactory = {
    ..._342,
    ..._343
  };
}