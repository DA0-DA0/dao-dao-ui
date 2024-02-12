import * as _111 from "./feeshare/v1/feeshare";
import * as _112 from "./feeshare/v1/genesis";
import * as _113 from "./feeshare/v1/query";
import * as _114 from "./feeshare/v1/tx";
import * as _115 from "./mint/genesis";
import * as _116 from "./mint/mint";
import * as _117 from "./mint/query";
import * as _118 from "./mint/tx";
import * as _359 from "./feeshare/v1/tx.amino";
import * as _360 from "./mint/tx.amino";
import * as _361 from "./feeshare/v1/tx.registry";
import * as _362 from "./mint/tx.registry";
import * as _363 from "./feeshare/v1/query.rpc.Query";
import * as _364 from "./mint/query.rpc.Query";
import * as _365 from "./feeshare/v1/tx.rpc.msg";
import * as _366 from "./mint/tx.rpc.msg";
import * as _485 from "./rpc.query";
import * as _486 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._111,
      ..._112,
      ..._113,
      ..._114,
      ..._359,
      ..._361,
      ..._363,
      ..._365
    };
  }
  export const mint = {
    ..._115,
    ..._116,
    ..._117,
    ..._118,
    ..._360,
    ..._362,
    ..._364,
    ..._366
  };
  export const ClientFactory = {
    ..._485,
    ..._486
  };
}