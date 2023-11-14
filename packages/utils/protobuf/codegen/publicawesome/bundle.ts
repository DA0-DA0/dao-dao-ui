import * as _161 from "./stargaze/alloc/v1beta1/genesis";
import * as _162 from "./stargaze/alloc/v1beta1/params";
import * as _163 from "./stargaze/alloc/v1beta1/query";
import * as _164 from "./stargaze/alloc/v1beta1/tx";
import * as _165 from "./stargaze/cron/v1/cron";
import * as _166 from "./stargaze/cron/v1/genesis";
import * as _167 from "./stargaze/cron/v1/proposal";
import * as _168 from "./stargaze/cron/v1/query";
import * as _169 from "./stargaze/cron/v1/tx";
import * as _170 from "./stargaze/globalfee/v1/genesis";
import * as _171 from "./stargaze/globalfee/v1/globalfee";
import * as _172 from "./stargaze/globalfee/v1/proposal";
import * as _173 from "./stargaze/globalfee/v1/query";
import * as _174 from "./stargaze/globalfee/v1/tx";
import * as _175 from "./stargaze/mint/v1beta1/genesis";
import * as _176 from "./stargaze/mint/v1beta1/mint";
import * as _177 from "./stargaze/mint/v1beta1/query";
import * as _178 from "./stargaze/mint/v1beta1/tx";
import * as _304 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _305 from "./stargaze/cron/v1/tx.amino";
import * as _306 from "./stargaze/globalfee/v1/tx.amino";
import * as _307 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _308 from "./stargaze/cron/v1/tx.registry";
import * as _309 from "./stargaze/globalfee/v1/tx.registry";
import * as _310 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _311 from "./stargaze/cron/v1/query.rpc.Query";
import * as _312 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _313 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _314 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _315 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _316 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _329 from "./rpc.query";
import * as _330 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._161,
        ..._162,
        ..._163,
        ..._164,
        ..._304,
        ..._307,
        ..._310,
        ..._314
      };
    }
    export namespace cron {
      export const v1 = {
        ..._165,
        ..._166,
        ..._167,
        ..._168,
        ..._169,
        ..._305,
        ..._308,
        ..._311,
        ..._315
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._170,
        ..._171,
        ..._172,
        ..._173,
        ..._174,
        ..._306,
        ..._309,
        ..._312,
        ..._316
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._175,
        ..._176,
        ..._177,
        ..._178,
        ..._313
      };
    }
  }
  export const ClientFactory = {
    ..._329,
    ..._330
  };
}