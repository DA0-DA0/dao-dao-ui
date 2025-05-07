import * as _395 from "./marketmap/v1/genesis";
import * as _396 from "./marketmap/v1/market";
import * as _397 from "./marketmap/v1/params";
import * as _398 from "./marketmap/v1/query";
import * as _399 from "./marketmap/v1/tx";
import * as _400 from "./oracle/v1/genesis";
import * as _401 from "./oracle/v1/query";
import * as _402 from "./oracle/v1/tx";
import * as _403 from "./types/v1/currency_pair";
import * as _705 from "./marketmap/v1/tx.amino";
import * as _706 from "./oracle/v1/tx.amino";
import * as _707 from "./marketmap/v1/tx.registry";
import * as _708 from "./oracle/v1/tx.registry";
import * as _709 from "./marketmap/v1/query.rpc.Query";
import * as _710 from "./oracle/v1/query.rpc.Query";
import * as _711 from "./marketmap/v1/tx.rpc.msg";
import * as _712 from "./oracle/v1/tx.rpc.msg";
import * as _756 from "./rpc.query";
import * as _757 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._395,
      ..._396,
      ..._397,
      ..._398,
      ..._399,
      ..._705,
      ..._707,
      ..._709,
      ..._711
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._400,
      ..._401,
      ..._402,
      ..._706,
      ..._708,
      ..._710,
      ..._712
    };
  }
  export namespace types {
    export const v1 = {
      ..._403
    };
  }
  export const ClientFactory = {
    ..._756,
    ..._757
  };
}