import * as _11 from "./fantoken/v1beta1/tx";
import * as _522 from "./fantoken/v1beta1/tx.amino";
import * as _523 from "./fantoken/v1beta1/tx.registry";
import * as _524 from "./fantoken/v1beta1/query.rpc.Query";
import * as _525 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _847 from "./rpc.query";
import * as _848 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._522,
    ..._523,
    ..._525,
    v1beta1: {
      ..._524
    }
  };
  export const ClientFactory = {
    ..._847,
    ..._848
  };
}