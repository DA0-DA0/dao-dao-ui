import * as _182 from "./feeshare/v1/feeshare";
import * as _183 from "./feeshare/v1/genesis";
import * as _184 from "./feeshare/v1/query";
import * as _185 from "./feeshare/v1/tx";
import * as _644 from "./feeshare/v1/tx.amino";
import * as _645 from "./feeshare/v1/tx.registry";
import * as _646 from "./feeshare/v1/query.rpc.Query";
import * as _647 from "./feeshare/v1/tx.rpc.msg";
import * as _880 from "./rpc.query";
import * as _881 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._644,
      ..._645,
      ..._646,
      ..._647
    };
  }
  export const ClientFactory = {
    ..._880,
    ..._881
  };
}