import * as _106 from "./globalfee/v1beta1/genesis";
import * as _107 from "./globalfee/v1beta1/query";
import * as _108 from "./globalfee/v1beta1/tx";
import * as _419 from "./globalfee/v1beta1/tx.amino";
import * as _420 from "./globalfee/v1beta1/tx.registry";
import * as _421 from "./globalfee/v1beta1/query.rpc.Query";
import * as _422 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _596 from "./rpc.query";
import * as _597 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._106,
      ..._107,
      ..._108,
      ..._419,
      ..._420,
      ..._421,
      ..._422
    };
  }
  export const ClientFactory = {
    ..._596,
    ..._597
  };
}