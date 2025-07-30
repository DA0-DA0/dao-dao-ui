import * as _127 from "./globalfee/v1beta1/genesis";
import * as _128 from "./globalfee/v1beta1/query";
import * as _129 from "./globalfee/v1beta1/tx";
import * as _130 from "./metaprotocols/extensions";
import * as _613 from "./globalfee/v1beta1/tx.amino";
import * as _614 from "./globalfee/v1beta1/tx.registry";
import * as _615 from "./globalfee/v1beta1/query.rpc.Query";
import * as _616 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _883 from "./rpc.query";
import * as _884 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._127,
      ..._128,
      ..._129,
      ..._613,
      ..._614,
      ..._615,
      ..._616
    };
  }
  export const metaprotocols = {
    ..._130
  };
  export const ClientFactory = {
    ..._883,
    ..._884
  };
}