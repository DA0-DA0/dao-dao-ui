import * as _65 from "./globalfee/v1beta1/genesis";
import * as _66 from "./globalfee/v1beta1/query";
import * as _67 from "./globalfee/v1beta1/tx";
import * as _242 from "./globalfee/v1beta1/tx.amino";
import * as _243 from "./globalfee/v1beta1/tx.registry";
import * as _244 from "./globalfee/v1beta1/query.rpc.Query";
import * as _245 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _331 from "./rpc.query";
import * as _332 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._242,
      ..._243,
      ..._244,
      ..._245
    };
  }
  export const ClientFactory = {
    ..._331,
    ..._332
  };
}