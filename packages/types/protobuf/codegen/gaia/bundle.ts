import * as _102 from "./globalfee/v1beta1/genesis";
import * as _103 from "./globalfee/v1beta1/query";
import * as _104 from "./globalfee/v1beta1/tx";
import * as _408 from "./globalfee/v1beta1/tx.amino";
import * as _409 from "./globalfee/v1beta1/tx.registry";
import * as _410 from "./globalfee/v1beta1/query.rpc.Query";
import * as _411 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _584 from "./rpc.query";
import * as _585 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._102,
      ..._103,
      ..._104,
      ..._408,
      ..._409,
      ..._410,
      ..._411
    };
  }
  export const ClientFactory = {
    ..._584,
    ..._585
  };
}