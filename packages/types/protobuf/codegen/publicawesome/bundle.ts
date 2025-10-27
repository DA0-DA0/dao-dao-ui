import * as _444 from "./stargaze/alloc/v1beta1/genesis";
import * as _445 from "./stargaze/alloc/v1beta1/params";
import * as _446 from "./stargaze/alloc/v1beta1/query";
import * as _447 from "./stargaze/alloc/v1beta1/tx";
import * as _448 from "./stargaze/cron/v1/cron";
import * as _449 from "./stargaze/cron/v1/genesis";
import * as _450 from "./stargaze/cron/v1/proposal";
import * as _451 from "./stargaze/cron/v1/query";
import * as _452 from "./stargaze/cron/v1/tx";
import * as _453 from "./stargaze/globalfee/v1/genesis";
import * as _454 from "./stargaze/globalfee/v1/globalfee";
import * as _455 from "./stargaze/globalfee/v1/proposal";
import * as _456 from "./stargaze/globalfee/v1/query";
import * as _457 from "./stargaze/globalfee/v1/tx";
import * as _458 from "./stargaze/mint/v1beta1/genesis";
import * as _459 from "./stargaze/mint/v1beta1/mint";
import * as _460 from "./stargaze/mint/v1beta1/query";
import * as _461 from "./stargaze/mint/v1beta1/tx";
import * as _831 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _832 from "./stargaze/cron/v1/tx.amino";
import * as _833 from "./stargaze/globalfee/v1/tx.amino";
import * as _834 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _835 from "./stargaze/cron/v1/tx.registry";
import * as _836 from "./stargaze/globalfee/v1/tx.registry";
import * as _837 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _838 from "./stargaze/cron/v1/query.rpc.Query";
import * as _839 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _840 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _841 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _842 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _843 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _934 from "./rpc.query";
import * as _935 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._444,
        ..._445,
        ..._446,
        ..._447,
        ..._831,
        ..._834,
        ..._837,
        ..._841
      };
    }
    export namespace cron {
      export const v1 = {
        ..._448,
        ..._449,
        ..._450,
        ..._451,
        ..._452,
        ..._832,
        ..._835,
        ..._838,
        ..._842
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._453,
        ..._454,
        ..._455,
        ..._456,
        ..._457,
        ..._833,
        ..._836,
        ..._839,
        ..._843
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._458,
        ..._459,
        ..._460,
        ..._461,
        ..._840
      };
    }
  }
  export const ClientFactory = {
    ..._934,
    ..._935
  };
}