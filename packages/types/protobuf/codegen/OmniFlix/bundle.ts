import * as _220 from "./onft/v1beta1/genesis";
import * as _221 from "./onft/v1beta1/onft";
import * as _222 from "./onft/v1beta1/params";
import * as _223 from "./onft/v1beta1/query";
import * as _224 from "./onft/v1beta1/tx";
import * as _567 from "./onft/v1beta1/tx.amino";
import * as _568 from "./onft/v1beta1/tx.registry";
import * as _569 from "./onft/v1beta1/query.rpc.Query";
import * as _570 from "./onft/v1beta1/tx.rpc.msg";
import * as _727 from "./rpc.query";
import * as _728 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._567,
      ..._568,
      ..._569,
      ..._570
    };
  }
  export const ClientFactory = {
    ..._727,
    ..._728
  };
}