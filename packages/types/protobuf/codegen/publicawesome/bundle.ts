import * as _435 from "./stargaze/alloc/v1beta1/genesis";
import * as _436 from "./stargaze/alloc/v1beta1/params";
import * as _437 from "./stargaze/alloc/v1beta1/query";
import * as _438 from "./stargaze/alloc/v1beta1/tx";
import * as _439 from "./stargaze/cron/v1/cron";
import * as _440 from "./stargaze/cron/v1/genesis";
import * as _441 from "./stargaze/cron/v1/proposal";
import * as _442 from "./stargaze/cron/v1/query";
import * as _443 from "./stargaze/cron/v1/tx";
import * as _444 from "./stargaze/globalfee/v1/genesis";
import * as _445 from "./stargaze/globalfee/v1/globalfee";
import * as _446 from "./stargaze/globalfee/v1/proposal";
import * as _447 from "./stargaze/globalfee/v1/query";
import * as _448 from "./stargaze/globalfee/v1/tx";
import * as _449 from "./stargaze/mint/v1beta1/genesis";
import * as _450 from "./stargaze/mint/v1beta1/mint";
import * as _451 from "./stargaze/mint/v1beta1/query";
import * as _452 from "./stargaze/mint/v1beta1/tx";
import * as _799 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _800 from "./stargaze/cron/v1/tx.amino";
import * as _801 from "./stargaze/globalfee/v1/tx.amino";
import * as _802 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _803 from "./stargaze/cron/v1/tx.registry";
import * as _804 from "./stargaze/globalfee/v1/tx.registry";
import * as _805 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _806 from "./stargaze/cron/v1/query.rpc.Query";
import * as _807 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _808 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _809 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _810 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _811 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _894 from "./rpc.query";
import * as _895 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._435,
        ..._436,
        ..._437,
        ..._438,
        ..._799,
        ..._802,
        ..._805,
        ..._809
      };
    }
    export namespace cron {
      export const v1 = {
        ..._439,
        ..._440,
        ..._441,
        ..._442,
        ..._443,
        ..._800,
        ..._803,
        ..._806,
        ..._810
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._444,
        ..._445,
        ..._446,
        ..._447,
        ..._448,
        ..._801,
        ..._804,
        ..._807,
        ..._811
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._449,
        ..._450,
        ..._451,
        ..._452,
        ..._808
      };
    }
  }
  export const ClientFactory = {
    ..._894,
    ..._895
  };
}