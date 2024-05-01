import * as _287 from "./stargaze/alloc/v1beta1/genesis";
import * as _288 from "./stargaze/alloc/v1beta1/params";
import * as _289 from "./stargaze/alloc/v1beta1/query";
import * as _290 from "./stargaze/alloc/v1beta1/tx";
import * as _291 from "./stargaze/cron/v1/cron";
import * as _292 from "./stargaze/cron/v1/genesis";
import * as _293 from "./stargaze/cron/v1/proposal";
import * as _294 from "./stargaze/cron/v1/query";
import * as _295 from "./stargaze/cron/v1/tx";
import * as _296 from "./stargaze/globalfee/v1/genesis";
import * as _297 from "./stargaze/globalfee/v1/globalfee";
import * as _298 from "./stargaze/globalfee/v1/proposal";
import * as _299 from "./stargaze/globalfee/v1/query";
import * as _300 from "./stargaze/globalfee/v1/tx";
import * as _301 from "./stargaze/mint/v1beta1/genesis";
import * as _302 from "./stargaze/mint/v1beta1/mint";
import * as _303 from "./stargaze/mint/v1beta1/query";
import * as _304 from "./stargaze/mint/v1beta1/tx";
import * as _540 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _541 from "./stargaze/cron/v1/tx.amino";
import * as _542 from "./stargaze/globalfee/v1/tx.amino";
import * as _543 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _544 from "./stargaze/cron/v1/tx.registry";
import * as _545 from "./stargaze/globalfee/v1/tx.registry";
import * as _546 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _547 from "./stargaze/cron/v1/query.rpc.Query";
import * as _548 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _549 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _550 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _551 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _552 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _598 from "./rpc.query";
import * as _599 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._287,
        ..._288,
        ..._289,
        ..._290,
        ..._540,
        ..._543,
        ..._546,
        ..._550
      };
    }
    export namespace cron {
      export const v1 = {
        ..._291,
        ..._292,
        ..._293,
        ..._294,
        ..._295,
        ..._541,
        ..._544,
        ..._547,
        ..._551
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._296,
        ..._297,
        ..._298,
        ..._299,
        ..._300,
        ..._542,
        ..._545,
        ..._548,
        ..._552
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._301,
        ..._302,
        ..._303,
        ..._304,
        ..._549
      };
    }
  }
  export const ClientFactory = {
    ..._598,
    ..._599
  };
}