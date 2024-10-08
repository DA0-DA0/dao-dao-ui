import * as _108 from "./globalfee/v1beta1/genesis";
import * as _109 from "./globalfee/v1beta1/query";
import * as _110 from "./globalfee/v1beta1/tx";
import * as _111 from "./metaprotocols/extensions";
import * as _462 from "./globalfee/v1beta1/tx.amino";
import * as _463 from "./globalfee/v1beta1/tx.registry";
import * as _464 from "./globalfee/v1beta1/query.rpc.Query";
import * as _465 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _671 from "./rpc.query";
import * as _672 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._108,
      ..._109,
      ..._110,
      ..._462,
      ..._463,
      ..._464,
      ..._465
    };
  }
  export const metaprotocols = {
    ..._111
  };
  export const ClientFactory = {
    ..._671,
    ..._672
  };
}