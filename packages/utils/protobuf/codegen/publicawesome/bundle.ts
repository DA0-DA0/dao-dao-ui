import * as _170 from "./stargaze/alloc/v1beta1/genesis";
import * as _171 from "./stargaze/alloc/v1beta1/params";
import * as _172 from "./stargaze/alloc/v1beta1/query";
import * as _173 from "./stargaze/alloc/v1beta1/tx";
import * as _174 from "./stargaze/cron/v1/cron";
import * as _175 from "./stargaze/cron/v1/genesis";
import * as _176 from "./stargaze/cron/v1/proposal";
import * as _177 from "./stargaze/cron/v1/query";
import * as _178 from "./stargaze/cron/v1/tx";
import * as _179 from "./stargaze/globalfee/v1/genesis";
import * as _180 from "./stargaze/globalfee/v1/globalfee";
import * as _181 from "./stargaze/globalfee/v1/proposal";
import * as _182 from "./stargaze/globalfee/v1/query";
import * as _183 from "./stargaze/globalfee/v1/tx";
import * as _184 from "./stargaze/mint/v1beta1/genesis";
import * as _185 from "./stargaze/mint/v1beta1/mint";
import * as _186 from "./stargaze/mint/v1beta1/query";
import * as _187 from "./stargaze/mint/v1beta1/tx";
import * as _321 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _322 from "./stargaze/cron/v1/tx.amino";
import * as _323 from "./stargaze/globalfee/v1/tx.amino";
import * as _324 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _325 from "./stargaze/cron/v1/tx.registry";
import * as _326 from "./stargaze/globalfee/v1/tx.registry";
import * as _327 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _328 from "./stargaze/cron/v1/query.rpc.Query";
import * as _329 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _330 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _331 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _332 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _333 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _346 from "./rpc.query";
import * as _347 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._170,
        ..._171,
        ..._172,
        ..._173,
        ..._321,
        ..._324,
        ..._327,
        ..._331
      };
    }
    export namespace cron {
      export const v1 = {
        ..._174,
        ..._175,
        ..._176,
        ..._177,
        ..._178,
        ..._322,
        ..._325,
        ..._328,
        ..._332
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._179,
        ..._180,
        ..._181,
        ..._182,
        ..._183,
        ..._323,
        ..._326,
        ..._329,
        ..._333
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._184,
        ..._185,
        ..._186,
        ..._187,
        ..._330
      };
    }
  }
  export const ClientFactory = {
    ..._346,
    ..._347
  };
}