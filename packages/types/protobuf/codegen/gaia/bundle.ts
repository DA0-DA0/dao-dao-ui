import * as _98 from "./globalfee/v1beta1/genesis";
import * as _99 from "./globalfee/v1beta1/query";
import * as _100 from "./globalfee/v1beta1/tx";
import * as _363 from "./globalfee/v1beta1/tx.amino";
import * as _364 from "./globalfee/v1beta1/tx.registry";
import * as _365 from "./globalfee/v1beta1/query.rpc.Query";
import * as _366 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _511 from "./rpc.query";
import * as _512 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._363,
      ..._364,
      ..._365,
      ..._366
    };
  }
  export const ClientFactory = {
    ..._511,
    ..._512
  };
}