import * as _315 from "./stargaze/alloc/v1beta1/genesis";
import * as _316 from "./stargaze/alloc/v1beta1/params";
import * as _317 from "./stargaze/alloc/v1beta1/query";
import * as _318 from "./stargaze/alloc/v1beta1/tx";
import * as _319 from "./stargaze/cron/v1/cron";
import * as _320 from "./stargaze/cron/v1/genesis";
import * as _321 from "./stargaze/cron/v1/proposal";
import * as _322 from "./stargaze/cron/v1/query";
import * as _323 from "./stargaze/cron/v1/tx";
import * as _324 from "./stargaze/globalfee/v1/genesis";
import * as _325 from "./stargaze/globalfee/v1/globalfee";
import * as _326 from "./stargaze/globalfee/v1/proposal";
import * as _327 from "./stargaze/globalfee/v1/query";
import * as _328 from "./stargaze/globalfee/v1/tx";
import * as _329 from "./stargaze/mint/v1beta1/genesis";
import * as _330 from "./stargaze/mint/v1beta1/mint";
import * as _331 from "./stargaze/mint/v1beta1/query";
import * as _332 from "./stargaze/mint/v1beta1/tx";
import * as _605 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _606 from "./stargaze/cron/v1/tx.amino";
import * as _607 from "./stargaze/globalfee/v1/tx.amino";
import * as _608 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _609 from "./stargaze/cron/v1/tx.registry";
import * as _610 from "./stargaze/globalfee/v1/tx.registry";
import * as _611 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _612 from "./stargaze/cron/v1/query.rpc.Query";
import * as _613 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _614 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _615 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _616 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _617 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _683 from "./rpc.query";
import * as _684 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._315,
        ..._316,
        ..._317,
        ..._318,
        ..._605,
        ..._608,
        ..._611,
        ..._615
      };
    }
    export namespace cron {
      export const v1 = {
        ..._319,
        ..._320,
        ..._321,
        ..._322,
        ..._323,
        ..._606,
        ..._609,
        ..._612,
        ..._616
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._324,
        ..._325,
        ..._326,
        ..._327,
        ..._328,
        ..._607,
        ..._610,
        ..._613,
        ..._617
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._614
      };
    }
  }
  export const ClientFactory = {
    ..._683,
    ..._684
  };
}