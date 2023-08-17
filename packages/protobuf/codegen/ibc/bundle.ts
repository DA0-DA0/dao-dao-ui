import * as _73 from "./applications/transfer/v1/authz";
import * as _74 from "./applications/transfer/v1/genesis";
import * as _75 from "./applications/transfer/v1/query";
import * as _76 from "./applications/transfer/v1/transfer";
import * as _77 from "./applications/transfer/v1/tx";
import * as _78 from "./core/client/v1/client";
import * as _210 from "./applications/transfer/v1/tx.amino";
import * as _211 from "./applications/transfer/v1/tx.registry";
import * as _212 from "./applications/transfer/v1/query.rpc.Query";
import * as _213 from "./applications/transfer/v1/tx.rpc.msg";
import * as _274 from "./rpc.query";
import * as _275 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._73,
        ..._74,
        ..._75,
        ..._76,
        ..._77,
        ..._210,
        ..._211,
        ..._212,
        ..._213
      };
    }
  }
  export namespace core {
    export namespace client {
      export const v1 = {
        ..._78
      };
    }
  }
  export const ClientFactory = {
    ..._274,
    ..._275
  };
}