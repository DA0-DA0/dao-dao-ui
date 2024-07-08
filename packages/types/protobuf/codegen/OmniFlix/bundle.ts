import * as _200 from "./onft/v1beta1/genesis";
import * as _201 from "./onft/v1beta1/onft";
import * as _202 from "./onft/v1beta1/params";
import * as _203 from "./onft/v1beta1/query";
import * as _204 from "./onft/v1beta1/tx";
import * as _509 from "./onft/v1beta1/tx.amino";
import * as _510 from "./onft/v1beta1/tx.registry";
import * as _511 from "./onft/v1beta1/query.rpc.Query";
import * as _512 from "./onft/v1beta1/tx.rpc.msg";
import * as _654 from "./rpc.query";
import * as _655 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._509,
      ..._510,
      ..._511,
      ..._512
    };
  }
  export const ClientFactory = {
    ..._654,
    ..._655
  };
}