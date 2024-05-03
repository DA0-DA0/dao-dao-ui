import * as _290 from "./stargaze/alloc/v1beta1/genesis";
import * as _291 from "./stargaze/alloc/v1beta1/params";
import * as _292 from "./stargaze/alloc/v1beta1/query";
import * as _293 from "./stargaze/alloc/v1beta1/tx";
import * as _294 from "./stargaze/cron/v1/cron";
import * as _295 from "./stargaze/cron/v1/genesis";
import * as _296 from "./stargaze/cron/v1/proposal";
import * as _297 from "./stargaze/cron/v1/query";
import * as _298 from "./stargaze/cron/v1/tx";
import * as _299 from "./stargaze/globalfee/v1/genesis";
import * as _300 from "./stargaze/globalfee/v1/globalfee";
import * as _301 from "./stargaze/globalfee/v1/proposal";
import * as _302 from "./stargaze/globalfee/v1/query";
import * as _303 from "./stargaze/globalfee/v1/tx";
import * as _304 from "./stargaze/mint/v1beta1/genesis";
import * as _305 from "./stargaze/mint/v1beta1/mint";
import * as _306 from "./stargaze/mint/v1beta1/query";
import * as _307 from "./stargaze/mint/v1beta1/tx";
import * as _547 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _548 from "./stargaze/cron/v1/tx.amino";
import * as _549 from "./stargaze/globalfee/v1/tx.amino";
import * as _550 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _551 from "./stargaze/cron/v1/tx.registry";
import * as _552 from "./stargaze/globalfee/v1/tx.registry";
import * as _553 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _554 from "./stargaze/cron/v1/query.rpc.Query";
import * as _555 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _556 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _557 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _558 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _559 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _605 from "./rpc.query";
import * as _606 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._290,
        ..._291,
        ..._292,
        ..._293,
        ..._547,
        ..._550,
        ..._553,
        ..._557
      };
    }
    export namespace cron {
      export const v1 = {
        ..._294,
        ..._295,
        ..._296,
        ..._297,
        ..._298,
        ..._548,
        ..._551,
        ..._554,
        ..._558
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._299,
        ..._300,
        ..._301,
        ..._302,
        ..._303,
        ..._549,
        ..._552,
        ..._555,
        ..._559
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._304,
        ..._305,
        ..._306,
        ..._307,
        ..._556
      };
    }
  }
  export const ClientFactory = {
    ..._605,
    ..._606
  };
}