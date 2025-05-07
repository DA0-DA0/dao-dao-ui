import * as _231 from "./onft/v1beta1/genesis";
import * as _232 from "./onft/v1beta1/onft";
import * as _233 from "./onft/v1beta1/params";
import * as _234 from "./onft/v1beta1/query";
import * as _235 from "./onft/v1beta1/tx";
import * as _582 from "./onft/v1beta1/tx.amino";
import * as _583 from "./onft/v1beta1/tx.registry";
import * as _584 from "./onft/v1beta1/query.rpc.Query";
import * as _585 from "./onft/v1beta1/tx.rpc.msg";
import * as _744 from "./rpc.query";
import * as _745 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._582,
      ..._583,
      ..._584,
      ..._585
    };
  }
  export const ClientFactory = {
    ..._744,
    ..._745
  };
}