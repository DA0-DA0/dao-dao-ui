import * as _58 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _59 from "./tokenfactory/v1beta1/genesis";
import * as _60 from "./tokenfactory/v1beta1/params";
import * as _61 from "./tokenfactory/v1beta1/query";
import * as _62 from "./tokenfactory/v1beta1/tx";
import * as _63 from "./wasm/v1/authz";
import * as _64 from "./wasm/v1/genesis";
import * as _65 from "./wasm/v1/ibc";
import * as _66 from "./wasm/v1/proposal";
import * as _67 from "./wasm/v1/query";
import * as _68 from "./wasm/v1/tx";
import * as _69 from "./wasm/v1/types";
import * as _246 from "./tokenfactory/v1beta1/tx.amino";
import * as _247 from "./wasm/v1/tx.amino";
import * as _248 from "./tokenfactory/v1beta1/tx.registry";
import * as _249 from "./wasm/v1/tx.registry";
import * as _250 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _251 from "./wasm/v1/query.rpc.Query";
import * as _252 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _253 from "./wasm/v1/tx.rpc.msg";
import * as _345 from "./rpc.query";
import * as _346 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._246,
      ..._248,
      ..._250,
      ..._252
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._63,
      ..._64,
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._69,
      ..._247,
      ..._249,
      ..._251,
      ..._253
    };
  }
  export const ClientFactory = {
    ..._345,
    ..._346
  };
}