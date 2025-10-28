import * as _11 from "./fantoken/v1beta1/tx";
import * as _547 from "./fantoken/v1beta1/tx.amino";
import * as _548 from "./fantoken/v1beta1/tx.registry";
import * as _549 from "./fantoken/v1beta1/query.rpc.Query";
import * as _550 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _884 from "./rpc.query";
import * as _885 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._547,
    ..._548,
    ..._550,
    v1beta1: {
      ..._549
    }
  };
  export const ClientFactory = {
    ..._884,
    ..._885
  };
}