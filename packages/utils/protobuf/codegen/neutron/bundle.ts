import * as _108 from "./feerefunder/fee";
import * as _109 from "./feerefunder/genesis";
import * as _110 from "./feerefunder/params";
import * as _111 from "./feerefunder/query";
import * as _112 from "./feerefunder/tx";
import * as _113 from "./transfer/v1/query";
import * as _114 from "./transfer/v1/tx";
import * as _292 from "./feerefunder/tx.amino";
import * as _293 from "./transfer/v1/tx.amino";
import * as _294 from "./feerefunder/tx.registry";
import * as _295 from "./transfer/v1/tx.registry";
import * as _296 from "./feerefunder/query.rpc.Query";
import * as _297 from "./transfer/v1/query.rpc.Query";
import * as _298 from "./feerefunder/tx.rpc.msg";
import * as _299 from "./transfer/v1/tx.rpc.msg";
import * as _372 from "./rpc.query";
import * as _373 from "./rpc.tx";
export namespace neutron {
  export const feerefunder = {
    ..._108,
    ..._109,
    ..._110,
    ..._111,
    ..._112,
    ..._292,
    ..._294,
    ..._296,
    ..._298
  };
  export const transfer = {
    ..._113,
    ..._114,
    ..._293,
    ..._295,
    ..._297,
    ..._299
  };
  export const ClientFactory = {
    ..._372,
    ..._373
  };
}