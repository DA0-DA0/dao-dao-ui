import * as _206 from "./onft/v1beta1/genesis";
import * as _207 from "./onft/v1beta1/onft";
import * as _208 from "./onft/v1beta1/params";
import * as _209 from "./onft/v1beta1/query";
import * as _210 from "./onft/v1beta1/tx";
import * as _519 from "./onft/v1beta1/tx.amino";
import * as _520 from "./onft/v1beta1/tx.registry";
import * as _521 from "./onft/v1beta1/query.rpc.Query";
import * as _522 from "./onft/v1beta1/tx.rpc.msg";
import * as _664 from "./rpc.query";
import * as _665 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._519,
      ..._520,
      ..._521,
      ..._522
    };
  }
  export const ClientFactory = {
    ..._664,
    ..._665
  };
}