import * as _297 from "./stargaze/alloc/v1beta1/genesis";
import * as _298 from "./stargaze/alloc/v1beta1/params";
import * as _299 from "./stargaze/alloc/v1beta1/query";
import * as _300 from "./stargaze/alloc/v1beta1/tx";
import * as _301 from "./stargaze/cron/v1/cron";
import * as _302 from "./stargaze/cron/v1/genesis";
import * as _303 from "./stargaze/cron/v1/proposal";
import * as _304 from "./stargaze/cron/v1/query";
import * as _305 from "./stargaze/cron/v1/tx";
import * as _306 from "./stargaze/globalfee/v1/genesis";
import * as _307 from "./stargaze/globalfee/v1/globalfee";
import * as _308 from "./stargaze/globalfee/v1/proposal";
import * as _309 from "./stargaze/globalfee/v1/query";
import * as _310 from "./stargaze/globalfee/v1/tx";
import * as _311 from "./stargaze/mint/v1beta1/genesis";
import * as _312 from "./stargaze/mint/v1beta1/mint";
import * as _313 from "./stargaze/mint/v1beta1/query";
import * as _314 from "./stargaze/mint/v1beta1/tx";
import * as _561 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _562 from "./stargaze/cron/v1/tx.amino";
import * as _563 from "./stargaze/globalfee/v1/tx.amino";
import * as _564 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _565 from "./stargaze/cron/v1/tx.registry";
import * as _566 from "./stargaze/globalfee/v1/tx.registry";
import * as _567 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _568 from "./stargaze/cron/v1/query.rpc.Query";
import * as _569 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _570 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _571 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _572 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _573 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _622 from "./rpc.query";
import * as _623 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._297,
        ..._298,
        ..._299,
        ..._300,
        ..._561,
        ..._564,
        ..._567,
        ..._571
      };
    }
    export namespace cron {
      export const v1 = {
        ..._301,
        ..._302,
        ..._303,
        ..._304,
        ..._305,
        ..._562,
        ..._565,
        ..._568,
        ..._572
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._306,
        ..._307,
        ..._308,
        ..._309,
        ..._310,
        ..._563,
        ..._566,
        ..._569,
        ..._573
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._311,
        ..._312,
        ..._313,
        ..._314,
        ..._570
      };
    }
  }
  export const ClientFactory = {
    ..._622,
    ..._623
  };
}