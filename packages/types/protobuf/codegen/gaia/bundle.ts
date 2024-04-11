import * as _107 from "./globalfee/v1beta1/genesis";
import * as _108 from "./globalfee/v1beta1/query";
import * as _109 from "./globalfee/v1beta1/tx";
import * as _439 from "./globalfee/v1beta1/tx.amino";
import * as _440 from "./globalfee/v1beta1/tx.registry";
import * as _441 from "./globalfee/v1beta1/query.rpc.Query";
import * as _442 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _635 from "./rpc.query";
import * as _636 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._107,
      ..._108,
      ..._109,
      ..._439,
      ..._440,
      ..._441,
      ..._442
    };
  }
  export const ClientFactory = {
    ..._635,
    ..._636
  };
}