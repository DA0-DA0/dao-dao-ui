import * as _109 from "./globalfee/v1beta1/genesis";
import * as _110 from "./globalfee/v1beta1/query";
import * as _111 from "./globalfee/v1beta1/tx";
import * as _112 from "./metaprotocols/extensions";
import * as _494 from "./globalfee/v1beta1/tx.amino";
import * as _495 from "./globalfee/v1beta1/tx.registry";
import * as _496 from "./globalfee/v1beta1/query.rpc.Query";
import * as _497 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _719 from "./rpc.query";
import * as _720 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._111,
      ..._494,
      ..._495,
      ..._496,
      ..._497
    };
  }
  export const metaprotocols = {
    ..._112
  };
  export const ClientFactory = {
    ..._719,
    ..._720
  };
}