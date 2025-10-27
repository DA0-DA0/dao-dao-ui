import * as _11 from "./fantoken/v1beta1/tx";
import * as _561 from "./fantoken/v1beta1/tx.amino";
import * as _562 from "./fantoken/v1beta1/tx.registry";
import * as _563 from "./fantoken/v1beta1/query.rpc.Query";
import * as _564 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _902 from "./rpc.query";
import * as _903 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._561,
    ..._562,
    ..._564,
    v1beta1: {
      ..._563
    }
  };
  export const ClientFactory = {
    ..._902,
    ..._903
  };
}