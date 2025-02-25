import * as _325 from "./stargaze/alloc/v1beta1/genesis";
import * as _326 from "./stargaze/alloc/v1beta1/params";
import * as _327 from "./stargaze/alloc/v1beta1/query";
import * as _328 from "./stargaze/alloc/v1beta1/tx";
import * as _329 from "./stargaze/cron/v1/cron";
import * as _330 from "./stargaze/cron/v1/genesis";
import * as _331 from "./stargaze/cron/v1/proposal";
import * as _332 from "./stargaze/cron/v1/query";
import * as _333 from "./stargaze/cron/v1/tx";
import * as _334 from "./stargaze/globalfee/v1/genesis";
import * as _335 from "./stargaze/globalfee/v1/globalfee";
import * as _336 from "./stargaze/globalfee/v1/proposal";
import * as _337 from "./stargaze/globalfee/v1/query";
import * as _338 from "./stargaze/globalfee/v1/tx";
import * as _339 from "./stargaze/mint/v1beta1/genesis";
import * as _340 from "./stargaze/mint/v1beta1/mint";
import * as _341 from "./stargaze/mint/v1beta1/query";
import * as _342 from "./stargaze/mint/v1beta1/tx";
import * as _642 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _643 from "./stargaze/cron/v1/tx.amino";
import * as _644 from "./stargaze/globalfee/v1/tx.amino";
import * as _645 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _646 from "./stargaze/cron/v1/tx.registry";
import * as _647 from "./stargaze/globalfee/v1/tx.registry";
import * as _648 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _649 from "./stargaze/cron/v1/query.rpc.Query";
import * as _650 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _651 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _652 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _653 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _654 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _733 from "./rpc.query";
import * as _734 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._325,
        ..._326,
        ..._327,
        ..._328,
        ..._642,
        ..._645,
        ..._648,
        ..._652
      };
    }
    export namespace cron {
      export const v1 = {
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._333,
        ..._643,
        ..._646,
        ..._649,
        ..._653
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._334,
        ..._335,
        ..._336,
        ..._337,
        ..._338,
        ..._644,
        ..._647,
        ..._650,
        ..._654
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._339,
        ..._340,
        ..._341,
        ..._342,
        ..._651
      };
    }
  }
  export const ClientFactory = {
    ..._733,
    ..._734
  };
}