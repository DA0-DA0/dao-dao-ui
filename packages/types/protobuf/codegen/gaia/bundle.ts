import * as _105 from "./globalfee/v1beta1/genesis";
import * as _106 from "./globalfee/v1beta1/query";
import * as _107 from "./globalfee/v1beta1/tx";
import * as _415 from "./globalfee/v1beta1/tx.amino";
import * as _416 from "./globalfee/v1beta1/tx.registry";
import * as _417 from "./globalfee/v1beta1/query.rpc.Query";
import * as _418 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _591 from "./rpc.query";
import * as _592 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._415,
      ..._416,
      ..._417,
      ..._418
    };
  }
  export const ClientFactory = {
    ..._591,
    ..._592
  };
}