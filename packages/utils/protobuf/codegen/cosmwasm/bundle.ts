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
import * as _249 from "./tokenfactory/v1beta1/tx.amino";
import * as _250 from "./wasm/v1/tx.amino";
import * as _251 from "./tokenfactory/v1beta1/tx.registry";
import * as _252 from "./wasm/v1/tx.registry";
import * as _253 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _254 from "./wasm/v1/query.rpc.Query";
import * as _255 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _256 from "./wasm/v1/tx.rpc.msg";
import * as _349 from "./rpc.query";
import * as _350 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._249,
      ..._251,
      ..._253,
      ..._255
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
      ..._250,
      ..._252,
      ..._254,
      ..._256
    };
  }
  export const ClientFactory = {
    ..._349,
    ..._350
  };
}