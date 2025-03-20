import * as _164 from "./feeshare/v1/feeshare";
import * as _165 from "./feeshare/v1/genesis";
import * as _166 from "./feeshare/v1/query";
import * as _167 from "./feeshare/v1/tx";
import * as _168 from "./mint/genesis";
import * as _169 from "./mint/mint";
import * as _170 from "./mint/query";
import * as _171 from "./mint/tx";
import * as _530 from "./feeshare/v1/tx.amino";
import * as _531 from "./mint/tx.amino";
import * as _532 from "./feeshare/v1/tx.registry";
import * as _533 from "./mint/tx.registry";
import * as _534 from "./feeshare/v1/query.rpc.Query";
import * as _535 from "./mint/query.rpc.Query";
import * as _536 from "./feeshare/v1/tx.rpc.msg";
import * as _537 from "./mint/tx.rpc.msg";
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
      ..._532,
      ..._534,
      ..._536
    };
  }
  export const mint = {
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._531,
    ..._533,
    ..._535,
    ..._537
  };
  export const ClientFactory = {
    ..._725,
    ..._726
  };
}