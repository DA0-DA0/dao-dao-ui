import * as _103 from "./feemarket/v1/genesis";
import * as _104 from "./feemarket/v1/params";
import * as _105 from "./feemarket/v1/query";
import * as _106 from "./feemarket/v1/tx";
import * as _436 from "./feemarket/v1/tx.amino";
import * as _437 from "./feemarket/v1/tx.registry";
import * as _438 from "./feemarket/v1/query.rpc.Query";
import * as _439 from "./feemarket/v1/tx.rpc.msg";
import * as _635 from "./rpc.query";
import * as _636 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._436,
      ..._437,
      ..._438,
      ..._439
    };
  }
  export const ClientFactory = {
    ..._635,
    ..._636
  };
}