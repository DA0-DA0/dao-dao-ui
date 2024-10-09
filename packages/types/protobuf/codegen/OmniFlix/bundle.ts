import * as _214 from "./onft/v1beta1/genesis";
import * as _215 from "./onft/v1beta1/onft";
import * as _216 from "./onft/v1beta1/params";
import * as _217 from "./onft/v1beta1/query";
import * as _218 from "./onft/v1beta1/tx";
import * as _535 from "./onft/v1beta1/tx.amino";
import * as _536 from "./onft/v1beta1/tx.registry";
import * as _537 from "./onft/v1beta1/query.rpc.Query";
import * as _538 from "./onft/v1beta1/tx.rpc.msg";
import * as _683 from "./rpc.query";
import * as _684 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._535,
      ..._536,
      ..._537,
      ..._538
    };
  }
  export const ClientFactory = {
    ..._683,
    ..._684
  };
}