import * as _112 from "./feemarket/v1/genesis";
import * as _113 from "./feemarket/v1/params";
import * as _114 from "./feemarket/v1/query";
import * as _115 from "./feemarket/v1/tx";
import * as _501 from "./feemarket/v1/tx.amino";
import * as _502 from "./feemarket/v1/tx.registry";
import * as _503 from "./feemarket/v1/query.rpc.Query";
import * as _504 from "./feemarket/v1/tx.rpc.msg";
import * as _730 from "./rpc.query";
import * as _731 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._501,
      ..._502,
      ..._503,
      ..._504
    };
  }
  export const ClientFactory = {
    ..._730,
    ..._731
  };
}