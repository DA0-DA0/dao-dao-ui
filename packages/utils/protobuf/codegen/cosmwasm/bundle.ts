import * as _59 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _60 from "./tokenfactory/v1beta1/genesis";
import * as _61 from "./tokenfactory/v1beta1/params";
import * as _62 from "./tokenfactory/v1beta1/query";
import * as _63 from "./tokenfactory/v1beta1/tx";
import * as _64 from "./wasm/v1/authz";
import * as _65 from "./wasm/v1/genesis";
import * as _66 from "./wasm/v1/ibc";
import * as _67 from "./wasm/v1/proposal";
import * as _68 from "./wasm/v1/query";
import * as _69 from "./wasm/v1/tx";
import * as _70 from "./wasm/v1/types";
import * as _317 from "./tokenfactory/v1beta1/tx.amino";
import * as _318 from "./wasm/v1/tx.amino";
import * as _319 from "./tokenfactory/v1beta1/tx.registry";
import * as _320 from "./wasm/v1/tx.registry";
import * as _321 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _322 from "./wasm/v1/query.rpc.Query";
import * as _323 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _324 from "./wasm/v1/tx.rpc.msg";
import * as _463 from "./rpc.query";
import * as _464 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._63,
      ..._317,
      ..._319,
      ..._321,
      ..._323
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._64,
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._318,
      ..._320,
      ..._322,
      ..._324
    };
  }
  export const ClientFactory = {
    ..._463,
    ..._464
  };
}