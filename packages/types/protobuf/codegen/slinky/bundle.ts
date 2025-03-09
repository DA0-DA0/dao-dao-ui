import * as _388 from "./marketmap/v1/genesis";
import * as _389 from "./marketmap/v1/market";
import * as _390 from "./marketmap/v1/params";
import * as _391 from "./marketmap/v1/query";
import * as _392 from "./marketmap/v1/tx";
import * as _393 from "./oracle/v1/genesis";
import * as _394 from "./oracle/v1/query";
import * as _395 from "./oracle/v1/tx";
import * as _396 from "./types/v1/currency_pair";
import * as _694 from "./marketmap/v1/tx.amino";
import * as _695 from "./oracle/v1/tx.amino";
import * as _696 from "./marketmap/v1/tx.registry";
import * as _697 from "./oracle/v1/tx.registry";
import * as _698 from "./marketmap/v1/query.rpc.Query";
import * as _699 from "./oracle/v1/query.rpc.Query";
import * as _700 from "./marketmap/v1/tx.rpc.msg";
import * as _701 from "./oracle/v1/tx.rpc.msg";
import * as _743 from "./rpc.query";
import * as _744 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._388,
      ..._389,
      ..._390,
      ..._391,
      ..._392,
      ..._694,
      ..._696,
      ..._698,
      ..._700
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._393,
      ..._394,
      ..._395,
      ..._695,
      ..._697,
      ..._699,
      ..._701
    };
  }
  export namespace types {
    export const v1 = {
      ..._396
    };
  }
  export const ClientFactory = {
    ..._743,
    ..._744
  };
}