import * as _103 from "./globalfee/v1beta1/genesis";
import * as _104 from "./globalfee/v1beta1/query";
import * as _105 from "./globalfee/v1beta1/tx";
import * as _417 from "./globalfee/v1beta1/tx.amino";
import * as _418 from "./globalfee/v1beta1/tx.registry";
import * as _419 from "./globalfee/v1beta1/query.rpc.Query";
import * as _420 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _598 from "./rpc.query";
import * as _599 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._103,
      ..._104,
      ..._105,
      ..._417,
      ..._418,
      ..._419,
      ..._420
    };
  }
  export const ClientFactory = {
    ..._598,
    ..._599
  };
}