import * as _103 from "./feemarket/v1/genesis";
import * as _104 from "./feemarket/v1/params";
import * as _105 from "./feemarket/v1/query";
import * as _106 from "./feemarket/v1/tx";
import * as _440 from "./feemarket/v1/tx.amino";
import * as _441 from "./feemarket/v1/tx.registry";
import * as _442 from "./feemarket/v1/query.rpc.Query";
import * as _443 from "./feemarket/v1/tx.rpc.msg";
import * as _642 from "./rpc.query";
import * as _643 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._440,
      ..._441,
      ..._442,
      ..._443
    };
  }
  export const ClientFactory = {
    ..._642,
    ..._643
  };
}