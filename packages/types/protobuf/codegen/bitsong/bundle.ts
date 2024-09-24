import * as _11 from "./fantoken/v1beta1/tx";
import * as _394 from "./fantoken/v1beta1/tx.amino";
import * as _395 from "./fantoken/v1beta1/tx.registry";
import * as _396 from "./fantoken/v1beta1/query.rpc.Query";
import * as _397 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _660 from "./rpc.query";
import * as _661 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._394,
    ..._395,
    ..._397,
    v1beta1: {
      ..._396
    }
  };
  export const ClientFactory = {
    ..._660,
    ..._661
  };
}