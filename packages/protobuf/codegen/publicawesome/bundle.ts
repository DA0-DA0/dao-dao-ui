import * as _158 from "./stargaze/alloc/v1beta1/genesis";
import * as _159 from "./stargaze/alloc/v1beta1/params";
import * as _160 from "./stargaze/alloc/v1beta1/query";
import * as _161 from "./stargaze/alloc/v1beta1/tx";
import * as _162 from "./stargaze/cron/v1/cron";
import * as _163 from "./stargaze/cron/v1/genesis";
import * as _164 from "./stargaze/cron/v1/proposal";
import * as _165 from "./stargaze/cron/v1/query";
import * as _166 from "./stargaze/cron/v1/tx";
import * as _167 from "./stargaze/globalfee/v1/genesis";
import * as _168 from "./stargaze/globalfee/v1/globalfee";
import * as _169 from "./stargaze/globalfee/v1/proposal";
import * as _170 from "./stargaze/globalfee/v1/query";
import * as _171 from "./stargaze/globalfee/v1/tx";
import * as _172 from "./stargaze/mint/v1beta1/genesis";
import * as _173 from "./stargaze/mint/v1beta1/mint";
import * as _174 from "./stargaze/mint/v1beta1/query";
import * as _175 from "./stargaze/mint/v1beta1/tx";
import * as _297 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _298 from "./stargaze/cron/v1/tx.amino";
import * as _299 from "./stargaze/globalfee/v1/tx.amino";
import * as _300 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _301 from "./stargaze/cron/v1/tx.registry";
import * as _302 from "./stargaze/globalfee/v1/tx.registry";
import * as _303 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _304 from "./stargaze/cron/v1/query.rpc.Query";
import * as _305 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _306 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _307 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _308 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _309 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _320 from "./rpc.query";
import * as _321 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._158,
        ..._159,
        ..._160,
        ..._161,
        ..._297,
        ..._300,
        ..._303,
        ..._307
      };
    }
    export namespace cron {
      export const v1 = {
        ..._162,
        ..._163,
        ..._164,
        ..._165,
        ..._166,
        ..._298,
        ..._301,
        ..._304,
        ..._308
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._167,
        ..._168,
        ..._169,
        ..._170,
        ..._171,
        ..._299,
        ..._302,
        ..._305,
        ..._309
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._172,
        ..._173,
        ..._174,
        ..._175,
        ..._306
      };
    }
  }
  export const ClientFactory = {
    ..._320,
    ..._321
  };
}