import * as _262 from "./stargaze/alloc/v1beta1/genesis";
import * as _263 from "./stargaze/alloc/v1beta1/params";
import * as _264 from "./stargaze/alloc/v1beta1/query";
import * as _265 from "./stargaze/alloc/v1beta1/tx";
import * as _266 from "./stargaze/cron/v1/cron";
import * as _267 from "./stargaze/cron/v1/genesis";
import * as _268 from "./stargaze/cron/v1/proposal";
import * as _269 from "./stargaze/cron/v1/query";
import * as _270 from "./stargaze/cron/v1/tx";
import * as _271 from "./stargaze/globalfee/v1/genesis";
import * as _272 from "./stargaze/globalfee/v1/globalfee";
import * as _273 from "./stargaze/globalfee/v1/proposal";
import * as _274 from "./stargaze/globalfee/v1/query";
import * as _275 from "./stargaze/globalfee/v1/tx";
import * as _276 from "./stargaze/mint/v1beta1/genesis";
import * as _277 from "./stargaze/mint/v1beta1/mint";
import * as _278 from "./stargaze/mint/v1beta1/query";
import * as _279 from "./stargaze/mint/v1beta1/tx";
import * as _495 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _496 from "./stargaze/cron/v1/tx.amino";
import * as _497 from "./stargaze/globalfee/v1/tx.amino";
import * as _498 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _499 from "./stargaze/cron/v1/tx.registry";
import * as _500 from "./stargaze/globalfee/v1/tx.registry";
import * as _501 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _502 from "./stargaze/cron/v1/query.rpc.Query";
import * as _503 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _504 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _505 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _506 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _507 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _551 from "./rpc.query";
import * as _552 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._262,
        ..._263,
        ..._264,
        ..._265,
        ..._495,
        ..._498,
        ..._501,
        ..._505
      };
    }
    export namespace cron {
      export const v1 = {
        ..._266,
        ..._267,
        ..._268,
        ..._269,
        ..._270,
        ..._496,
        ..._499,
        ..._502,
        ..._506
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._271,
        ..._272,
        ..._273,
        ..._274,
        ..._275,
        ..._497,
        ..._500,
        ..._503,
        ..._507
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._276,
        ..._277,
        ..._278,
        ..._279,
        ..._504
      };
    }
  }
  export const ClientFactory = {
    ..._551,
    ..._552
  };
}