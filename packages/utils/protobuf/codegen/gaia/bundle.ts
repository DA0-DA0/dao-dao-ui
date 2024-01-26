import * as _70 from "./globalfee/v1beta1/genesis";
import * as _71 from "./globalfee/v1beta1/query";
import * as _72 from "./globalfee/v1beta1/tx";
import * as _295 from "./globalfee/v1beta1/tx.amino";
import * as _296 from "./globalfee/v1beta1/tx.registry";
import * as _297 from "./globalfee/v1beta1/query.rpc.Query";
import * as _298 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _413 from "./rpc.query";
import * as _414 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._295,
      ..._296,
      ..._297,
      ..._298
    };
  }
  export const ClientFactory = {
    ..._413,
    ..._414
  };
}