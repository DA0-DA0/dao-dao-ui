import * as _191 from "./feeshare/v1/feeshare";
import * as _192 from "./feeshare/v1/genesis";
import * as _193 from "./feeshare/v1/query";
import * as _194 from "./feeshare/v1/tx";
import * as _662 from "./feeshare/v1/tx.amino";
import * as _663 from "./feeshare/v1/tx.registry";
import * as _664 from "./feeshare/v1/query.rpc.Query";
import * as _665 from "./feeshare/v1/tx.rpc.msg";
import * as _902 from "./rpc.query";
import * as _903 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._191,
      ..._192,
      ..._193,
      ..._194,
      ..._662,
      ..._663,
      ..._664,
      ..._665
    };
  }
  export const ClientFactory = {
    ..._902,
    ..._903
  };
}