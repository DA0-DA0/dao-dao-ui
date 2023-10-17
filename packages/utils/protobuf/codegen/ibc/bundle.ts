import * as _76 from "./applications/interchain_accounts/controller/v1/controller";
import * as _77 from "./applications/interchain_accounts/controller/v1/query";
import * as _78 from "./applications/interchain_accounts/controller/v1/tx";
import * as _79 from "./applications/interchain_accounts/v1/account";
import * as _80 from "./applications/interchain_accounts/v1/metadata";
import * as _81 from "./applications/interchain_accounts/v1/packet";
import * as _82 from "./applications/transfer/v1/authz";
import * as _83 from "./applications/transfer/v1/genesis";
import * as _84 from "./applications/transfer/v1/query";
import * as _85 from "./applications/transfer/v1/transfer";
import * as _86 from "./applications/transfer/v1/tx";
import * as _87 from "./core/channel/v1/channel";
import * as _88 from "./core/channel/v1/genesis";
import * as _89 from "./core/channel/v1/query";
import * as _90 from "./core/channel/v1/tx";
import * as _91 from "./core/client/v1/client";
import * as _246 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _247 from "./applications/transfer/v1/tx.amino";
import * as _248 from "./core/channel/v1/tx.amino";
import * as _249 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _250 from "./applications/transfer/v1/tx.registry";
import * as _251 from "./core/channel/v1/tx.registry";
import * as _252 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _253 from "./applications/transfer/v1/query.rpc.Query";
import * as _254 from "./core/channel/v1/query.rpc.Query";
import * as _255 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _256 from "./applications/transfer/v1/tx.rpc.msg";
import * as _257 from "./core/channel/v1/tx.rpc.msg";
import * as _333 from "./rpc.query";
import * as _334 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._76,
          ..._77,
          ..._78,
          ..._246,
          ..._249,
          ..._252,
          ..._255
        };
      }
      export const v1 = {
        ..._79,
        ..._80,
        ..._81
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._82,
        ..._83,
        ..._84,
        ..._85,
        ..._86,
        ..._247,
        ..._250,
        ..._253,
        ..._256
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._87,
        ..._88,
        ..._89,
        ..._90,
        ..._248,
        ..._251,
        ..._254,
        ..._257
      };
    }
    export namespace client {
      export const v1 = {
        ..._91
      };
    }
  }
  export const ClientFactory = {
    ..._333,
    ..._334
  };
}