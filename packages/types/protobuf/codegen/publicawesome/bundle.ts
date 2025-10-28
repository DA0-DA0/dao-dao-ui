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
import * as _817 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _818 from "./stargaze/cron/v1/tx.amino";
import * as _819 from "./stargaze/globalfee/v1/tx.amino";
import * as _820 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _821 from "./stargaze/cron/v1/tx.registry";
import * as _822 from "./stargaze/globalfee/v1/tx.registry";
import * as _823 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _824 from "./stargaze/cron/v1/query.rpc.Query";
import * as _825 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _826 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _827 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _828 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _829 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _916 from "./rpc.query";
import * as _917 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._444,
        ..._445,
        ..._446,
        ..._447,
        ..._817,
        ..._820,
        ..._823,
        ..._827
      };
    }
    export namespace cron {
      export const v1 = {
        ..._448,
        ..._449,
        ..._450,
        ..._451,
        ..._452,
        ..._818,
        ..._821,
        ..._824,
        ..._828
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._453,
        ..._454,
        ..._455,
        ..._456,
        ..._457,
        ..._819,
        ..._822,
        ..._825,
        ..._829
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._458,
        ..._459,
        ..._460,
        ..._461,
        ..._826
      };
    }
  }
  export const ClientFactory = {
    ..._916,
    ..._917
  };
}