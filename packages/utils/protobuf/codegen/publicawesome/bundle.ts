import * as _213 from "./stargaze/alloc/v1beta1/genesis";
import * as _214 from "./stargaze/alloc/v1beta1/params";
import * as _215 from "./stargaze/alloc/v1beta1/query";
import * as _216 from "./stargaze/alloc/v1beta1/tx";
import * as _217 from "./stargaze/cron/v1/cron";
import * as _218 from "./stargaze/cron/v1/genesis";
import * as _219 from "./stargaze/cron/v1/proposal";
import * as _220 from "./stargaze/cron/v1/query";
import * as _221 from "./stargaze/cron/v1/tx";
import * as _222 from "./stargaze/globalfee/v1/genesis";
import * as _223 from "./stargaze/globalfee/v1/globalfee";
import * as _224 from "./stargaze/globalfee/v1/proposal";
import * as _225 from "./stargaze/globalfee/v1/query";
import * as _226 from "./stargaze/globalfee/v1/tx";
import * as _227 from "./stargaze/mint/v1beta1/genesis";
import * as _228 from "./stargaze/mint/v1beta1/mint";
import * as _229 from "./stargaze/mint/v1beta1/query";
import * as _230 from "./stargaze/mint/v1beta1/tx";
import * as _395 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _396 from "./stargaze/cron/v1/tx.amino";
import * as _397 from "./stargaze/globalfee/v1/tx.amino";
import * as _398 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _399 from "./stargaze/cron/v1/tx.registry";
import * as _400 from "./stargaze/globalfee/v1/tx.registry";
import * as _401 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _402 from "./stargaze/cron/v1/query.rpc.Query";
import * as _403 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _404 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _405 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _406 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _407 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _423 from "./rpc.query";
import * as _424 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._213,
        ..._214,
        ..._215,
        ..._216,
        ..._395,
        ..._398,
        ..._401,
        ..._405
      };
    }
    export namespace cron {
      export const v1 = {
        ..._217,
        ..._218,
        ..._219,
        ..._220,
        ..._221,
        ..._396,
        ..._399,
        ..._402,
        ..._406
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._222,
        ..._223,
        ..._224,
        ..._225,
        ..._226,
        ..._397,
        ..._400,
        ..._403,
        ..._407
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._227,
        ..._228,
        ..._229,
        ..._230,
        ..._404
      };
    }
  }
  export const ClientFactory = {
    ..._423,
    ..._424
  };
}