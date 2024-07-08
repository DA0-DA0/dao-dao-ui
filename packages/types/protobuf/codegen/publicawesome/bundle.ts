import * as _302 from "./stargaze/alloc/v1beta1/genesis";
import * as _303 from "./stargaze/alloc/v1beta1/params";
import * as _304 from "./stargaze/alloc/v1beta1/query";
import * as _305 from "./stargaze/alloc/v1beta1/tx";
import * as _306 from "./stargaze/cron/v1/cron";
import * as _307 from "./stargaze/cron/v1/genesis";
import * as _308 from "./stargaze/cron/v1/proposal";
import * as _309 from "./stargaze/cron/v1/query";
import * as _310 from "./stargaze/cron/v1/tx";
import * as _311 from "./stargaze/globalfee/v1/genesis";
import * as _312 from "./stargaze/globalfee/v1/globalfee";
import * as _313 from "./stargaze/globalfee/v1/proposal";
import * as _314 from "./stargaze/globalfee/v1/query";
import * as _315 from "./stargaze/globalfee/v1/tx";
import * as _316 from "./stargaze/mint/v1beta1/genesis";
import * as _317 from "./stargaze/mint/v1beta1/mint";
import * as _318 from "./stargaze/mint/v1beta1/query";
import * as _319 from "./stargaze/mint/v1beta1/tx";
import * as _584 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _585 from "./stargaze/cron/v1/tx.amino";
import * as _586 from "./stargaze/globalfee/v1/tx.amino";
import * as _587 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _588 from "./stargaze/cron/v1/tx.registry";
import * as _589 from "./stargaze/globalfee/v1/tx.registry";
import * as _590 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _591 from "./stargaze/cron/v1/query.rpc.Query";
import * as _592 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _593 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _594 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _595 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _596 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _660 from "./rpc.query";
import * as _661 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._302,
        ..._303,
        ..._304,
        ..._305,
        ..._584,
        ..._587,
        ..._590,
        ..._594
      };
    }
    export namespace cron {
      export const v1 = {
        ..._306,
        ..._307,
        ..._308,
        ..._309,
        ..._310,
        ..._585,
        ..._588,
        ..._591,
        ..._595
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._311,
        ..._312,
        ..._313,
        ..._314,
        ..._315,
        ..._586,
        ..._589,
        ..._592,
        ..._596
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._316,
        ..._317,
        ..._318,
        ..._319,
        ..._593
      };
    }
  }
  export const ClientFactory = {
    ..._660,
    ..._661
  };
}