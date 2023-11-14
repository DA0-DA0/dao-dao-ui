import * as _65 from "./globalfee/v1beta1/genesis";
import * as _66 from "./globalfee/v1beta1/query";
import * as _67 from "./globalfee/v1beta1/tx";
import * as _236 from "./globalfee/v1beta1/tx.amino";
import * as _237 from "./globalfee/v1beta1/tx.registry";
import * as _238 from "./globalfee/v1beta1/query.rpc.Query";
import * as _239 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _321 from "./rpc.query";
import * as _322 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._236,
      ..._237,
      ..._238,
      ..._239
    };
  }
  export const ClientFactory = {
    ..._321,
    ..._322
  };
}