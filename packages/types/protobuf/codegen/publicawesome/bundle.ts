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
import * as _804 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _805 from "./stargaze/cron/v1/tx.amino";
import * as _806 from "./stargaze/globalfee/v1/tx.amino";
import * as _807 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _808 from "./stargaze/cron/v1/tx.registry";
import * as _809 from "./stargaze/globalfee/v1/tx.registry";
import * as _810 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _811 from "./stargaze/cron/v1/query.rpc.Query";
import * as _812 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _813 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _814 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _815 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _816 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _903 from "./rpc.query";
import * as _904 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._435,
        ..._436,
        ..._437,
        ..._438,
        ..._804,
        ..._807,
        ..._810,
        ..._814
      };
    }
    export namespace cron {
      export const v1 = {
        ..._439,
        ..._440,
        ..._441,
        ..._442,
        ..._443,
        ..._805,
        ..._808,
        ..._811,
        ..._815
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._444,
        ..._445,
        ..._446,
        ..._447,
        ..._448,
        ..._806,
        ..._809,
        ..._812,
        ..._816
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._449,
        ..._450,
        ..._451,
        ..._452,
        ..._813
      };
    }
  }
  export const ClientFactory = {
    ..._903,
    ..._904
  };
}