import * as _107 from "./globalfee/v1beta1/genesis";
import * as _108 from "./globalfee/v1beta1/query";
import * as _109 from "./globalfee/v1beta1/tx";
import * as _425 from "./globalfee/v1beta1/tx.amino";
import * as _426 from "./globalfee/v1beta1/tx.registry";
import * as _427 from "./globalfee/v1beta1/query.rpc.Query";
import * as _428 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _608 from "./rpc.query";
import * as _609 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._107,
      ..._108,
      ..._109,
      ..._425,
      ..._426,
      ..._427,
      ..._428
    };
  }
  export const ClientFactory = {
    ..._608,
    ..._609
  };
}