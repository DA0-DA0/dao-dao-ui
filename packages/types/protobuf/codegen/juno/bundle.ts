import * as _136 from "./feeshare/v1/feeshare";
import * as _137 from "./feeshare/v1/genesis";
import * as _138 from "./feeshare/v1/query";
import * as _139 from "./feeshare/v1/tx";
import * as _140 from "./mint/genesis";
import * as _141 from "./mint/mint";
import * as _142 from "./mint/query";
import * as _143 from "./mint/tx";
import * as _441 from "./feeshare/v1/tx.amino";
import * as _442 from "./mint/tx.amino";
import * as _443 from "./feeshare/v1/tx.registry";
import * as _444 from "./mint/tx.registry";
import * as _445 from "./feeshare/v1/query.rpc.Query";
import * as _446 from "./mint/query.rpc.Query";
import * as _447 from "./feeshare/v1/tx.rpc.msg";
import * as _448 from "./mint/tx.rpc.msg";
import * as _602 from "./rpc.query";
import * as _603 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._441,
      ..._443,
      ..._445,
      ..._447
    };
  }
  export const mint = {
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._442,
    ..._444,
    ..._446,
    ..._448
  };
  export const ClientFactory = {
    ..._602,
    ..._603
  };
}