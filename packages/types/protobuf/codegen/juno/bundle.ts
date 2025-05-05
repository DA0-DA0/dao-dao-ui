import * as _164 from "./feeshare/v1/feeshare";
import * as _165 from "./feeshare/v1/genesis";
import * as _166 from "./feeshare/v1/query";
import * as _167 from "./feeshare/v1/tx";
import * as _526 from "./feeshare/v1/tx.amino";
import * as _527 from "./feeshare/v1/tx.registry";
import * as _528 from "./feeshare/v1/query.rpc.Query";
import * as _529 from "./feeshare/v1/tx.rpc.msg";
import * as _717 from "./rpc.query";
import * as _718 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._164,
      ..._165,
      ..._166,
      ..._167,
      ..._526,
      ..._527,
      ..._528,
      ..._529
    };
  }
  export const ClientFactory = {
    ..._717,
    ..._718
  };
}