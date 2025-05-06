import * as _11 from "./fantoken/v1beta1/tx";
import * as _427 from "./fantoken/v1beta1/tx.amino";
import * as _428 from "./fantoken/v1beta1/tx.registry";
import * as _429 from "./fantoken/v1beta1/query.rpc.Query";
import * as _430 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _709 from "./rpc.query";
import * as _710 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._427,
    ..._428,
    ..._430,
    v1beta1: {
      ..._429
    }
  };
  export const ClientFactory = {
    ..._709,
    ..._710
  };
}