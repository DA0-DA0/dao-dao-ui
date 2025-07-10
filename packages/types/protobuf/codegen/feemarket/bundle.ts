import * as _123 from "./feemarket/v1/genesis";
import * as _124 from "./feemarket/v1/params";
import * as _125 from "./feemarket/v1/query";
import * as _126 from "./feemarket/v1/tx";
import * as _604 from "./feemarket/v1/tx.amino";
import * as _605 from "./feemarket/v1/tx.registry";
import * as _606 from "./feemarket/v1/query.rpc.Query";
import * as _607 from "./feemarket/v1/tx.rpc.msg";
import * as _872 from "./rpc.query";
import * as _873 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._604,
      ..._605,
      ..._606,
      ..._607
    };
  }
  export const ClientFactory = {
    ..._872,
    ..._873
  };
}