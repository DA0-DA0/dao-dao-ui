import * as _103 from "./globalfee/v1beta1/genesis";
import * as _104 from "./globalfee/v1beta1/query";
import * as _105 from "./globalfee/v1beta1/tx";
import * as _431 from "./globalfee/v1beta1/tx.amino";
import * as _432 from "./globalfee/v1beta1/tx.registry";
import * as _433 from "./globalfee/v1beta1/query.rpc.Query";
import * as _434 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _625 from "./rpc.query";
import * as _626 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._103,
      ..._104,
      ..._105,
      ..._431,
      ..._432,
      ..._433,
      ..._434
    };
  }
  export const ClientFactory = {
    ..._625,
    ..._626
  };
}