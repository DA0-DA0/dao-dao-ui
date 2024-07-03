import * as _108 from "./globalfee/v1beta1/genesis";
import * as _109 from "./globalfee/v1beta1/query";
import * as _110 from "./globalfee/v1beta1/tx";
import * as _458 from "./globalfee/v1beta1/tx.amino";
import * as _459 from "./globalfee/v1beta1/tx.registry";
import * as _460 from "./globalfee/v1beta1/query.rpc.Query";
import * as _461 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _667 from "./rpc.query";
import * as _668 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._108,
      ..._109,
      ..._110,
      ..._458,
      ..._459,
      ..._460,
      ..._461
    };
  }
  export const ClientFactory = {
    ..._667,
    ..._668
  };
}