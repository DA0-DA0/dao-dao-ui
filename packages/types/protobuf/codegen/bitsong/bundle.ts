import * as _11 from "./fantoken/v1beta1/tx";
import * as _391 from "./fantoken/v1beta1/tx.amino";
import * as _392 from "./fantoken/v1beta1/tx.registry";
import * as _393 from "./fantoken/v1beta1/query.rpc.Query";
import * as _394 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _657 from "./rpc.query";
import * as _658 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._391,
    ..._392,
    ..._394,
    v1beta1: {
      ..._393
    }
  };
  export const ClientFactory = {
    ..._657,
    ..._658
  };
}