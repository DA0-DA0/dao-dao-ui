import * as _104 from "./feemarket/v1/genesis";
import * as _105 from "./feemarket/v1/params";
import * as _106 from "./feemarket/v1/query";
import * as _107 from "./feemarket/v1/tx";
import * as _454 from "./feemarket/v1/tx.amino";
import * as _455 from "./feemarket/v1/tx.registry";
import * as _456 from "./feemarket/v1/query.rpc.Query";
import * as _457 from "./feemarket/v1/tx.rpc.msg";
import * as _665 from "./rpc.query";
import * as _666 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._454,
      ..._455,
      ..._456,
      ..._457
    };
  }
  export const ClientFactory = {
    ..._665,
    ..._666
  };
}