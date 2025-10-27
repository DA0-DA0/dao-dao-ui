import * as _191 from "./feeshare/v1/feeshare";
import * as _192 from "./feeshare/v1/genesis";
import * as _193 from "./feeshare/v1/query";
import * as _194 from "./feeshare/v1/tx";
import * as _676 from "./feeshare/v1/tx.amino";
import * as _677 from "./feeshare/v1/tx.registry";
import * as _678 from "./feeshare/v1/query.rpc.Query";
import * as _679 from "./feeshare/v1/tx.rpc.msg";
import * as _920 from "./rpc.query";
import * as _921 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._191,
      ..._192,
      ..._193,
      ..._194,
      ..._676,
      ..._677,
      ..._678,
      ..._679
    };
  }
  export const ClientFactory = {
    ..._920,
    ..._921
  };
}