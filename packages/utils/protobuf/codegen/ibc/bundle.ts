import * as _82 from "./applications/interchain_accounts/controller/v1/controller";
import * as _83 from "./applications/interchain_accounts/controller/v1/query";
import * as _84 from "./applications/interchain_accounts/controller/v1/tx";
import * as _85 from "./applications/interchain_accounts/host/v1/host";
import * as _86 from "./applications/interchain_accounts/host/v1/query";
import * as _87 from "./applications/interchain_accounts/host/v1/tx";
import * as _88 from "./applications/interchain_accounts/v1/account";
import * as _89 from "./applications/interchain_accounts/v1/metadata";
import * as _90 from "./applications/interchain_accounts/v1/packet";
import * as _91 from "./applications/transfer/v1/authz";
import * as _92 from "./applications/transfer/v1/genesis";
import * as _93 from "./applications/transfer/v1/query";
import * as _94 from "./applications/transfer/v1/transfer";
import * as _95 from "./applications/transfer/v1/tx";
import * as _96 from "./core/channel/v1/channel";
import * as _97 from "./core/channel/v1/genesis";
import * as _98 from "./core/channel/v1/query";
import * as _99 from "./core/channel/v1/tx";
import * as _100 from "./core/client/v1/client";
import * as _329 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _330 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _331 from "./applications/transfer/v1/tx.amino";
import * as _332 from "./core/channel/v1/tx.amino";
import * as _333 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _334 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _335 from "./applications/transfer/v1/tx.registry";
import * as _336 from "./core/channel/v1/tx.registry";
import * as _337 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _338 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _339 from "./applications/transfer/v1/query.rpc.Query";
import * as _340 from "./core/channel/v1/query.rpc.Query";
import * as _341 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _342 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _343 from "./applications/transfer/v1/tx.rpc.msg";
import * as _344 from "./core/channel/v1/tx.rpc.msg";
import * as _467 from "./rpc.query";
import * as _468 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._82,
          ..._83,
          ..._84,
          ..._329,
          ..._333,
          ..._337,
          ..._341
        };
      }
      export namespace host {
        export const v1 = {
          ..._85,
          ..._86,
          ..._87,
          ..._330,
          ..._334,
          ..._338,
          ..._342
        };
      }
      export const v1 = {
        ..._88,
        ..._89,
        ..._90
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._91,
        ..._92,
        ..._93,
        ..._94,
        ..._95,
        ..._331,
        ..._335,
        ..._339,
        ..._343
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._96,
        ..._97,
        ..._98,
        ..._99,
        ..._332,
        ..._336,
        ..._340,
        ..._344
      };
    }
    export namespace client {
      export const v1 = {
        ..._100
      };
    }
  }
  export const ClientFactory = {
    ..._467,
    ..._468
  };
}