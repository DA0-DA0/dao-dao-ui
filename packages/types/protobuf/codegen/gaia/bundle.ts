import * as _98 from "./globalfee/v1beta1/genesis";
import * as _99 from "./globalfee/v1beta1/query";
import * as _100 from "./globalfee/v1beta1/tx";
import * as _379 from "./globalfee/v1beta1/tx.amino";
import * as _380 from "./globalfee/v1beta1/tx.registry";
import * as _381 from "./globalfee/v1beta1/query.rpc.Query";
import * as _382 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _539 from "./rpc.query";
import * as _540 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._379,
      ..._380,
      ..._381,
      ..._382
    };
  }
  export const ClientFactory = {
    ..._539,
    ..._540
  };
}