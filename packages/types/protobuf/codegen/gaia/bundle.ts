import * as _116 from "./globalfee/v1beta1/genesis";
import * as _117 from "./globalfee/v1beta1/query";
import * as _118 from "./globalfee/v1beta1/tx";
import * as _119 from "./metaprotocols/extensions";
import * as _593 from "./globalfee/v1beta1/tx.amino";
import * as _594 from "./globalfee/v1beta1/tx.registry";
import * as _595 from "./globalfee/v1beta1/query.rpc.Query";
import * as _596 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _859 from "./rpc.query";
import * as _860 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._116,
      ..._117,
      ..._118,
      ..._593,
      ..._594,
      ..._595,
      ..._596
    };
  }
  export const metaprotocols = {
    ..._119
  };
  export const ClientFactory = {
    ..._859,
    ..._860
  };
}