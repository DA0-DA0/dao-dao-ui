import * as _70 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _71 from "./tokenfactory/v1beta1/genesis";
import * as _72 from "./tokenfactory/v1beta1/params";
import * as _73 from "./tokenfactory/v1beta1/query";
import * as _74 from "./tokenfactory/v1beta1/tx";
import * as _75 from "./wasm/v1/authz";
import * as _76 from "./wasm/v1/genesis";
import * as _77 from "./wasm/v1/ibc";
import * as _78 from "./wasm/v1/proposal";
import * as _79 from "./wasm/v1/query";
import * as _80 from "./wasm/v1/tx";
import * as _81 from "./wasm/v1/types";
import * as _332 from "./tokenfactory/v1beta1/tx.amino";
import * as _333 from "./wasm/v1/tx.amino";
import * as _334 from "./tokenfactory/v1beta1/tx.registry";
import * as _335 from "./wasm/v1/tx.registry";
import * as _336 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _337 from "./wasm/v1/query.rpc.Query";
import * as _338 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _339 from "./wasm/v1/tx.rpc.msg";
import * as _480 from "./rpc.query";
import * as _481 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._73,
      ..._74,
      ..._332,
      ..._334,
      ..._336,
      ..._338
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._75,
      ..._76,
      ..._77,
      ..._78,
      ..._79,
      ..._80,
      ..._81,
      ..._333,
      ..._335,
      ..._337,
      ..._339
    };
  }
  export const ClientFactory = {
    ..._480,
    ..._481
  };
}