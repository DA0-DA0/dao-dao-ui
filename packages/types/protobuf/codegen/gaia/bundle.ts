import * as _108 from "./globalfee/v1beta1/genesis";
import * as _109 from "./globalfee/v1beta1/query";
import * as _110 from "./globalfee/v1beta1/tx";
import * as _450 from "./globalfee/v1beta1/tx.amino";
import * as _451 from "./globalfee/v1beta1/tx.registry";
import * as _452 from "./globalfee/v1beta1/query.rpc.Query";
import * as _453 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _654 from "./rpc.query";
import * as _655 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._108,
      ..._109,
      ..._110,
      ..._450,
      ..._451,
      ..._452,
      ..._453
    };
  }
  export const ClientFactory = {
    ..._654,
    ..._655
  };
}