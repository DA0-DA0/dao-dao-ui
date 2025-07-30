import * as _182 from "./feeshare/v1/feeshare";
import * as _183 from "./feeshare/v1/genesis";
import * as _184 from "./feeshare/v1/query";
import * as _185 from "./feeshare/v1/tx";
import * as _649 from "./feeshare/v1/tx.amino";
import * as _650 from "./feeshare/v1/tx.registry";
import * as _651 from "./feeshare/v1/query.rpc.Query";
import * as _652 from "./feeshare/v1/tx.rpc.msg";
import * as _889 from "./rpc.query";
import * as _890 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._649,
      ..._650,
      ..._651,
      ..._652
    };
  }
  export const ClientFactory = {
    ..._889,
    ..._890
  };
}