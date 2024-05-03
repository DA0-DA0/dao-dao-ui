import * as _138 from "./feeshare/v1/feeshare";
import * as _139 from "./feeshare/v1/genesis";
import * as _140 from "./feeshare/v1/query";
import * as _141 from "./feeshare/v1/tx";
import * as _142 from "./mint/genesis";
import * as _143 from "./mint/mint";
import * as _144 from "./mint/query";
import * as _145 from "./mint/tx";
import * as _439 from "./feeshare/v1/tx.amino";
import * as _440 from "./mint/tx.amino";
import * as _441 from "./feeshare/v1/tx.registry";
import * as _442 from "./mint/tx.registry";
import * as _443 from "./feeshare/v1/query.rpc.Query";
import * as _444 from "./mint/query.rpc.Query";
import * as _445 from "./feeshare/v1/tx.rpc.msg";
import * as _446 from "./mint/tx.rpc.msg";
import * as _595 from "./rpc.query";
import * as _596 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._439,
      ..._441,
      ..._443,
      ..._445
    };
  }
  export const mint = {
    ..._142,
    ..._143,
    ..._144,
    ..._145,
    ..._440,
    ..._442,
    ..._444,
    ..._446
  };
  export const ClientFactory = {
    ..._595,
    ..._596
  };
}