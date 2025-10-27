import * as _503 from "./marketmap/v1/genesis";
import * as _504 from "./marketmap/v1/market";
import * as _505 from "./marketmap/v1/params";
import * as _506 from "./marketmap/v1/query";
import * as _507 from "./marketmap/v1/tx";
import * as _508 from "./oracle/v1/genesis";
import * as _509 from "./oracle/v1/query";
import * as _510 from "./oracle/v1/tx";
import * as _511 from "./types/v1/currency_pair";
import * as _879 from "./marketmap/v1/tx.amino";
import * as _880 from "./oracle/v1/tx.amino";
import * as _881 from "./marketmap/v1/tx.registry";
import * as _882 from "./oracle/v1/tx.registry";
import * as _883 from "./marketmap/v1/query.rpc.Query";
import * as _884 from "./oracle/v1/query.rpc.Query";
import * as _885 from "./marketmap/v1/tx.rpc.msg";
import * as _886 from "./oracle/v1/tx.rpc.msg";
import * as _940 from "./rpc.query";
import * as _941 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._503,
      ..._504,
      ..._505,
      ..._506,
      ..._507,
      ..._879,
      ..._881,
      ..._883,
      ..._885
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._508,
      ..._509,
      ..._510,
      ..._880,
      ..._882,
      ..._884,
      ..._886
    };
  }
  export namespace types {
    export const v1 = {
      ..._511
    };
  }
  export const ClientFactory = {
    ..._940,
    ..._941
  };
}