import * as _132 from "./feemarket/v1/genesis";
import * as _133 from "./feemarket/v1/params";
import * as _134 from "./feemarket/v1/query";
import * as _135 from "./feemarket/v1/tx";
import * as _622 from "./feemarket/v1/tx.amino";
import * as _623 from "./feemarket/v1/tx.registry";
import * as _624 from "./feemarket/v1/query.rpc.Query";
import * as _625 from "./feemarket/v1/tx.rpc.msg";
import * as _894 from "./rpc.query";
import * as _895 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._622,
      ..._623,
      ..._624,
      ..._625
    };
  }
  export const ClientFactory = {
    ..._894,
    ..._895
  };
}