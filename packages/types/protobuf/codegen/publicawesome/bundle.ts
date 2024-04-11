import * as _293 from "./stargaze/alloc/v1beta1/genesis";
import * as _294 from "./stargaze/alloc/v1beta1/params";
import * as _295 from "./stargaze/alloc/v1beta1/query";
import * as _296 from "./stargaze/alloc/v1beta1/tx";
import * as _297 from "./stargaze/cron/v1/cron";
import * as _298 from "./stargaze/cron/v1/genesis";
import * as _299 from "./stargaze/cron/v1/proposal";
import * as _300 from "./stargaze/cron/v1/query";
import * as _301 from "./stargaze/cron/v1/tx";
import * as _302 from "./stargaze/globalfee/v1/genesis";
import * as _303 from "./stargaze/globalfee/v1/globalfee";
import * as _304 from "./stargaze/globalfee/v1/proposal";
import * as _305 from "./stargaze/globalfee/v1/query";
import * as _306 from "./stargaze/globalfee/v1/tx";
import * as _307 from "./stargaze/mint/v1beta1/genesis";
import * as _308 from "./stargaze/mint/v1beta1/mint";
import * as _309 from "./stargaze/mint/v1beta1/query";
import * as _310 from "./stargaze/mint/v1beta1/tx";
import * as _567 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _568 from "./stargaze/cron/v1/tx.amino";
import * as _569 from "./stargaze/globalfee/v1/tx.amino";
import * as _570 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _571 from "./stargaze/cron/v1/tx.registry";
import * as _572 from "./stargaze/globalfee/v1/tx.registry";
import * as _573 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _574 from "./stargaze/cron/v1/query.rpc.Query";
import * as _575 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _576 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _577 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _578 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _579 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _639 from "./rpc.query";
import * as _640 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._293,
        ..._294,
        ..._295,
        ..._296,
        ..._567,
        ..._570,
        ..._573,
        ..._577
      };
    }
    export namespace cron {
      export const v1 = {
        ..._297,
        ..._298,
        ..._299,
        ..._300,
        ..._301,
        ..._568,
        ..._571,
        ..._574,
        ..._578
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._302,
        ..._303,
        ..._304,
        ..._305,
        ..._306,
        ..._569,
        ..._572,
        ..._575,
        ..._579
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._307,
        ..._308,
        ..._309,
        ..._310,
        ..._576
      };
    }
  }
  export const ClientFactory = {
    ..._639,
    ..._640
  };
}