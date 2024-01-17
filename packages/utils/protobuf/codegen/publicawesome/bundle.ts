import * as _182 from "./stargaze/alloc/v1beta1/genesis";
import * as _183 from "./stargaze/alloc/v1beta1/params";
import * as _184 from "./stargaze/alloc/v1beta1/query";
import * as _185 from "./stargaze/alloc/v1beta1/tx";
import * as _186 from "./stargaze/cron/v1/cron";
import * as _187 from "./stargaze/cron/v1/genesis";
import * as _188 from "./stargaze/cron/v1/proposal";
import * as _189 from "./stargaze/cron/v1/query";
import * as _190 from "./stargaze/cron/v1/tx";
import * as _191 from "./stargaze/globalfee/v1/genesis";
import * as _192 from "./stargaze/globalfee/v1/globalfee";
import * as _193 from "./stargaze/globalfee/v1/proposal";
import * as _194 from "./stargaze/globalfee/v1/query";
import * as _195 from "./stargaze/globalfee/v1/tx";
import * as _196 from "./stargaze/mint/v1beta1/genesis";
import * as _197 from "./stargaze/mint/v1beta1/mint";
import * as _198 from "./stargaze/mint/v1beta1/query";
import * as _199 from "./stargaze/mint/v1beta1/tx";
import * as _348 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _349 from "./stargaze/cron/v1/tx.amino";
import * as _350 from "./stargaze/globalfee/v1/tx.amino";
import * as _351 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _352 from "./stargaze/cron/v1/tx.registry";
import * as _353 from "./stargaze/globalfee/v1/tx.registry";
import * as _354 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _355 from "./stargaze/cron/v1/query.rpc.Query";
import * as _356 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _357 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _358 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _359 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _360 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _376 from "./rpc.query";
import * as _377 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._182,
        ..._183,
        ..._184,
        ..._185,
        ..._348,
        ..._351,
        ..._354,
        ..._358
      };
    }
    export namespace cron {
      export const v1 = {
        ..._186,
        ..._187,
        ..._188,
        ..._189,
        ..._190,
        ..._349,
        ..._352,
        ..._355,
        ..._359
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._191,
        ..._192,
        ..._193,
        ..._194,
        ..._195,
        ..._350,
        ..._353,
        ..._356,
        ..._360
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._196,
        ..._197,
        ..._198,
        ..._199,
        ..._357
      };
    }
  }
  export const ClientFactory = {
    ..._376,
    ..._377
  };
}