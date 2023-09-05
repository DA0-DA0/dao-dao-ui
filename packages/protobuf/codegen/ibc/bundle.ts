import * as _73 from "./applications/transfer/v1/authz";
import * as _74 from "./applications/transfer/v1/genesis";
import * as _75 from "./applications/transfer/v1/query";
import * as _76 from "./applications/transfer/v1/transfer";
import * as _77 from "./applications/transfer/v1/tx";
import * as _78 from "./core/channel/v1/channel";
import * as _79 from "./core/channel/v1/genesis";
import * as _80 from "./core/channel/v1/query";
import * as _81 from "./core/channel/v1/tx";
import * as _82 from "./core/client/v1/client";
import * as _214 from "./applications/transfer/v1/tx.amino";
import * as _215 from "./core/channel/v1/tx.amino";
import * as _216 from "./applications/transfer/v1/tx.registry";
import * as _217 from "./core/channel/v1/tx.registry";
import * as _218 from "./applications/transfer/v1/query.rpc.Query";
import * as _219 from "./core/channel/v1/query.rpc.Query";
import * as _220 from "./applications/transfer/v1/tx.rpc.msg";
import * as _221 from "./core/channel/v1/tx.rpc.msg";
import * as _282 from "./rpc.query";
import * as _283 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._73,
        ..._74,
        ..._75,
        ..._76,
        ..._77,
        ..._214,
        ..._216,
        ..._218,
        ..._220
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._78,
        ..._79,
        ..._80,
        ..._81,
        ..._215,
        ..._217,
        ..._219,
        ..._221
      };
    }
    export namespace client {
      export const v1 = {
        ..._82
      };
    }
  }
  export const ClientFactory = {
    ..._282,
    ..._283
  };
}