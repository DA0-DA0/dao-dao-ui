import * as _266 from "./stargaze/alloc/v1beta1/genesis";
import * as _267 from "./stargaze/alloc/v1beta1/params";
import * as _268 from "./stargaze/alloc/v1beta1/query";
import * as _269 from "./stargaze/alloc/v1beta1/tx";
import * as _270 from "./stargaze/cron/v1/cron";
import * as _271 from "./stargaze/cron/v1/genesis";
import * as _272 from "./stargaze/cron/v1/proposal";
import * as _273 from "./stargaze/cron/v1/query";
import * as _274 from "./stargaze/cron/v1/tx";
import * as _275 from "./stargaze/globalfee/v1/genesis";
import * as _276 from "./stargaze/globalfee/v1/globalfee";
import * as _277 from "./stargaze/globalfee/v1/proposal";
import * as _278 from "./stargaze/globalfee/v1/query";
import * as _279 from "./stargaze/globalfee/v1/tx";
import * as _280 from "./stargaze/mint/v1beta1/genesis";
import * as _281 from "./stargaze/mint/v1beta1/mint";
import * as _282 from "./stargaze/mint/v1beta1/query";
import * as _283 from "./stargaze/mint/v1beta1/tx";
import * as _503 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _504 from "./stargaze/cron/v1/tx.amino";
import * as _505 from "./stargaze/globalfee/v1/tx.amino";
import * as _506 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _507 from "./stargaze/cron/v1/tx.registry";
import * as _508 from "./stargaze/globalfee/v1/tx.registry";
import * as _509 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _510 from "./stargaze/cron/v1/query.rpc.Query";
import * as _511 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _512 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _513 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _514 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _515 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _559 from "./rpc.query";
import * as _560 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._266,
        ..._267,
        ..._268,
        ..._269,
        ..._503,
        ..._506,
        ..._509,
        ..._513
      };
    }
    export namespace cron {
      export const v1 = {
        ..._270,
        ..._271,
        ..._272,
        ..._273,
        ..._274,
        ..._504,
        ..._507,
        ..._510,
        ..._514
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._275,
        ..._276,
        ..._277,
        ..._278,
        ..._279,
        ..._505,
        ..._508,
        ..._511,
        ..._515
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._280,
        ..._281,
        ..._282,
        ..._283,
        ..._512
      };
    }
  }
  export const ClientFactory = {
    ..._559,
    ..._560
  };
}