import * as _494 from "./marketmap/v1/genesis";
import * as _495 from "./marketmap/v1/market";
import * as _496 from "./marketmap/v1/params";
import * as _497 from "./marketmap/v1/query";
import * as _498 from "./marketmap/v1/tx";
import * as _499 from "./oracle/v1/genesis";
import * as _500 from "./oracle/v1/query";
import * as _501 from "./oracle/v1/tx";
import * as _502 from "./types/v1/currency_pair";
import * as _852 from "./marketmap/v1/tx.amino";
import * as _853 from "./oracle/v1/tx.amino";
import * as _854 from "./marketmap/v1/tx.registry";
import * as _855 from "./oracle/v1/tx.registry";
import * as _856 from "./marketmap/v1/query.rpc.Query";
import * as _857 from "./oracle/v1/query.rpc.Query";
import * as _858 from "./marketmap/v1/tx.rpc.msg";
import * as _859 from "./oracle/v1/tx.rpc.msg";
import * as _909 from "./rpc.query";
import * as _910 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._494,
      ..._495,
      ..._496,
      ..._497,
      ..._498,
      ..._852,
      ..._854,
      ..._856,
      ..._858
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._499,
      ..._500,
      ..._501,
      ..._853,
      ..._855,
      ..._857,
      ..._859
    };
  }
  export namespace types {
    export const v1 = {
      ..._502
    };
  }
  export const ClientFactory = {
    ..._909,
    ..._910
  };
}