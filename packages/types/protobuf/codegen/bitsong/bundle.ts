import * as _11 from "./fantoken/v1beta1/tx";
import * as _538 from "./fantoken/v1beta1/tx.amino";
import * as _539 from "./fantoken/v1beta1/tx.registry";
import * as _540 from "./fantoken/v1beta1/query.rpc.Query";
import * as _541 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _871 from "./rpc.query";
import * as _872 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._538,
    ..._539,
    ..._541,
    v1beta1: {
      ..._540
    }
  };
  export const ClientFactory = {
    ..._871,
    ..._872
  };
}