import * as _175 from "./stargaze/alloc/v1beta1/genesis";
import * as _176 from "./stargaze/alloc/v1beta1/params";
import * as _177 from "./stargaze/alloc/v1beta1/query";
import * as _178 from "./stargaze/alloc/v1beta1/tx";
import * as _179 from "./stargaze/cron/v1/cron";
import * as _180 from "./stargaze/cron/v1/genesis";
import * as _181 from "./stargaze/cron/v1/proposal";
import * as _182 from "./stargaze/cron/v1/query";
import * as _183 from "./stargaze/cron/v1/tx";
import * as _184 from "./stargaze/globalfee/v1/genesis";
import * as _185 from "./stargaze/globalfee/v1/globalfee";
import * as _186 from "./stargaze/globalfee/v1/proposal";
import * as _187 from "./stargaze/globalfee/v1/query";
import * as _188 from "./stargaze/globalfee/v1/tx";
import * as _189 from "./stargaze/mint/v1beta1/genesis";
import * as _190 from "./stargaze/mint/v1beta1/mint";
import * as _191 from "./stargaze/mint/v1beta1/query";
import * as _192 from "./stargaze/mint/v1beta1/tx";
import * as _330 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _331 from "./stargaze/cron/v1/tx.amino";
import * as _332 from "./stargaze/globalfee/v1/tx.amino";
import * as _333 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _334 from "./stargaze/cron/v1/tx.registry";
import * as _335 from "./stargaze/globalfee/v1/tx.registry";
import * as _336 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _337 from "./stargaze/cron/v1/query.rpc.Query";
import * as _338 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _339 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _340 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _341 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _342 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _355 from "./rpc.query";
import * as _356 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._175,
        ..._176,
        ..._177,
        ..._178,
        ..._330,
        ..._333,
        ..._336,
        ..._340
      };
    }
    export namespace cron {
      export const v1 = {
        ..._179,
        ..._180,
        ..._181,
        ..._182,
        ..._183,
        ..._331,
        ..._334,
        ..._337,
        ..._341
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._184,
        ..._185,
        ..._186,
        ..._187,
        ..._188,
        ..._332,
        ..._335,
        ..._338,
        ..._342
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._189,
        ..._190,
        ..._191,
        ..._192,
        ..._339
      };
    }
  }
  export const ClientFactory = {
    ..._355,
    ..._356
  };
}