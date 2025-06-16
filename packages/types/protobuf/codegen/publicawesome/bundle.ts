import * as _424 from "./stargaze/alloc/v1beta1/genesis";
import * as _425 from "./stargaze/alloc/v1beta1/params";
import * as _426 from "./stargaze/alloc/v1beta1/query";
import * as _427 from "./stargaze/alloc/v1beta1/tx";
import * as _428 from "./stargaze/cron/v1/cron";
import * as _429 from "./stargaze/cron/v1/genesis";
import * as _430 from "./stargaze/cron/v1/proposal";
import * as _431 from "./stargaze/cron/v1/query";
import * as _432 from "./stargaze/cron/v1/tx";
import * as _433 from "./stargaze/globalfee/v1/genesis";
import * as _434 from "./stargaze/globalfee/v1/globalfee";
import * as _435 from "./stargaze/globalfee/v1/proposal";
import * as _436 from "./stargaze/globalfee/v1/query";
import * as _437 from "./stargaze/globalfee/v1/tx";
import * as _438 from "./stargaze/mint/v1beta1/genesis";
import * as _439 from "./stargaze/mint/v1beta1/mint";
import * as _440 from "./stargaze/mint/v1beta1/query";
import * as _441 from "./stargaze/mint/v1beta1/tx";
import * as _784 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _785 from "./stargaze/cron/v1/tx.amino";
import * as _786 from "./stargaze/globalfee/v1/tx.amino";
import * as _787 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _788 from "./stargaze/cron/v1/tx.registry";
import * as _789 from "./stargaze/globalfee/v1/tx.registry";
import * as _790 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _791 from "./stargaze/cron/v1/query.rpc.Query";
import * as _792 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _793 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _794 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _795 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _796 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _879 from "./rpc.query";
import * as _880 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._424,
        ..._425,
        ..._426,
        ..._427,
        ..._784,
        ..._787,
        ..._790,
        ..._794
      };
    }
    export namespace cron {
      export const v1 = {
        ..._428,
        ..._429,
        ..._430,
        ..._431,
        ..._432,
        ..._785,
        ..._788,
        ..._791,
        ..._795
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._433,
        ..._434,
        ..._435,
        ..._436,
        ..._437,
        ..._786,
        ..._789,
        ..._792,
        ..._796
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._438,
        ..._439,
        ..._440,
        ..._441,
        ..._793
      };
    }
  }
  export const ClientFactory = {
    ..._879,
    ..._880
  };
}