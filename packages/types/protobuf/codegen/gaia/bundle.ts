import * as _108 from "./globalfee/v1beta1/genesis";
import * as _109 from "./globalfee/v1beta1/query";
import * as _110 from "./globalfee/v1beta1/tx";
import * as _461 from "./globalfee/v1beta1/tx.amino";
import * as _462 from "./globalfee/v1beta1/tx.registry";
import * as _463 from "./globalfee/v1beta1/query.rpc.Query";
import * as _464 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _670 from "./rpc.query";
import * as _671 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._108,
      ..._109,
      ..._110,
      ..._461,
      ..._462,
      ..._463,
      ..._464
    };
  }
  export const ClientFactory = {
    ..._670,
    ..._671
  };
}