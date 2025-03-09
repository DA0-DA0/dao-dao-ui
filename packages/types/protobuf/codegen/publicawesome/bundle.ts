import * as _329 from "./stargaze/alloc/v1beta1/genesis";
import * as _330 from "./stargaze/alloc/v1beta1/params";
import * as _331 from "./stargaze/alloc/v1beta1/query";
import * as _332 from "./stargaze/alloc/v1beta1/tx";
import * as _333 from "./stargaze/cron/v1/cron";
import * as _334 from "./stargaze/cron/v1/genesis";
import * as _335 from "./stargaze/cron/v1/proposal";
import * as _336 from "./stargaze/cron/v1/query";
import * as _337 from "./stargaze/cron/v1/tx";
import * as _338 from "./stargaze/globalfee/v1/genesis";
import * as _339 from "./stargaze/globalfee/v1/globalfee";
import * as _340 from "./stargaze/globalfee/v1/proposal";
import * as _341 from "./stargaze/globalfee/v1/query";
import * as _342 from "./stargaze/globalfee/v1/tx";
import * as _343 from "./stargaze/mint/v1beta1/genesis";
import * as _344 from "./stargaze/mint/v1beta1/mint";
import * as _345 from "./stargaze/mint/v1beta1/query";
import * as _346 from "./stargaze/mint/v1beta1/tx";
import * as _646 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _647 from "./stargaze/cron/v1/tx.amino";
import * as _648 from "./stargaze/globalfee/v1/tx.amino";
import * as _649 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _650 from "./stargaze/cron/v1/tx.registry";
import * as _651 from "./stargaze/globalfee/v1/tx.registry";
import * as _652 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _653 from "./stargaze/cron/v1/query.rpc.Query";
import * as _654 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _655 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _656 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _657 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _658 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _737 from "./rpc.query";
import * as _738 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._646,
        ..._649,
        ..._652,
        ..._656
      };
    }
    export namespace cron {
      export const v1 = {
        ..._333,
        ..._334,
        ..._335,
        ..._336,
        ..._337,
        ..._647,
        ..._650,
        ..._653,
        ..._657
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._338,
        ..._339,
        ..._340,
        ..._341,
        ..._342,
        ..._648,
        ..._651,
        ..._654,
        ..._658
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._343,
        ..._344,
        ..._345,
        ..._346,
        ..._655
      };
    }
  }
  export const ClientFactory = {
    ..._737,
    ..._738
  };
}