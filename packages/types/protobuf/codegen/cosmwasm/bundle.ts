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
import * as _427 from "./tokenfactory/v1beta1/tx.amino";
import * as _428 from "./wasm/v1/tx.amino";
import * as _429 from "./tokenfactory/v1beta1/tx.registry";
import * as _430 from "./wasm/v1/tx.registry";
import * as _431 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _432 from "./wasm/v1/query.rpc.Query";
import * as _433 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _434 from "./wasm/v1/tx.rpc.msg";
import * as _631 from "./rpc.query";
import * as _632 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._427,
      ..._429,
      ..._431,
      ..._433
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
      ..._428,
      ..._430,
      ..._432,
      ..._434
    };
  }
  export const ClientFactory = {
    ..._631,
    ..._632
  };
}