import * as _164 from "./feeshare/v1/feeshare";
import * as _165 from "./feeshare/v1/genesis";
import * as _166 from "./feeshare/v1/query";
import * as _167 from "./feeshare/v1/tx";
import * as _530 from "./feeshare/v1/tx.amino";
import * as _531 from "./feeshare/v1/tx.registry";
import * as _532 from "./feeshare/v1/query.rpc.Query";
import * as _533 from "./feeshare/v1/tx.rpc.msg";
import * as _725 from "./rpc.query";
import * as _726 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._164,
      ..._165,
      ..._166,
      ..._167,
      ..._530,
      ..._531,
      ..._532,
      ..._533
    };
  }
  export const ClientFactory = {
    ..._725,
    ..._726
  };
}