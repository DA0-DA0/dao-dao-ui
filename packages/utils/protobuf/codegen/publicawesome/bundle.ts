import * as _215 from "./stargaze/alloc/v1beta1/genesis";
import * as _216 from "./stargaze/alloc/v1beta1/params";
import * as _217 from "./stargaze/alloc/v1beta1/query";
import * as _218 from "./stargaze/alloc/v1beta1/tx";
import * as _219 from "./stargaze/cron/v1/cron";
import * as _220 from "./stargaze/cron/v1/genesis";
import * as _221 from "./stargaze/cron/v1/proposal";
import * as _222 from "./stargaze/cron/v1/query";
import * as _223 from "./stargaze/cron/v1/tx";
import * as _224 from "./stargaze/globalfee/v1/genesis";
import * as _225 from "./stargaze/globalfee/v1/globalfee";
import * as _226 from "./stargaze/globalfee/v1/proposal";
import * as _227 from "./stargaze/globalfee/v1/query";
import * as _228 from "./stargaze/globalfee/v1/tx";
import * as _229 from "./stargaze/mint/v1beta1/genesis";
import * as _230 from "./stargaze/mint/v1beta1/mint";
import * as _231 from "./stargaze/mint/v1beta1/query";
import * as _232 from "./stargaze/mint/v1beta1/tx";
import * as _397 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _398 from "./stargaze/cron/v1/tx.amino";
import * as _399 from "./stargaze/globalfee/v1/tx.amino";
import * as _400 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _401 from "./stargaze/cron/v1/tx.registry";
import * as _402 from "./stargaze/globalfee/v1/tx.registry";
import * as _403 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _404 from "./stargaze/cron/v1/query.rpc.Query";
import * as _405 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _406 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _407 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _408 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _409 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _425 from "./rpc.query";
import * as _426 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._215,
        ..._216,
        ..._217,
        ..._218,
        ..._397,
        ..._400,
        ..._403,
        ..._407
      };
    }
    export namespace cron {
      export const v1 = {
        ..._219,
        ..._220,
        ..._221,
        ..._222,
        ..._223,
        ..._398,
        ..._401,
        ..._404,
        ..._408
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._224,
        ..._225,
        ..._226,
        ..._227,
        ..._228,
        ..._399,
        ..._402,
        ..._405,
        ..._409
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._229,
        ..._230,
        ..._231,
        ..._232,
        ..._406
      };
    }
  }
  export const ClientFactory = {
    ..._425,
    ..._426
  };
}