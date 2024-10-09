import * as _11 from "./fantoken/v1beta1/tx";
import * as _395 from "./fantoken/v1beta1/tx.amino";
import * as _396 from "./fantoken/v1beta1/tx.registry";
import * as _397 from "./fantoken/v1beta1/query.rpc.Query";
import * as _398 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _661 from "./rpc.query";
import * as _662 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._395,
    ..._396,
    ..._398,
    v1beta1: {
      ..._397
    }
  };
  export const ClientFactory = {
    ..._661,
    ..._662
  };
}