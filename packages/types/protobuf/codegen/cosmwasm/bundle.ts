import * as _90 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _91 from "./tokenfactory/v1beta1/genesis";
import * as _92 from "./tokenfactory/v1beta1/params";
import * as _93 from "./tokenfactory/v1beta1/query";
import * as _94 from "./tokenfactory/v1beta1/tx";
import * as _95 from "./wasm/v1/authz";
import * as _96 from "./wasm/v1/genesis";
import * as _97 from "./wasm/v1/ibc";
import * as _98 from "./wasm/v1/proposal";
import * as _99 from "./wasm/v1/query";
import * as _100 from "./wasm/v1/tx";
import * as _101 from "./wasm/v1/types";
import * as _379 from "./tokenfactory/v1beta1/tx.amino";
import * as _380 from "./wasm/v1/tx.amino";
import * as _381 from "./tokenfactory/v1beta1/tx.registry";
import * as _382 from "./wasm/v1/tx.registry";
import * as _383 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _384 from "./wasm/v1/query.rpc.Query";
import * as _385 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _386 from "./wasm/v1/tx.rpc.msg";
import * as _545 from "./rpc.query";
import * as _546 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._379,
      ..._381,
      ..._383,
      ..._385
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._380,
      ..._382,
      ..._384,
      ..._386
    };
  }
  export const ClientFactory = {
    ..._545,
    ..._546
  };
}