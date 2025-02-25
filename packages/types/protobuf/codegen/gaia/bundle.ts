import * as _109 from "./globalfee/v1beta1/genesis";
import * as _110 from "./globalfee/v1beta1/query";
import * as _111 from "./globalfee/v1beta1/tx";
import * as _112 from "./metaprotocols/extensions";
import * as _490 from "./globalfee/v1beta1/tx.amino";
import * as _491 from "./globalfee/v1beta1/tx.registry";
import * as _492 from "./globalfee/v1beta1/query.rpc.Query";
import * as _493 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _715 from "./rpc.query";
import * as _716 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._111,
      ..._490,
      ..._491,
      ..._492,
      ..._493
    };
  }
  export const metaprotocols = {
    ..._112
  };
  export const ClientFactory = {
    ..._715,
    ..._716
  };
}