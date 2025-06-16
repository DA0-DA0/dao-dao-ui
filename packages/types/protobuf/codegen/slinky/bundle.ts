import * as _483 from "./marketmap/v1/genesis";
import * as _484 from "./marketmap/v1/market";
import * as _485 from "./marketmap/v1/params";
import * as _486 from "./marketmap/v1/query";
import * as _487 from "./marketmap/v1/tx";
import * as _488 from "./oracle/v1/genesis";
import * as _489 from "./oracle/v1/query";
import * as _490 from "./oracle/v1/tx";
import * as _491 from "./types/v1/currency_pair";
import * as _832 from "./marketmap/v1/tx.amino";
import * as _833 from "./oracle/v1/tx.amino";
import * as _834 from "./marketmap/v1/tx.registry";
import * as _835 from "./oracle/v1/tx.registry";
import * as _836 from "./marketmap/v1/query.rpc.Query";
import * as _837 from "./oracle/v1/query.rpc.Query";
import * as _838 from "./marketmap/v1/tx.rpc.msg";
import * as _839 from "./oracle/v1/tx.rpc.msg";
import * as _885 from "./rpc.query";
import * as _886 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._483,
      ..._484,
      ..._485,
      ..._486,
      ..._487,
      ..._832,
      ..._834,
      ..._836,
      ..._838
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._488,
      ..._489,
      ..._490,
      ..._833,
      ..._835,
      ..._837,
      ..._839
    };
  }
  export namespace types {
    export const v1 = {
      ..._491
    };
  }
  export const ClientFactory = {
    ..._885,
    ..._886
  };
}