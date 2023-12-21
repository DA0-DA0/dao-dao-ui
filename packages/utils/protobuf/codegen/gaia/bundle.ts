import * as _70 from "./globalfee/v1beta1/genesis";
import * as _71 from "./globalfee/v1beta1/query";
import * as _72 from "./globalfee/v1beta1/tx";
import * as _257 from "./globalfee/v1beta1/tx.amino";
import * as _258 from "./globalfee/v1beta1/tx.registry";
import * as _259 from "./globalfee/v1beta1/query.rpc.Query";
import * as _260 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _351 from "./rpc.query";
import * as _352 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._257,
      ..._258,
      ..._259,
      ..._260
    };
  }
  export const ClientFactory = {
    ..._351,
    ..._352
  };
}