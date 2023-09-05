import * as _83 from "./feeshare/v1/feeshare";
import * as _84 from "./feeshare/v1/genesis";
import * as _85 from "./feeshare/v1/query";
import * as _86 from "./feeshare/v1/tx";
import * as _87 from "./mint/genesis";
import * as _88 from "./mint/mint";
import * as _89 from "./mint/query";
import * as _90 from "./mint/tx";
import * as _222 from "./feeshare/v1/tx.amino";
import * as _223 from "./mint/tx.amino";
import * as _224 from "./feeshare/v1/tx.registry";
import * as _225 from "./mint/tx.registry";
import * as _226 from "./feeshare/v1/query.rpc.Query";
import * as _227 from "./mint/query.rpc.Query";
import * as _228 from "./feeshare/v1/tx.rpc.msg";
import * as _229 from "./mint/tx.rpc.msg";
import * as _284 from "./rpc.query";
import * as _285 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._86,
      ..._222,
      ..._224,
      ..._226,
      ..._228
    };
  }
  export const mint = {
    ..._87,
    ..._88,
    ..._89,
    ..._90,
    ..._223,
    ..._225,
    ..._227,
    ..._229
  };
  export const ClientFactory = {
    ..._284,
    ..._285
  };
}