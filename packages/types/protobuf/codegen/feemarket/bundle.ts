import * as _104 from "./feemarket/v1/genesis";
import * as _105 from "./feemarket/v1/params";
import * as _106 from "./feemarket/v1/query";
import * as _107 from "./feemarket/v1/tx";
import * as _446 from "./feemarket/v1/tx.amino";
import * as _447 from "./feemarket/v1/tx.registry";
import * as _448 from "./feemarket/v1/query.rpc.Query";
import * as _449 from "./feemarket/v1/tx.rpc.msg";
import * as _652 from "./rpc.query";
import * as _653 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._446,
      ..._447,
      ..._448,
      ..._449
    };
  }
  export const ClientFactory = {
    ..._652,
    ..._653
  };
}