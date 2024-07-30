import * as _213 from "./onft/v1beta1/genesis";
import * as _214 from "./onft/v1beta1/onft";
import * as _215 from "./onft/v1beta1/params";
import * as _216 from "./onft/v1beta1/query";
import * as _217 from "./onft/v1beta1/tx";
import * as _531 from "./onft/v1beta1/tx.amino";
import * as _532 from "./onft/v1beta1/tx.registry";
import * as _533 from "./onft/v1beta1/query.rpc.Query";
import * as _534 from "./onft/v1beta1/tx.rpc.msg";
import * as _679 from "./rpc.query";
import * as _680 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._531,
      ..._532,
      ..._533,
      ..._534
    };
  }
  export const ClientFactory = {
    ..._679,
    ..._680
  };
}