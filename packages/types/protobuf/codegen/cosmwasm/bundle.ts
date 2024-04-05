import * as _86 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _87 from "./tokenfactory/v1beta1/genesis";
import * as _88 from "./tokenfactory/v1beta1/params";
import * as _89 from "./tokenfactory/v1beta1/query";
import * as _90 from "./tokenfactory/v1beta1/tx";
import * as _91 from "./wasm/v1/authz";
import * as _92 from "./wasm/v1/genesis";
import * as _93 from "./wasm/v1/ibc";
import * as _94 from "./wasm/v1/proposal";
import * as _95 from "./wasm/v1/query";
import * as _96 from "./wasm/v1/tx";
import * as _97 from "./wasm/v1/types";
import * as _355 from "./tokenfactory/v1beta1/tx.amino";
import * as _356 from "./wasm/v1/tx.amino";
import * as _357 from "./tokenfactory/v1beta1/tx.registry";
import * as _358 from "./wasm/v1/tx.registry";
import * as _359 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _360 from "./wasm/v1/query.rpc.Query";
import * as _361 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _362 from "./wasm/v1/tx.rpc.msg";
import * as _509 from "./rpc.query";
import * as _510 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._355,
      ..._357,
      ..._359,
      ..._361
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._356,
      ..._358,
      ..._360,
      ..._362
    };
  }
  export const ClientFactory = {
    ..._509,
    ..._510
  };
}