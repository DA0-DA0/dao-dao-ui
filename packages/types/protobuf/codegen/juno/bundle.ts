import * as _160 from "./feeshare/v1/feeshare";
import * as _161 from "./feeshare/v1/genesis";
import * as _162 from "./feeshare/v1/query";
import * as _163 from "./feeshare/v1/tx";
import * as _164 from "./mint/genesis";
import * as _165 from "./mint/mint";
import * as _166 from "./mint/query";
import * as _167 from "./mint/tx";
import * as _526 from "./feeshare/v1/tx.amino";
import * as _527 from "./mint/tx.amino";
import * as _528 from "./feeshare/v1/tx.registry";
import * as _529 from "./mint/tx.registry";
import * as _530 from "./feeshare/v1/query.rpc.Query";
import * as _531 from "./mint/query.rpc.Query";
import * as _532 from "./feeshare/v1/tx.rpc.msg";
import * as _533 from "./mint/tx.rpc.msg";
import * as _721 from "./rpc.query";
import * as _722 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._526,
      ..._528,
      ..._530,
      ..._532
    };
  }
  export const mint = {
    ..._164,
    ..._165,
    ..._166,
    ..._167,
    ..._527,
    ..._529,
    ..._531,
    ..._533
  };
  export const ClientFactory = {
    ..._721,
    ..._722
  };
}