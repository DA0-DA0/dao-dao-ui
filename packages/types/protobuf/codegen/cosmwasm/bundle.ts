import * as _92 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _93 from "./tokenfactory/v1beta1/genesis";
import * as _94 from "./tokenfactory/v1beta1/params";
import * as _95 from "./tokenfactory/v1beta1/query";
import * as _96 from "./tokenfactory/v1beta1/tx";
import * as _97 from "./wasm/v1/authz";
import * as _98 from "./wasm/v1/genesis";
import * as _99 from "./wasm/v1/ibc";
import * as _100 from "./wasm/v1/proposal";
import * as _101 from "./wasm/v1/query";
import * as _102 from "./wasm/v1/tx";
import * as _103 from "./wasm/v1/types";
import * as _449 from "./tokenfactory/v1beta1/tx.amino";
import * as _450 from "./wasm/v1/tx.amino";
import * as _451 from "./tokenfactory/v1beta1/tx.registry";
import * as _452 from "./wasm/v1/tx.registry";
import * as _453 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _454 from "./wasm/v1/query.rpc.Query";
import * as _455 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _456 from "./wasm/v1/tx.rpc.msg";
import * as _666 from "./rpc.query";
import * as _667 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._449,
      ..._451,
      ..._453,
      ..._455
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._450,
      ..._452,
      ..._454,
      ..._456
    };
  }
  export const ClientFactory = {
    ..._666,
    ..._667
  };
}