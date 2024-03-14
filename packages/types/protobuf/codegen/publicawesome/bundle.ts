import * as _243 from "./stargaze/alloc/v1beta1/genesis";
import * as _244 from "./stargaze/alloc/v1beta1/params";
import * as _245 from "./stargaze/alloc/v1beta1/query";
import * as _246 from "./stargaze/alloc/v1beta1/tx";
import * as _247 from "./stargaze/cron/v1/cron";
import * as _248 from "./stargaze/cron/v1/genesis";
import * as _249 from "./stargaze/cron/v1/proposal";
import * as _250 from "./stargaze/cron/v1/query";
import * as _251 from "./stargaze/cron/v1/tx";
import * as _252 from "./stargaze/globalfee/v1/genesis";
import * as _253 from "./stargaze/globalfee/v1/globalfee";
import * as _254 from "./stargaze/globalfee/v1/proposal";
import * as _255 from "./stargaze/globalfee/v1/query";
import * as _256 from "./stargaze/globalfee/v1/tx";
import * as _257 from "./stargaze/mint/v1beta1/genesis";
import * as _258 from "./stargaze/mint/v1beta1/mint";
import * as _259 from "./stargaze/mint/v1beta1/query";
import * as _260 from "./stargaze/mint/v1beta1/tx";
import * as _460 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _461 from "./stargaze/cron/v1/tx.amino";
import * as _462 from "./stargaze/globalfee/v1/tx.amino";
import * as _463 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _464 from "./stargaze/cron/v1/tx.registry";
import * as _465 from "./stargaze/globalfee/v1/tx.registry";
import * as _466 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _467 from "./stargaze/cron/v1/query.rpc.Query";
import * as _468 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _469 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _470 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _471 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _472 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _514 from "./rpc.query";
import * as _515 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._243,
        ..._244,
        ..._245,
        ..._246,
        ..._460,
        ..._463,
        ..._466,
        ..._470
      };
    }
    export namespace cron {
      export const v1 = {
        ..._247,
        ..._248,
        ..._249,
        ..._250,
        ..._251,
        ..._461,
        ..._464,
        ..._467,
        ..._471
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._252,
        ..._253,
        ..._254,
        ..._255,
        ..._256,
        ..._462,
        ..._465,
        ..._468,
        ..._472
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._257,
        ..._258,
        ..._259,
        ..._260,
        ..._469
      };
    }
  }
  export const ClientFactory = {
    ..._514,
    ..._515
  };
}