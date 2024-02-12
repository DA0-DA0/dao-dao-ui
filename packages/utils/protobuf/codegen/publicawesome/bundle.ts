import * as _226 from "./stargaze/alloc/v1beta1/genesis";
import * as _227 from "./stargaze/alloc/v1beta1/params";
import * as _228 from "./stargaze/alloc/v1beta1/query";
import * as _229 from "./stargaze/alloc/v1beta1/tx";
import * as _230 from "./stargaze/cron/v1/cron";
import * as _231 from "./stargaze/cron/v1/genesis";
import * as _232 from "./stargaze/cron/v1/proposal";
import * as _233 from "./stargaze/cron/v1/query";
import * as _234 from "./stargaze/cron/v1/tx";
import * as _235 from "./stargaze/globalfee/v1/genesis";
import * as _236 from "./stargaze/globalfee/v1/globalfee";
import * as _237 from "./stargaze/globalfee/v1/proposal";
import * as _238 from "./stargaze/globalfee/v1/query";
import * as _239 from "./stargaze/globalfee/v1/tx";
import * as _240 from "./stargaze/mint/v1beta1/genesis";
import * as _241 from "./stargaze/mint/v1beta1/mint";
import * as _242 from "./stargaze/mint/v1beta1/query";
import * as _243 from "./stargaze/mint/v1beta1/tx";
import * as _439 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _440 from "./stargaze/cron/v1/tx.amino";
import * as _441 from "./stargaze/globalfee/v1/tx.amino";
import * as _442 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _443 from "./stargaze/cron/v1/tx.registry";
import * as _444 from "./stargaze/globalfee/v1/tx.registry";
import * as _445 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _446 from "./stargaze/cron/v1/query.rpc.Query";
import * as _447 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _448 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _449 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _450 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _451 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _491 from "./rpc.query";
import * as _492 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._226,
        ..._227,
        ..._228,
        ..._229,
        ..._439,
        ..._442,
        ..._445,
        ..._449
      };
    }
    export namespace cron {
      export const v1 = {
        ..._230,
        ..._231,
        ..._232,
        ..._233,
        ..._234,
        ..._440,
        ..._443,
        ..._446,
        ..._450
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._235,
        ..._236,
        ..._237,
        ..._238,
        ..._239,
        ..._441,
        ..._444,
        ..._447,
        ..._451
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._240,
        ..._241,
        ..._242,
        ..._243,
        ..._448
      };
    }
  }
  export const ClientFactory = {
    ..._491,
    ..._492
  };
}