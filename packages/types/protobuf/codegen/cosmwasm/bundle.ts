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
import * as _371 from "./tokenfactory/v1beta1/tx.amino";
import * as _372 from "./wasm/v1/tx.amino";
import * as _373 from "./tokenfactory/v1beta1/tx.registry";
import * as _374 from "./wasm/v1/tx.registry";
import * as _375 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _376 from "./wasm/v1/query.rpc.Query";
import * as _377 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _378 from "./wasm/v1/tx.rpc.msg";
import * as _537 from "./rpc.query";
import * as _538 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._371,
      ..._373,
      ..._375,
      ..._377
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
      ..._372,
      ..._374,
      ..._376,
      ..._378
    };
  }
  export const ClientFactory = {
    ..._537,
    ..._538
  };
}