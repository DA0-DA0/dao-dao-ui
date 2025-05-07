import * as _336 from "./stargaze/alloc/v1beta1/genesis";
import * as _337 from "./stargaze/alloc/v1beta1/params";
import * as _338 from "./stargaze/alloc/v1beta1/query";
import * as _339 from "./stargaze/alloc/v1beta1/tx";
import * as _340 from "./stargaze/cron/v1/cron";
import * as _341 from "./stargaze/cron/v1/genesis";
import * as _342 from "./stargaze/cron/v1/proposal";
import * as _343 from "./stargaze/cron/v1/query";
import * as _344 from "./stargaze/cron/v1/tx";
import * as _345 from "./stargaze/globalfee/v1/genesis";
import * as _346 from "./stargaze/globalfee/v1/globalfee";
import * as _347 from "./stargaze/globalfee/v1/proposal";
import * as _348 from "./stargaze/globalfee/v1/query";
import * as _349 from "./stargaze/globalfee/v1/tx";
import * as _350 from "./stargaze/mint/v1beta1/genesis";
import * as _351 from "./stargaze/mint/v1beta1/mint";
import * as _352 from "./stargaze/mint/v1beta1/query";
import * as _353 from "./stargaze/mint/v1beta1/tx";
import * as _657 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _658 from "./stargaze/cron/v1/tx.amino";
import * as _659 from "./stargaze/globalfee/v1/tx.amino";
import * as _660 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _661 from "./stargaze/cron/v1/tx.registry";
import * as _662 from "./stargaze/globalfee/v1/tx.registry";
import * as _663 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _664 from "./stargaze/cron/v1/query.rpc.Query";
import * as _665 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _666 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _667 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _668 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _669 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _750 from "./rpc.query";
import * as _751 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._336,
        ..._337,
        ..._338,
        ..._339,
        ..._657,
        ..._660,
        ..._663,
        ..._667
      };
    }
    export namespace cron {
      export const v1 = {
        ..._340,
        ..._341,
        ..._342,
        ..._343,
        ..._344,
        ..._658,
        ..._661,
        ..._664,
        ..._668
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._345,
        ..._346,
        ..._347,
        ..._348,
        ..._349,
        ..._659,
        ..._662,
        ..._665,
        ..._669
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._350,
        ..._351,
        ..._352,
        ..._353,
        ..._666
      };
    }
  }
  export const ClientFactory = {
    ..._750,
    ..._751
  };
}