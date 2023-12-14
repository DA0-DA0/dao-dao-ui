import * as _65 from "./globalfee/v1beta1/genesis";
import * as _66 from "./globalfee/v1beta1/query";
import * as _67 from "./globalfee/v1beta1/tx";
import * as _245 from "./globalfee/v1beta1/tx.amino";
import * as _246 from "./globalfee/v1beta1/tx.registry";
import * as _247 from "./globalfee/v1beta1/query.rpc.Query";
import * as _248 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _338 from "./rpc.query";
import * as _339 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._245,
      ..._246,
      ..._247,
      ..._248
    };
  }
  export const ClientFactory = {
    ..._338,
    ..._339
  };
}