import * as _246 from "./stargaze/alloc/v1beta1/genesis";
import * as _247 from "./stargaze/alloc/v1beta1/params";
import * as _248 from "./stargaze/alloc/v1beta1/query";
import * as _249 from "./stargaze/alloc/v1beta1/tx";
import * as _250 from "./stargaze/cron/v1/cron";
import * as _251 from "./stargaze/cron/v1/genesis";
import * as _252 from "./stargaze/cron/v1/proposal";
import * as _253 from "./stargaze/cron/v1/query";
import * as _254 from "./stargaze/cron/v1/tx";
import * as _255 from "./stargaze/globalfee/v1/genesis";
import * as _256 from "./stargaze/globalfee/v1/globalfee";
import * as _257 from "./stargaze/globalfee/v1/proposal";
import * as _258 from "./stargaze/globalfee/v1/query";
import * as _259 from "./stargaze/globalfee/v1/tx";
import * as _260 from "./stargaze/mint/v1beta1/genesis";
import * as _261 from "./stargaze/mint/v1beta1/mint";
import * as _262 from "./stargaze/mint/v1beta1/query";
import * as _263 from "./stargaze/mint/v1beta1/tx";
import * as _467 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _468 from "./stargaze/cron/v1/tx.amino";
import * as _469 from "./stargaze/globalfee/v1/tx.amino";
import * as _470 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _471 from "./stargaze/cron/v1/tx.registry";
import * as _472 from "./stargaze/globalfee/v1/tx.registry";
import * as _473 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _474 from "./stargaze/cron/v1/query.rpc.Query";
import * as _475 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _476 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _477 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _478 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _479 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _521 from "./rpc.query";
import * as _522 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._246,
        ..._247,
        ..._248,
        ..._249,
        ..._467,
        ..._470,
        ..._473,
        ..._477
      };
    }
    export namespace cron {
      export const v1 = {
        ..._250,
        ..._251,
        ..._252,
        ..._253,
        ..._254,
        ..._468,
        ..._471,
        ..._474,
        ..._478
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._255,
        ..._256,
        ..._257,
        ..._258,
        ..._259,
        ..._469,
        ..._472,
        ..._475,
        ..._479
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._260,
        ..._261,
        ..._262,
        ..._263,
        ..._476
      };
    }
  }
  export const ClientFactory = {
    ..._521,
    ..._522
  };
}