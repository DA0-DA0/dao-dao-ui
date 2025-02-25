import * as _11 from "./fantoken/v1beta1/tx";
import * as _423 from "./fantoken/v1beta1/tx.amino";
import * as _424 from "./fantoken/v1beta1/tx.registry";
import * as _425 from "./fantoken/v1beta1/query.rpc.Query";
import * as _426 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _705 from "./rpc.query";
import * as _706 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._423,
    ..._424,
    ..._426,
    v1beta1: {
      ..._425
    }
  };
  export const ClientFactory = {
    ..._705,
    ..._706
  };
}