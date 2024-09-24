import * as _104 from "./feemarket/v1/genesis";
import * as _105 from "./feemarket/v1/params";
import * as _106 from "./feemarket/v1/query";
import * as _107 from "./feemarket/v1/tx";
import * as _457 from "./feemarket/v1/tx.amino";
import * as _458 from "./feemarket/v1/tx.registry";
import * as _459 from "./feemarket/v1/query.rpc.Query";
import * as _460 from "./feemarket/v1/tx.rpc.msg";
import * as _668 from "./rpc.query";
import * as _669 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._457,
      ..._458,
      ..._459,
      ..._460
    };
  }
  export const ClientFactory = {
    ..._668,
    ..._669
  };
}