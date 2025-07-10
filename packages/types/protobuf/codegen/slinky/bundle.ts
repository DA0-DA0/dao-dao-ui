import * as _494 from "./marketmap/v1/genesis";
import * as _495 from "./marketmap/v1/market";
import * as _496 from "./marketmap/v1/params";
import * as _497 from "./marketmap/v1/query";
import * as _498 from "./marketmap/v1/tx";
import * as _499 from "./oracle/v1/genesis";
import * as _500 from "./oracle/v1/query";
import * as _501 from "./oracle/v1/tx";
import * as _502 from "./types/v1/currency_pair";
import * as _847 from "./marketmap/v1/tx.amino";
import * as _848 from "./oracle/v1/tx.amino";
import * as _849 from "./marketmap/v1/tx.registry";
import * as _850 from "./oracle/v1/tx.registry";
import * as _851 from "./marketmap/v1/query.rpc.Query";
import * as _852 from "./oracle/v1/query.rpc.Query";
import * as _853 from "./marketmap/v1/tx.rpc.msg";
import * as _854 from "./oracle/v1/tx.rpc.msg";
import * as _900 from "./rpc.query";
import * as _901 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._494,
      ..._495,
      ..._496,
      ..._497,
      ..._498,
      ..._847,
      ..._849,
      ..._851,
      ..._853
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._499,
      ..._500,
      ..._501,
      ..._848,
      ..._850,
      ..._852,
      ..._854
    };
  }
  export namespace types {
    export const v1 = {
      ..._502
    };
  }
  export const ClientFactory = {
    ..._900,
    ..._901
  };
}