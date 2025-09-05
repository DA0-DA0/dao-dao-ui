import * as _136 from "./globalfee/v1beta1/genesis";
import * as _137 from "./globalfee/v1beta1/query";
import * as _138 from "./globalfee/v1beta1/tx";
import * as _139 from "./metaprotocols/extensions";
import * as _626 from "./globalfee/v1beta1/tx.amino";
import * as _627 from "./globalfee/v1beta1/tx.registry";
import * as _628 from "./globalfee/v1beta1/query.rpc.Query";
import * as _629 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _896 from "./rpc.query";
import * as _897 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._626,
      ..._627,
      ..._628,
      ..._629
    };
  }
  export const metaprotocols = {
    ..._139
  };
  export const ClientFactory = {
    ..._896,
    ..._897
  };
}