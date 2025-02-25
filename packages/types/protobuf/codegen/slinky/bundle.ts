import * as _384 from "./marketmap/v1/genesis";
import * as _385 from "./marketmap/v1/market";
import * as _386 from "./marketmap/v1/params";
import * as _387 from "./marketmap/v1/query";
import * as _388 from "./marketmap/v1/tx";
import * as _389 from "./oracle/v1/genesis";
import * as _390 from "./oracle/v1/query";
import * as _391 from "./oracle/v1/tx";
import * as _392 from "./types/v1/currency_pair";
import * as _690 from "./marketmap/v1/tx.amino";
import * as _691 from "./oracle/v1/tx.amino";
import * as _692 from "./marketmap/v1/tx.registry";
import * as _693 from "./oracle/v1/tx.registry";
import * as _694 from "./marketmap/v1/query.rpc.Query";
import * as _695 from "./oracle/v1/query.rpc.Query";
import * as _696 from "./marketmap/v1/tx.rpc.msg";
import * as _697 from "./oracle/v1/tx.rpc.msg";
import * as _739 from "./rpc.query";
import * as _740 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._384,
      ..._385,
      ..._386,
      ..._387,
      ..._388,
      ..._690,
      ..._692,
      ..._694,
      ..._696
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._389,
      ..._390,
      ..._391,
      ..._691,
      ..._693,
      ..._695,
      ..._697
    };
  }
  export namespace types {
    export const v1 = {
      ..._392
    };
  }
  export const ClientFactory = {
    ..._739,
    ..._740
  };
}