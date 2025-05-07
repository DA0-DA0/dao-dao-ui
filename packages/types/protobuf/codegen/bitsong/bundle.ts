import * as _11 from "./fantoken/v1beta1/tx";
import * as _434 from "./fantoken/v1beta1/tx.amino";
import * as _435 from "./fantoken/v1beta1/tx.registry";
import * as _436 from "./fantoken/v1beta1/query.rpc.Query";
import * as _437 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _720 from "./rpc.query";
import * as _721 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._434,
    ..._435,
    ..._437,
    v1beta1: {
      ..._436
    }
  };
  export const ClientFactory = {
    ..._720,
    ..._721
  };
}