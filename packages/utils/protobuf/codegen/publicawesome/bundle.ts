import * as _216 from "./stargaze/alloc/v1beta1/genesis";
import * as _217 from "./stargaze/alloc/v1beta1/params";
import * as _218 from "./stargaze/alloc/v1beta1/query";
import * as _219 from "./stargaze/alloc/v1beta1/tx";
import * as _220 from "./stargaze/cron/v1/cron";
import * as _221 from "./stargaze/cron/v1/genesis";
import * as _222 from "./stargaze/cron/v1/proposal";
import * as _223 from "./stargaze/cron/v1/query";
import * as _224 from "./stargaze/cron/v1/tx";
import * as _225 from "./stargaze/globalfee/v1/genesis";
import * as _226 from "./stargaze/globalfee/v1/globalfee";
import * as _227 from "./stargaze/globalfee/v1/proposal";
import * as _228 from "./stargaze/globalfee/v1/query";
import * as _229 from "./stargaze/globalfee/v1/tx";
import * as _230 from "./stargaze/mint/v1beta1/genesis";
import * as _231 from "./stargaze/mint/v1beta1/mint";
import * as _232 from "./stargaze/mint/v1beta1/query";
import * as _233 from "./stargaze/mint/v1beta1/tx";
import * as _425 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _426 from "./stargaze/cron/v1/tx.amino";
import * as _427 from "./stargaze/globalfee/v1/tx.amino";
import * as _428 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _429 from "./stargaze/cron/v1/tx.registry";
import * as _430 from "./stargaze/globalfee/v1/tx.registry";
import * as _431 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _432 from "./stargaze/cron/v1/query.rpc.Query";
import * as _433 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _434 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _435 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _436 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _437 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _475 from "./rpc.query";
import * as _476 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._216,
        ..._217,
        ..._218,
        ..._219,
        ..._425,
        ..._428,
        ..._431,
        ..._435
      };
    }
    export namespace cron {
      export const v1 = {
        ..._220,
        ..._221,
        ..._222,
        ..._223,
        ..._224,
        ..._426,
        ..._429,
        ..._432,
        ..._436
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._225,
        ..._226,
        ..._227,
        ..._228,
        ..._229,
        ..._427,
        ..._430,
        ..._433,
        ..._437
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._230,
        ..._231,
        ..._232,
        ..._233,
        ..._434
      };
    }
  }
  export const ClientFactory = {
    ..._475,
    ..._476
  };
}