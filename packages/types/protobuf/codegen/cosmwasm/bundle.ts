import * as _94 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _95 from "./tokenfactory/v1beta1/genesis";
import * as _96 from "./tokenfactory/v1beta1/params";
import * as _97 from "./tokenfactory/v1beta1/query";
import * as _98 from "./tokenfactory/v1beta1/tx";
import * as _99 from "./wasm/v1/authz";
import * as _100 from "./wasm/v1/genesis";
import * as _101 from "./wasm/v1/ibc";
import * as _102 from "./wasm/v1/proposal";
import * as _103 from "./wasm/v1/query";
import * as _104 from "./wasm/v1/tx";
import * as _105 from "./wasm/v1/types";
import * as _411 from "./tokenfactory/v1beta1/tx.amino";
import * as _412 from "./wasm/v1/tx.amino";
import * as _413 from "./tokenfactory/v1beta1/tx.registry";
import * as _414 from "./wasm/v1/tx.registry";
import * as _415 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _416 from "./wasm/v1/query.rpc.Query";
import * as _417 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _418 from "./wasm/v1/tx.rpc.msg";
import * as _594 from "./rpc.query";
import * as _595 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._411,
      ..._413,
      ..._415,
      ..._417
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._412,
      ..._414,
      ..._416,
      ..._418
    };
  }
  export const ClientFactory = {
    ..._594,
    ..._595
  };
}