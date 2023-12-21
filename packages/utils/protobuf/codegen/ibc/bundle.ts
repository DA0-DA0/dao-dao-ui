import * as _81 from "./applications/interchain_accounts/controller/v1/controller";
import * as _82 from "./applications/interchain_accounts/controller/v1/query";
import * as _83 from "./applications/interchain_accounts/controller/v1/tx";
import * as _84 from "./applications/interchain_accounts/host/v1/host";
import * as _85 from "./applications/interchain_accounts/host/v1/query";
import * as _86 from "./applications/interchain_accounts/host/v1/tx";
import * as _87 from "./applications/interchain_accounts/v1/account";
import * as _88 from "./applications/interchain_accounts/v1/metadata";
import * as _89 from "./applications/interchain_accounts/v1/packet";
import * as _90 from "./applications/transfer/v1/authz";
import * as _91 from "./applications/transfer/v1/genesis";
import * as _92 from "./applications/transfer/v1/query";
import * as _93 from "./applications/transfer/v1/transfer";
import * as _94 from "./applications/transfer/v1/tx";
import * as _95 from "./core/channel/v1/channel";
import * as _96 from "./core/channel/v1/genesis";
import * as _97 from "./core/channel/v1/query";
import * as _98 from "./core/channel/v1/tx";
import * as _99 from "./core/client/v1/client";
import * as _261 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _262 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _263 from "./applications/transfer/v1/tx.amino";
import * as _264 from "./core/channel/v1/tx.amino";
import * as _265 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _266 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _267 from "./applications/transfer/v1/tx.registry";
import * as _268 from "./core/channel/v1/tx.registry";
import * as _269 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _270 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _271 from "./applications/transfer/v1/query.rpc.Query";
import * as _272 from "./core/channel/v1/query.rpc.Query";
import * as _273 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _274 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _275 from "./applications/transfer/v1/tx.rpc.msg";
import * as _276 from "./core/channel/v1/tx.rpc.msg";
import * as _353 from "./rpc.query";
import * as _354 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._81,
          ..._82,
          ..._83,
          ..._261,
          ..._265,
          ..._269,
          ..._273
        };
      }
      export namespace host {
        export const v1 = {
          ..._84,
          ..._85,
          ..._86,
          ..._262,
          ..._266,
          ..._270,
          ..._274
        };
      }
      export const v1 = {
        ..._87,
        ..._88,
        ..._89
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._90,
        ..._91,
        ..._92,
        ..._93,
        ..._94,
        ..._263,
        ..._267,
        ..._271,
        ..._275
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._95,
        ..._96,
        ..._97,
        ..._98,
        ..._264,
        ..._268,
        ..._272,
        ..._276
      };
    }
    export namespace client {
      export const v1 = {
        ..._99
      };
    }
  }
  export const ClientFactory = {
    ..._353,
    ..._354
  };
}