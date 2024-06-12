import * as _106 from "./globalfee/v1beta1/genesis";
import * as _107 from "./globalfee/v1beta1/query";
import * as _108 from "./globalfee/v1beta1/tx";
import * as _424 from "./globalfee/v1beta1/tx.amino";
import * as _425 from "./globalfee/v1beta1/tx.registry";
import * as _426 from "./globalfee/v1beta1/query.rpc.Query";
import * as _427 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _605 from "./rpc.query";
import * as _606 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._106,
      ..._107,
      ..._108,
      ..._424,
      ..._425,
      ..._426,
      ..._427
    };
  }
  export const ClientFactory = {
    ..._605,
    ..._606
  };
}