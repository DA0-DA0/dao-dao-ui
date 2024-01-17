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
import * as _256 from "./tokenfactory/v1beta1/tx.amino";
import * as _257 from "./wasm/v1/tx.amino";
import * as _258 from "./tokenfactory/v1beta1/tx.registry";
import * as _259 from "./wasm/v1/tx.registry";
import * as _260 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _261 from "./wasm/v1/query.rpc.Query";
import * as _262 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _263 from "./wasm/v1/tx.rpc.msg";
import * as _364 from "./rpc.query";
import * as _365 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._256,
      ..._258,
      ..._260,
      ..._262
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
      ..._257,
      ..._259,
      ..._261,
      ..._263
    };
  }
  export const ClientFactory = {
    ..._364,
    ..._365
  };
}