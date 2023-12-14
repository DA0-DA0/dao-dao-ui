import * as _58 from "./wasm/v1/authz";
import * as _59 from "./wasm/v1/genesis";
import * as _60 from "./wasm/v1/ibc";
import * as _61 from "./wasm/v1/proposal";
import * as _62 from "./wasm/v1/query";
import * as _63 from "./wasm/v1/tx";
import * as _64 from "./wasm/v1/types";
import * as _241 from "./wasm/v1/tx.amino";
import * as _242 from "./wasm/v1/tx.registry";
import * as _243 from "./wasm/v1/query.rpc.Query";
import * as _244 from "./wasm/v1/tx.rpc.msg";
import * as _336 from "./rpc.query";
import * as _337 from "./rpc.tx";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._63,
      ..._64,
      ..._241,
      ..._242,
      ..._243,
      ..._244
    };
  }
  export const ClientFactory = {
    ..._336,
    ..._337
  };
}