import * as _69 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _70 from "./tokenfactory/v1beta1/genesis";
import * as _71 from "./tokenfactory/v1beta1/params";
import * as _72 from "./tokenfactory/v1beta1/query";
import * as _73 from "./tokenfactory/v1beta1/tx";
import * as _74 from "./wasm/v1/authz";
import * as _75 from "./wasm/v1/genesis";
import * as _76 from "./wasm/v1/ibc";
import * as _77 from "./wasm/v1/proposal";
import * as _78 from "./wasm/v1/query";
import * as _79 from "./wasm/v1/tx";
import * as _80 from "./wasm/v1/types";
import * as _331 from "./tokenfactory/v1beta1/tx.amino";
import * as _332 from "./wasm/v1/tx.amino";
import * as _333 from "./tokenfactory/v1beta1/tx.registry";
import * as _334 from "./wasm/v1/tx.registry";
import * as _335 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _336 from "./wasm/v1/query.rpc.Query";
import * as _337 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _338 from "./wasm/v1/tx.rpc.msg";
import * as _479 from "./rpc.query";
import * as _480 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._69,
      ..._70,
      ..._71,
      ..._72,
      ..._73,
      ..._331,
      ..._333,
      ..._335,
      ..._337
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._74,
      ..._75,
      ..._76,
      ..._77,
      ..._78,
      ..._79,
      ..._80,
      ..._332,
      ..._334,
      ..._336,
      ..._338
    };
  }
  export const ClientFactory = {
    ..._479,
    ..._480
  };
}