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
import * as _268 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _269 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _270 from "./applications/transfer/v1/tx.amino";
import * as _271 from "./core/channel/v1/tx.amino";
import * as _272 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _273 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _274 from "./applications/transfer/v1/tx.registry";
import * as _275 from "./core/channel/v1/tx.registry";
import * as _276 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _277 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _278 from "./applications/transfer/v1/query.rpc.Query";
import * as _279 from "./core/channel/v1/query.rpc.Query";
import * as _280 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _281 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _282 from "./applications/transfer/v1/tx.rpc.msg";
import * as _283 from "./core/channel/v1/tx.rpc.msg";
import * as _368 from "./rpc.query";
import * as _369 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._81,
          ..._82,
          ..._83,
          ..._268,
          ..._272,
          ..._276,
          ..._280
        };
      }
      export namespace host {
        export const v1 = {
          ..._84,
          ..._85,
          ..._86,
          ..._269,
          ..._273,
          ..._277,
          ..._281
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
        ..._270,
        ..._274,
        ..._278,
        ..._282
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
        ..._271,
        ..._275,
        ..._279,
        ..._283
      };
    }
    export namespace client {
      export const v1 = {
        ..._99
      };
    }
  }
  export const ClientFactory = {
    ..._368,
    ..._369
  };
}