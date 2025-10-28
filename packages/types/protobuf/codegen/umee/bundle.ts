import * as _538 from "./leverage/v1/events";
import * as _539 from "./leverage/v1/genesis";
import * as _540 from "./leverage/v1/leverage";
import * as _541 from "./leverage/v1/query";
import * as _542 from "./leverage/v1/tx";
import * as _878 from "./leverage/v1/tx.amino";
import * as _879 from "./leverage/v1/tx.registry";
import * as _880 from "./leverage/v1/query.rpc.Query";
import * as _881 from "./leverage/v1/tx.rpc.msg";
import * as _927 from "./rpc.query";
import * as _928 from "./rpc.tx";
export namespace umee {
  export namespace leverage {
    export const v1 = {
      ..._538,
      ..._539,
      ..._540,
      ..._541,
      ..._542,
      ..._878,
      ..._879,
      ..._880,
      ..._881
    };
  }
  export const ClientFactory = {
    ..._927,
    ..._928
  };
}