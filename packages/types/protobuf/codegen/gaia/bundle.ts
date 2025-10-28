import * as _136 from "./globalfee/v1beta1/genesis";
import * as _137 from "./globalfee/v1beta1/query";
import * as _138 from "./globalfee/v1beta1/tx";
import * as _139 from "./metaprotocols/extensions";
import * as _640 from "./globalfee/v1beta1/tx.amino";
import * as _641 from "./globalfee/v1beta1/tx.registry";
import * as _642 from "./globalfee/v1beta1/query.rpc.Query";
import * as _643 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _914 from "./rpc.query";
import * as _915 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._640,
      ..._641,
      ..._642,
      ..._643
    };
  }
  export const metaprotocols = {
    ..._139
  };
  export const ClientFactory = {
    ..._914,
    ..._915
  };
}