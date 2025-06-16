import * as _112 from "./feemarket/v1/genesis";
import * as _113 from "./feemarket/v1/params";
import * as _114 from "./feemarket/v1/query";
import * as _115 from "./feemarket/v1/tx";
import * as _589 from "./feemarket/v1/tx.amino";
import * as _590 from "./feemarket/v1/tx.registry";
import * as _591 from "./feemarket/v1/query.rpc.Query";
import * as _592 from "./feemarket/v1/tx.rpc.msg";
import * as _857 from "./rpc.query";
import * as _858 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._589,
      ..._590,
      ..._591,
      ..._592
    };
  }
  export const ClientFactory = {
    ..._857,
    ..._858
  };
}