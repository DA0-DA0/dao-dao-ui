import * as _100 from "./feeshare/v1/feeshare";
import * as _101 from "./feeshare/v1/genesis";
import * as _102 from "./feeshare/v1/query";
import * as _103 from "./feeshare/v1/tx";
import * as _104 from "./mint/genesis";
import * as _105 from "./mint/mint";
import * as _106 from "./mint/query";
import * as _107 from "./mint/tx";
import * as _284 from "./feeshare/v1/tx.amino";
import * as _285 from "./mint/tx.amino";
import * as _286 from "./feeshare/v1/tx.registry";
import * as _287 from "./mint/tx.registry";
import * as _288 from "./feeshare/v1/query.rpc.Query";
import * as _289 from "./mint/query.rpc.Query";
import * as _290 from "./feeshare/v1/tx.rpc.msg";
import * as _291 from "./mint/tx.rpc.msg";
import * as _370 from "./rpc.query";
import * as _371 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._284,
      ..._286,
      ..._288,
      ..._290
    };
  }
  export const mint = {
    ..._104,
    ..._105,
    ..._106,
    ..._107,
    ..._285,
    ..._287,
    ..._289,
    ..._291
  };
  export const ClientFactory = {
    ..._370,
    ..._371
  };
}