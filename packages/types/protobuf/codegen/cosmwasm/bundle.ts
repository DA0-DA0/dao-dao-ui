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
import * as _438 from "./tokenfactory/v1beta1/tx.amino";
import * as _439 from "./wasm/v1/tx.amino";
import * as _440 from "./tokenfactory/v1beta1/tx.registry";
import * as _441 from "./wasm/v1/tx.registry";
import * as _442 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _443 from "./wasm/v1/query.rpc.Query";
import * as _444 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _445 from "./wasm/v1/tx.rpc.msg";
import * as _650 from "./rpc.query";
import * as _651 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._438,
      ..._440,
      ..._442,
      ..._444
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
      ..._439,
      ..._441,
      ..._443,
      ..._445
    };
  }
  export const ClientFactory = {
    ..._650,
    ..._651
  };
}