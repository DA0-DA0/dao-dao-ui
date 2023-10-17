import * as _167 from "./stargaze/alloc/v1beta1/genesis";
import * as _168 from "./stargaze/alloc/v1beta1/params";
import * as _169 from "./stargaze/alloc/v1beta1/query";
import * as _170 from "./stargaze/alloc/v1beta1/tx";
import * as _171 from "./stargaze/cron/v1/cron";
import * as _172 from "./stargaze/cron/v1/genesis";
import * as _173 from "./stargaze/cron/v1/proposal";
import * as _174 from "./stargaze/cron/v1/query";
import * as _175 from "./stargaze/cron/v1/tx";
import * as _176 from "./stargaze/globalfee/v1/genesis";
import * as _177 from "./stargaze/globalfee/v1/globalfee";
import * as _178 from "./stargaze/globalfee/v1/proposal";
import * as _179 from "./stargaze/globalfee/v1/query";
import * as _180 from "./stargaze/globalfee/v1/tx";
import * as _181 from "./stargaze/mint/v1beta1/genesis";
import * as _182 from "./stargaze/mint/v1beta1/mint";
import * as _183 from "./stargaze/mint/v1beta1/query";
import * as _184 from "./stargaze/mint/v1beta1/tx";
import * as _314 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _315 from "./stargaze/cron/v1/tx.amino";
import * as _316 from "./stargaze/globalfee/v1/tx.amino";
import * as _317 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _318 from "./stargaze/cron/v1/tx.registry";
import * as _319 from "./stargaze/globalfee/v1/tx.registry";
import * as _320 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _321 from "./stargaze/cron/v1/query.rpc.Query";
import * as _322 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _323 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _324 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _325 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _326 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _339 from "./rpc.query";
import * as _340 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._167,
        ..._168,
        ..._169,
        ..._170,
        ..._314,
        ..._317,
        ..._320,
        ..._324
      };
    }
    export namespace cron {
      export const v1 = {
        ..._171,
        ..._172,
        ..._173,
        ..._174,
        ..._175,
        ..._315,
        ..._318,
        ..._321,
        ..._325
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._176,
        ..._177,
        ..._178,
        ..._179,
        ..._180,
        ..._316,
        ..._319,
        ..._322,
        ..._326
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._181,
        ..._182,
        ..._183,
        ..._184,
        ..._323
      };
    }
  }
  export const ClientFactory = {
    ..._339,
    ..._340
  };
}