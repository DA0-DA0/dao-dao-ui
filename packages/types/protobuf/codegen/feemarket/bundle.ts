import * as _123 from "./feemarket/v1/genesis";
import * as _124 from "./feemarket/v1/params";
import * as _125 from "./feemarket/v1/query";
import * as _126 from "./feemarket/v1/tx";
import * as _609 from "./feemarket/v1/tx.amino";
import * as _610 from "./feemarket/v1/tx.registry";
import * as _611 from "./feemarket/v1/query.rpc.Query";
import * as _612 from "./feemarket/v1/tx.rpc.msg";
import * as _881 from "./rpc.query";
import * as _882 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._609,
      ..._610,
      ..._611,
      ..._612
    };
  }
  export const ClientFactory = {
    ..._881,
    ..._882
  };
}