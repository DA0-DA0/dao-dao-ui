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
import * as _616 from "./tokenfactory/v1beta1/tx.amino";
import * as _617 from "./wasm/v1/tx.amino";
import * as _618 from "./tokenfactory/v1beta1/tx.registry";
import * as _619 from "./wasm/v1/tx.registry";
import * as _620 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _621 from "./wasm/v1/query.rpc.Query";
import * as _622 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _623 from "./wasm/v1/tx.rpc.msg";
import * as _908 from "./rpc.query";
import * as _909 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._616,
      ..._618,
      ..._620,
      ..._622
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
      ..._617,
      ..._619,
      ..._621,
      ..._623
    };
  }
  export const ClientFactory = {
    ..._908,
    ..._909
  };
}