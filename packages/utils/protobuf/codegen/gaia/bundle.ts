import * as _70 from "./globalfee/v1beta1/genesis";
import * as _71 from "./globalfee/v1beta1/query";
import * as _72 from "./globalfee/v1beta1/tx";
import * as _264 from "./globalfee/v1beta1/tx.amino";
import * as _265 from "./globalfee/v1beta1/tx.registry";
import * as _266 from "./globalfee/v1beta1/query.rpc.Query";
import * as _267 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _366 from "./rpc.query";
import * as _367 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._264,
      ..._265,
      ..._266,
      ..._267
    };
  }
  export const ClientFactory = {
    ..._366,
    ..._367
  };
}