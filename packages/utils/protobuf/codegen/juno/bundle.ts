import * as _128 from "./feeshare/v1/feeshare";
import * as _129 from "./feeshare/v1/genesis";
import * as _130 from "./feeshare/v1/query";
import * as _131 from "./feeshare/v1/tx";
import * as _132 from "./mint/genesis";
import * as _133 from "./mint/mint";
import * as _134 from "./mint/query";
import * as _135 from "./mint/tx";
import * as _380 from "./feeshare/v1/tx.amino";
import * as _381 from "./mint/tx.amino";
import * as _382 from "./feeshare/v1/tx.registry";
import * as _383 from "./mint/tx.registry";
import * as _384 from "./feeshare/v1/query.rpc.Query";
import * as _385 from "./mint/query.rpc.Query";
import * as _386 from "./feeshare/v1/tx.rpc.msg";
import * as _387 from "./mint/tx.rpc.msg";
import * as _508 from "./rpc.query";
import * as _509 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._128,
      ..._129,
      ..._130,
      ..._131,
      ..._380,
      ..._382,
      ..._384,
      ..._386
    };
  }
  export const mint = {
    ..._132,
    ..._133,
    ..._134,
    ..._135,
    ..._381,
    ..._383,
    ..._385,
    ..._387
  };
  export const ClientFactory = {
    ..._508,
    ..._509
  };
}