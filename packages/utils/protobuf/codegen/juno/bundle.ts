import * as _92 from "./feeshare/v1/feeshare";
import * as _93 from "./feeshare/v1/genesis";
import * as _94 from "./feeshare/v1/query";
import * as _95 from "./feeshare/v1/tx";
import * as _96 from "./mint/genesis";
import * as _97 from "./mint/mint";
import * as _98 from "./mint/query";
import * as _99 from "./mint/tx";
import * as _258 from "./feeshare/v1/tx.amino";
import * as _259 from "./mint/tx.amino";
import * as _260 from "./feeshare/v1/tx.registry";
import * as _261 from "./mint/tx.registry";
import * as _262 from "./feeshare/v1/query.rpc.Query";
import * as _263 from "./mint/query.rpc.Query";
import * as _264 from "./feeshare/v1/tx.rpc.msg";
import * as _265 from "./mint/tx.rpc.msg";
import * as _335 from "./rpc.query";
import * as _336 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._258,
      ..._260,
      ..._262,
      ..._264
    };
  }
  export const mint = {
    ..._96,
    ..._97,
    ..._98,
    ..._99,
    ..._259,
    ..._261,
    ..._263,
    ..._265
  };
  export const ClientFactory = {
    ..._335,
    ..._336
  };
}