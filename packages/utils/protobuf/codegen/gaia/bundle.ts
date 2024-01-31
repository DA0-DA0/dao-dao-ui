import * as _71 from "./globalfee/v1beta1/genesis";
import * as _72 from "./globalfee/v1beta1/query";
import * as _73 from "./globalfee/v1beta1/tx";
import * as _325 from "./globalfee/v1beta1/tx.amino";
import * as _326 from "./globalfee/v1beta1/tx.registry";
import * as _327 from "./globalfee/v1beta1/query.rpc.Query";
import * as _328 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _465 from "./rpc.query";
import * as _466 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._71,
      ..._72,
      ..._73,
      ..._325,
      ..._326,
      ..._327,
      ..._328
    };
  }
  export const ClientFactory = {
    ..._465,
    ..._466
  };
}