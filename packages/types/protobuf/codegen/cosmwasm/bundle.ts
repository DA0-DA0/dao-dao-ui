import * as _91 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _92 from "./tokenfactory/v1beta1/genesis";
import * as _93 from "./tokenfactory/v1beta1/params";
import * as _94 from "./tokenfactory/v1beta1/query";
import * as _95 from "./tokenfactory/v1beta1/tx";
import * as _96 from "./wasm/v1/authz";
import * as _97 from "./wasm/v1/genesis";
import * as _98 from "./wasm/v1/ibc";
import * as _99 from "./wasm/v1/proposal";
import * as _100 from "./wasm/v1/query";
import * as _101 from "./wasm/v1/tx";
import * as _102 from "./wasm/v1/types";
import * as _409 from "./tokenfactory/v1beta1/tx.amino";
import * as _410 from "./wasm/v1/tx.amino";
import * as _411 from "./tokenfactory/v1beta1/tx.registry";
import * as _412 from "./wasm/v1/tx.registry";
import * as _413 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _414 from "./wasm/v1/query.rpc.Query";
import * as _415 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _416 from "./wasm/v1/tx.rpc.msg";
import * as _596 from "./rpc.query";
import * as _597 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._409,
      ..._411,
      ..._413,
      ..._415
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._410,
      ..._412,
      ..._414,
      ..._416
    };
  }
  export const ClientFactory = {
    ..._596,
    ..._597
  };
}