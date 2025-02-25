import * as _105 from "./feemarket/v1/genesis";
import * as _106 from "./feemarket/v1/params";
import * as _107 from "./feemarket/v1/query";
import * as _108 from "./feemarket/v1/tx";
import * as _486 from "./feemarket/v1/tx.amino";
import * as _487 from "./feemarket/v1/tx.registry";
import * as _488 from "./feemarket/v1/query.rpc.Query";
import * as _489 from "./feemarket/v1/tx.rpc.msg";
import * as _713 from "./rpc.query";
import * as _714 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._486,
      ..._487,
      ..._488,
      ..._489
    };
  }
  export const ClientFactory = {
    ..._713,
    ..._714
  };
}