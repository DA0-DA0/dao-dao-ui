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
import * as _400 from "./tokenfactory/v1beta1/tx.amino";
import * as _401 from "./wasm/v1/tx.amino";
import * as _402 from "./tokenfactory/v1beta1/tx.registry";
import * as _403 from "./wasm/v1/tx.registry";
import * as _404 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _405 from "./wasm/v1/query.rpc.Query";
import * as _406 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _407 from "./wasm/v1/tx.rpc.msg";
import * as _582 from "./rpc.query";
import * as _583 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._400,
      ..._402,
      ..._404,
      ..._406
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
      ..._401,
      ..._403,
      ..._405,
      ..._407
    };
  }
  export const ClientFactory = {
    ..._582,
    ..._583
  };
}