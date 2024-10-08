import * as _319 from "./stargaze/alloc/v1beta1/genesis";
import * as _320 from "./stargaze/alloc/v1beta1/params";
import * as _321 from "./stargaze/alloc/v1beta1/query";
import * as _322 from "./stargaze/alloc/v1beta1/tx";
import * as _323 from "./stargaze/cron/v1/cron";
import * as _324 from "./stargaze/cron/v1/genesis";
import * as _325 from "./stargaze/cron/v1/proposal";
import * as _326 from "./stargaze/cron/v1/query";
import * as _327 from "./stargaze/cron/v1/tx";
import * as _328 from "./stargaze/globalfee/v1/genesis";
import * as _329 from "./stargaze/globalfee/v1/globalfee";
import * as _330 from "./stargaze/globalfee/v1/proposal";
import * as _331 from "./stargaze/globalfee/v1/query";
import * as _332 from "./stargaze/globalfee/v1/tx";
import * as _333 from "./stargaze/mint/v1beta1/genesis";
import * as _334 from "./stargaze/mint/v1beta1/mint";
import * as _335 from "./stargaze/mint/v1beta1/query";
import * as _336 from "./stargaze/mint/v1beta1/tx";
import * as _610 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _611 from "./stargaze/cron/v1/tx.amino";
import * as _612 from "./stargaze/globalfee/v1/tx.amino";
import * as _613 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _614 from "./stargaze/cron/v1/tx.registry";
import * as _615 from "./stargaze/globalfee/v1/tx.registry";
import * as _616 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _617 from "./stargaze/cron/v1/query.rpc.Query";
import * as _618 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _619 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _620 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _621 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _622 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _689 from "./rpc.query";
import * as _690 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._319,
        ..._320,
        ..._321,
        ..._322,
        ..._610,
        ..._613,
        ..._616,
        ..._620
      };
    }
    export namespace cron {
      export const v1 = {
        ..._323,
        ..._324,
        ..._325,
        ..._326,
        ..._327,
        ..._611,
        ..._614,
        ..._617,
        ..._621
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._328,
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._612,
        ..._615,
        ..._618,
        ..._622
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._333,
        ..._334,
        ..._335,
        ..._336,
        ..._619
      };
    }
  }
  export const ClientFactory = {
    ..._689,
    ..._690
  };
}