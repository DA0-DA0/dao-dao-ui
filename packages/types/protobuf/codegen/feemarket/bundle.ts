import * as _132 from "./feemarket/v1/genesis";
import * as _133 from "./feemarket/v1/params";
import * as _134 from "./feemarket/v1/query";
import * as _135 from "./feemarket/v1/tx";
import * as _636 from "./feemarket/v1/tx.amino";
import * as _637 from "./feemarket/v1/tx.registry";
import * as _638 from "./feemarket/v1/query.rpc.Query";
import * as _639 from "./feemarket/v1/tx.rpc.msg";
import * as _912 from "./rpc.query";
import * as _913 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._636,
      ..._637,
      ..._638,
      ..._639
    };
  }
  export const ClientFactory = {
    ..._912,
    ..._913
  };
}