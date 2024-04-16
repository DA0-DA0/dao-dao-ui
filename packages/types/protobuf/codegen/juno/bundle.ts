import * as _131 from "./feeshare/v1/feeshare";
import * as _132 from "./feeshare/v1/genesis";
import * as _133 from "./feeshare/v1/query";
import * as _134 from "./feeshare/v1/tx";
import * as _135 from "./mint/genesis";
import * as _136 from "./mint/mint";
import * as _137 from "./mint/query";
import * as _138 from "./mint/tx";
import * as _403 from "./feeshare/v1/tx.amino";
import * as _404 from "./mint/tx.amino";
import * as _405 from "./feeshare/v1/tx.registry";
import * as _406 from "./mint/tx.registry";
import * as _407 from "./feeshare/v1/query.rpc.Query";
import * as _408 from "./mint/query.rpc.Query";
import * as _409 from "./feeshare/v1/tx.rpc.msg";
import * as _410 from "./mint/tx.rpc.msg";
import * as _543 from "./rpc.query";
import * as _544 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._403,
      ..._405,
      ..._407,
      ..._409
    };
  }
  export const mint = {
    ..._135,
    ..._136,
    ..._137,
    ..._138,
    ..._404,
    ..._406,
    ..._408,
    ..._410
  };
  export const ClientFactory = {
    ..._543,
    ..._544
  };
}