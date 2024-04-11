import * as _248 from "./stargaze/alloc/v1beta1/genesis";
import * as _249 from "./stargaze/alloc/v1beta1/params";
import * as _250 from "./stargaze/alloc/v1beta1/query";
import * as _251 from "./stargaze/alloc/v1beta1/tx";
import * as _252 from "./stargaze/cron/v1/cron";
import * as _253 from "./stargaze/cron/v1/genesis";
import * as _254 from "./stargaze/cron/v1/proposal";
import * as _255 from "./stargaze/cron/v1/query";
import * as _256 from "./stargaze/cron/v1/tx";
import * as _257 from "./stargaze/globalfee/v1/genesis";
import * as _258 from "./stargaze/globalfee/v1/globalfee";
import * as _259 from "./stargaze/globalfee/v1/proposal";
import * as _260 from "./stargaze/globalfee/v1/query";
import * as _261 from "./stargaze/globalfee/v1/tx";
import * as _262 from "./stargaze/mint/v1beta1/genesis";
import * as _263 from "./stargaze/mint/v1beta1/mint";
import * as _264 from "./stargaze/mint/v1beta1/query";
import * as _265 from "./stargaze/mint/v1beta1/tx";
import * as _472 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _473 from "./stargaze/cron/v1/tx.amino";
import * as _474 from "./stargaze/globalfee/v1/tx.amino";
import * as _475 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _476 from "./stargaze/cron/v1/tx.registry";
import * as _477 from "./stargaze/globalfee/v1/tx.registry";
import * as _478 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _479 from "./stargaze/cron/v1/query.rpc.Query";
import * as _480 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _481 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _482 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _483 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _484 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _526 from "./rpc.query";
import * as _527 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._248,
        ..._249,
        ..._250,
        ..._251,
        ..._472,
        ..._475,
        ..._478,
        ..._482
      };
    }
    export namespace cron {
      export const v1 = {
        ..._252,
        ..._253,
        ..._254,
        ..._255,
        ..._256,
        ..._473,
        ..._476,
        ..._479,
        ..._483
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._257,
        ..._258,
        ..._259,
        ..._260,
        ..._261,
        ..._474,
        ..._477,
        ..._480,
        ..._484
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._262,
        ..._263,
        ..._264,
        ..._265,
        ..._481
      };
    }
  }
  export const ClientFactory = {
    ..._526,
    ..._527
  };
}