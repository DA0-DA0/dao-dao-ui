import * as _107 from "./globalfee/v1beta1/genesis";
import * as _108 from "./globalfee/v1beta1/query";
import * as _109 from "./globalfee/v1beta1/tx";
import * as _444 from "./globalfee/v1beta1/tx.amino";
import * as _445 from "./globalfee/v1beta1/tx.registry";
import * as _446 from "./globalfee/v1beta1/query.rpc.Query";
import * as _447 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _644 from "./rpc.query";
import * as _645 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._107,
      ..._108,
      ..._109,
      ..._444,
      ..._445,
      ..._446,
      ..._447
    };
  }
  export const ClientFactory = {
    ..._644,
    ..._645
  };
}