import * as _102 from "./globalfee/v1beta1/genesis";
import * as _103 from "./globalfee/v1beta1/query";
import * as _104 from "./globalfee/v1beta1/tx";
import * as _387 from "./globalfee/v1beta1/tx.amino";
import * as _388 from "./globalfee/v1beta1/tx.registry";
import * as _389 from "./globalfee/v1beta1/query.rpc.Query";
import * as _390 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _547 from "./rpc.query";
import * as _548 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._102,
      ..._103,
      ..._104,
      ..._387,
      ..._388,
      ..._389,
      ..._390
    };
  }
  export const ClientFactory = {
    ..._547,
    ..._548
  };
}