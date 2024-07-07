import * as _11 from "./fantoken/v1beta1/tx";
import * as _373 from "./fantoken/v1beta1/tx.amino";
import * as _374 from "./fantoken/v1beta1/tx.registry";
import * as _375 from "./fantoken/v1beta1/query.rpc.Query";
import * as _376 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _627 from "./rpc.query";
import * as _628 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._373,
    ..._374,
    ..._376,
    v1beta1: {
      ..._375
    }
  };
  export const ClientFactory = {
    ..._627,
    ..._628
  };
}