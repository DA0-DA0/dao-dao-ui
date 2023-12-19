import * as _76 from "./applications/interchain_accounts/controller/v1/controller";
import * as _77 from "./applications/interchain_accounts/controller/v1/query";
import * as _78 from "./applications/interchain_accounts/controller/v1/tx";
import * as _79 from "./applications/interchain_accounts/host/v1/host";
import * as _80 from "./applications/interchain_accounts/host/v1/query";
import * as _81 from "./applications/interchain_accounts/host/v1/tx";
import * as _82 from "./applications/interchain_accounts/v1/account";
import * as _83 from "./applications/interchain_accounts/v1/metadata";
import * as _84 from "./applications/interchain_accounts/v1/packet";
import * as _85 from "./applications/transfer/v1/authz";
import * as _86 from "./applications/transfer/v1/genesis";
import * as _87 from "./applications/transfer/v1/query";
import * as _88 from "./applications/transfer/v1/transfer";
import * as _89 from "./applications/transfer/v1/tx";
import * as _90 from "./core/channel/v1/channel";
import * as _91 from "./core/channel/v1/genesis";
import * as _92 from "./core/channel/v1/query";
import * as _93 from "./core/channel/v1/tx";
import * as _94 from "./core/client/v1/client";
import * as _249 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _250 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _251 from "./applications/transfer/v1/tx.amino";
import * as _252 from "./core/channel/v1/tx.amino";
import * as _253 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _254 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _255 from "./applications/transfer/v1/tx.registry";
import * as _256 from "./core/channel/v1/tx.registry";
import * as _257 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _258 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _259 from "./applications/transfer/v1/query.rpc.Query";
import * as _260 from "./core/channel/v1/query.rpc.Query";
import * as _261 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _262 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _263 from "./applications/transfer/v1/tx.rpc.msg";
import * as _264 from "./core/channel/v1/tx.rpc.msg";
import * as _340 from "./rpc.query";
import * as _341 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._76,
          ..._77,
          ..._78,
          ..._249,
          ..._253,
          ..._257,
          ..._261
        };
      }
      export namespace host {
        export const v1 = {
          ..._79,
          ..._80,
          ..._81,
          ..._250,
          ..._254,
          ..._258,
          ..._262
        };
      }
      export const v1 = {
        ..._82,
        ..._83,
        ..._84
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._85,
        ..._86,
        ..._87,
        ..._88,
        ..._89,
        ..._251,
        ..._255,
        ..._259,
        ..._263
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._90,
        ..._91,
        ..._92,
        ..._93,
        ..._252,
        ..._256,
        ..._260,
        ..._264
      };
    }
    export namespace client {
      export const v1 = {
        ..._94
      };
    }
  }
  export const ClientFactory = {
    ..._340,
    ..._341
  };
}