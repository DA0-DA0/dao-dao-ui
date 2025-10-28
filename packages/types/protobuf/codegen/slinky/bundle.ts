import * as _503 from "./marketmap/v1/genesis";
import * as _504 from "./marketmap/v1/market";
import * as _505 from "./marketmap/v1/params";
import * as _506 from "./marketmap/v1/query";
import * as _507 from "./marketmap/v1/tx";
import * as _508 from "./oracle/v1/genesis";
import * as _509 from "./oracle/v1/query";
import * as _510 from "./oracle/v1/tx";
import * as _511 from "./types/v1/currency_pair";
import * as _865 from "./marketmap/v1/tx.amino";
import * as _866 from "./oracle/v1/tx.amino";
import * as _867 from "./marketmap/v1/tx.registry";
import * as _868 from "./oracle/v1/tx.registry";
import * as _869 from "./marketmap/v1/query.rpc.Query";
import * as _870 from "./oracle/v1/query.rpc.Query";
import * as _871 from "./marketmap/v1/tx.rpc.msg";
import * as _872 from "./oracle/v1/tx.rpc.msg";
import * as _922 from "./rpc.query";
import * as _923 from "./rpc.tx";
export namespace slinky {
  export namespace marketmap {
    export const v1 = {
      ..._503,
      ..._504,
      ..._505,
      ..._506,
      ..._507,
      ..._865,
      ..._867,
      ..._869,
      ..._871
    };
  }
  export namespace oracle {
    export const v1 = {
      ..._508,
      ..._509,
      ..._510,
      ..._866,
      ..._868,
      ..._870,
      ..._872
    };
  }
  export namespace types {
    export const v1 = {
      ..._511
    };
  }
  export const ClientFactory = {
    ..._922,
    ..._923
  };
}