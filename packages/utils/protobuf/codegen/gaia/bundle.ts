import * as _70 from "./globalfee/v1beta1/genesis";
import * as _71 from "./globalfee/v1beta1/query";
import * as _72 from "./globalfee/v1beta1/tx";
import * as _254 from "./globalfee/v1beta1/tx.amino";
import * as _255 from "./globalfee/v1beta1/tx.registry";
import * as _256 from "./globalfee/v1beta1/query.rpc.Query";
import * as _257 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _347 from "./rpc.query";
import * as _348 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._254,
      ..._255,
      ..._256,
      ..._257
    };
  }
  export const ClientFactory = {
    ..._347,
    ..._348
  };
}