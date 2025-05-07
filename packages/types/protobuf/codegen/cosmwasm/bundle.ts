import * as _93 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _94 from "./tokenfactory/v1beta1/genesis";
import * as _95 from "./tokenfactory/v1beta1/params";
import * as _96 from "./tokenfactory/v1beta1/query";
import * as _97 from "./tokenfactory/v1beta1/tx";
import * as _98 from "./wasm/v1/authz";
import * as _99 from "./wasm/v1/genesis";
import * as _100 from "./wasm/v1/ibc";
import * as _101 from "./wasm/v1/proposal";
import * as _102 from "./wasm/v1/query";
import * as _103 from "./wasm/v1/tx";
import * as _104 from "./wasm/v1/types";
import * as _489 from "./tokenfactory/v1beta1/tx.amino";
import * as _490 from "./wasm/v1/tx.amino";
import * as _491 from "./tokenfactory/v1beta1/tx.registry";
import * as _492 from "./wasm/v1/tx.registry";
import * as _493 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _494 from "./wasm/v1/query.rpc.Query";
import * as _495 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _496 from "./wasm/v1/tx.rpc.msg";
import * as _726 from "./rpc.query";
import * as _727 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._489,
      ..._491,
      ..._493,
      ..._495
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._490,
      ..._492,
      ..._494,
      ..._496
    };
  }
  export const ClientFactory = {
    ..._726,
    ..._727
  };
}