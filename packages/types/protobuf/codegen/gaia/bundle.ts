import * as _127 from "./globalfee/v1beta1/genesis";
import * as _128 from "./globalfee/v1beta1/query";
import * as _129 from "./globalfee/v1beta1/tx";
import * as _130 from "./metaprotocols/extensions";
import * as _608 from "./globalfee/v1beta1/tx.amino";
import * as _609 from "./globalfee/v1beta1/tx.registry";
import * as _610 from "./globalfee/v1beta1/query.rpc.Query";
import * as _611 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _874 from "./rpc.query";
import * as _875 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._127,
      ..._128,
      ..._129,
      ..._608,
      ..._609,
      ..._610,
      ..._611
    };
  }
  export const metaprotocols = {
    ..._130
  };
  export const ClientFactory = {
    ..._874,
    ..._875
  };
}