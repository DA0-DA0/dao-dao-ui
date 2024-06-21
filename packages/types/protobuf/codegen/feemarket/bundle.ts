import * as _103 from "./feemarket/v1/genesis";
import * as _104 from "./feemarket/v1/params";
import * as _105 from "./feemarket/v1/query";
import * as _106 from "./feemarket/v1/tx";
import * as _421 from "./feemarket/v1/tx.amino";
import * as _422 from "./feemarket/v1/tx.registry";
import * as _423 from "./feemarket/v1/query.rpc.Query";
import * as _424 from "./feemarket/v1/tx.rpc.msg";
import * as _606 from "./rpc.query";
import * as _607 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._421,
      ..._422,
      ..._423,
      ..._424
    };
  }
  export const ClientFactory = {
    ..._606,
    ..._607
  };
}