import * as _139 from "./feeshare/v1/feeshare";
import * as _140 from "./feeshare/v1/genesis";
import * as _141 from "./feeshare/v1/query";
import * as _142 from "./feeshare/v1/tx";
import * as _143 from "./mint/genesis";
import * as _144 from "./mint/mint";
import * as _145 from "./mint/query";
import * as _146 from "./mint/tx";
import * as _443 from "./feeshare/v1/tx.amino";
import * as _444 from "./mint/tx.amino";
import * as _445 from "./feeshare/v1/tx.registry";
import * as _446 from "./mint/tx.registry";
import * as _447 from "./feeshare/v1/query.rpc.Query";
import * as _448 from "./mint/query.rpc.Query";
import * as _449 from "./feeshare/v1/tx.rpc.msg";
import * as _450 from "./mint/tx.rpc.msg";
import * as _600 from "./rpc.query";
import * as _601 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._443,
      ..._445,
      ..._447,
      ..._449
    };
  }
  export const mint = {
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._444,
    ..._446,
    ..._448,
    ..._450
  };
  export const ClientFactory = {
    ..._600,
    ..._601
  };
}