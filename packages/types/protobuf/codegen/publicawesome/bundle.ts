import * as _291 from "./stargaze/alloc/v1beta1/genesis";
import * as _292 from "./stargaze/alloc/v1beta1/params";
import * as _293 from "./stargaze/alloc/v1beta1/query";
import * as _294 from "./stargaze/alloc/v1beta1/tx";
import * as _295 from "./stargaze/cron/v1/cron";
import * as _296 from "./stargaze/cron/v1/genesis";
import * as _297 from "./stargaze/cron/v1/proposal";
import * as _298 from "./stargaze/cron/v1/query";
import * as _299 from "./stargaze/cron/v1/tx";
import * as _300 from "./stargaze/globalfee/v1/genesis";
import * as _301 from "./stargaze/globalfee/v1/globalfee";
import * as _302 from "./stargaze/globalfee/v1/proposal";
import * as _303 from "./stargaze/globalfee/v1/query";
import * as _304 from "./stargaze/globalfee/v1/tx";
import * as _305 from "./stargaze/mint/v1beta1/genesis";
import * as _306 from "./stargaze/mint/v1beta1/mint";
import * as _307 from "./stargaze/mint/v1beta1/query";
import * as _308 from "./stargaze/mint/v1beta1/tx";
import * as _551 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _552 from "./stargaze/cron/v1/tx.amino";
import * as _553 from "./stargaze/globalfee/v1/tx.amino";
import * as _554 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _555 from "./stargaze/cron/v1/tx.registry";
import * as _556 from "./stargaze/globalfee/v1/tx.registry";
import * as _557 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _558 from "./stargaze/cron/v1/query.rpc.Query";
import * as _559 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _560 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _561 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _562 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _563 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _610 from "./rpc.query";
import * as _611 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._291,
        ..._292,
        ..._293,
        ..._294,
        ..._551,
        ..._554,
        ..._557,
        ..._561
      };
    }
    export namespace cron {
      export const v1 = {
        ..._295,
        ..._296,
        ..._297,
        ..._298,
        ..._299,
        ..._552,
        ..._555,
        ..._558,
        ..._562
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._300,
        ..._301,
        ..._302,
        ..._303,
        ..._304,
        ..._553,
        ..._556,
        ..._559,
        ..._563
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._305,
        ..._306,
        ..._307,
        ..._308,
        ..._560
      };
    }
  }
  export const ClientFactory = {
    ..._610,
    ..._611
  };
}