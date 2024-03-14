import * as _98 from "./globalfee/v1beta1/genesis";
import * as _99 from "./globalfee/v1beta1/query";
import * as _100 from "./globalfee/v1beta1/tx";
import * as _360 from "./globalfee/v1beta1/tx.amino";
import * as _361 from "./globalfee/v1beta1/tx.registry";
import * as _362 from "./globalfee/v1beta1/query.rpc.Query";
import * as _363 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _504 from "./rpc.query";
import * as _505 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._360,
      ..._361,
      ..._362,
      ..._363
    };
  }
  export const ClientFactory = {
    ..._504,
    ..._505
  };
}