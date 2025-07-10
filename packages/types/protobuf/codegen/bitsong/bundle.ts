import * as _11 from "./fantoken/v1beta1/tx";
import * as _533 from "./fantoken/v1beta1/tx.amino";
import * as _534 from "./fantoken/v1beta1/tx.registry";
import * as _535 from "./fantoken/v1beta1/query.rpc.Query";
import * as _536 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _862 from "./rpc.query";
import * as _863 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._533,
    ..._534,
    ..._536,
    v1beta1: {
      ..._535
    }
  };
  export const ClientFactory = {
    ..._862,
    ..._863
  };
}