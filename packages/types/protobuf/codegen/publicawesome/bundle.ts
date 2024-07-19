import * as _308 from "./stargaze/alloc/v1beta1/genesis";
import * as _309 from "./stargaze/alloc/v1beta1/params";
import * as _310 from "./stargaze/alloc/v1beta1/query";
import * as _311 from "./stargaze/alloc/v1beta1/tx";
import * as _312 from "./stargaze/cron/v1/cron";
import * as _313 from "./stargaze/cron/v1/genesis";
import * as _314 from "./stargaze/cron/v1/proposal";
import * as _315 from "./stargaze/cron/v1/query";
import * as _316 from "./stargaze/cron/v1/tx";
import * as _317 from "./stargaze/globalfee/v1/genesis";
import * as _318 from "./stargaze/globalfee/v1/globalfee";
import * as _319 from "./stargaze/globalfee/v1/proposal";
import * as _320 from "./stargaze/globalfee/v1/query";
import * as _321 from "./stargaze/globalfee/v1/tx";
import * as _322 from "./stargaze/mint/v1beta1/genesis";
import * as _323 from "./stargaze/mint/v1beta1/mint";
import * as _324 from "./stargaze/mint/v1beta1/query";
import * as _325 from "./stargaze/mint/v1beta1/tx";
import * as _594 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _595 from "./stargaze/cron/v1/tx.amino";
import * as _596 from "./stargaze/globalfee/v1/tx.amino";
import * as _597 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _598 from "./stargaze/cron/v1/tx.registry";
import * as _599 from "./stargaze/globalfee/v1/tx.registry";
import * as _600 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _601 from "./stargaze/cron/v1/query.rpc.Query";
import * as _602 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _603 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _604 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _605 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _606 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _670 from "./rpc.query";
import * as _671 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._308,
        ..._309,
        ..._310,
        ..._311,
        ..._594,
        ..._597,
        ..._600,
        ..._604
      };
    }
    export namespace cron {
      export const v1 = {
        ..._312,
        ..._313,
        ..._314,
        ..._315,
        ..._316,
        ..._595,
        ..._598,
        ..._601,
        ..._605
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._317,
        ..._318,
        ..._319,
        ..._320,
        ..._321,
        ..._596,
        ..._599,
        ..._602,
        ..._606
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._322,
        ..._323,
        ..._324,
        ..._325,
        ..._603
      };
    }
  }
  export const ClientFactory = {
    ..._670,
    ..._671
  };
}