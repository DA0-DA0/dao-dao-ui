import * as _171 from "./feeshare/v1/feeshare";
import * as _172 from "./feeshare/v1/genesis";
import * as _173 from "./feeshare/v1/query";
import * as _174 from "./feeshare/v1/tx";
import * as _541 from "./feeshare/v1/tx.amino";
import * as _542 from "./feeshare/v1/tx.registry";
import * as _543 from "./feeshare/v1/query.rpc.Query";
import * as _544 from "./feeshare/v1/tx.rpc.msg";
import * as _738 from "./rpc.query";
import * as _739 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._171,
      ..._172,
      ..._173,
      ..._174,
      ..._541,
      ..._542,
      ..._543,
      ..._544
    };
  }
  export const ClientFactory = {
    ..._738,
    ..._739
  };
}