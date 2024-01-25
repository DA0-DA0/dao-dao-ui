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
import * as _299 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _300 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _301 from "./applications/transfer/v1/tx.amino";
import * as _302 from "./core/channel/v1/tx.amino";
import * as _303 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _304 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _305 from "./applications/transfer/v1/tx.registry";
import * as _306 from "./core/channel/v1/tx.registry";
import * as _307 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _308 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _309 from "./applications/transfer/v1/query.rpc.Query";
import * as _310 from "./core/channel/v1/query.rpc.Query";
import * as _311 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _312 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _313 from "./applications/transfer/v1/tx.rpc.msg";
import * as _314 from "./core/channel/v1/tx.rpc.msg";
import * as _415 from "./rpc.query";
import * as _416 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._81,
          ..._82,
          ..._83,
          ..._299,
          ..._303,
          ..._307,
          ..._311
        };
      }
      export namespace host {
        export const v1 = {
          ..._84,
          ..._85,
          ..._86,
          ..._300,
          ..._304,
          ..._308,
          ..._312
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
        ..._301,
        ..._305,
        ..._309,
        ..._313
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
        ..._302,
        ..._306,
        ..._310,
        ..._314
      };
    }
    export namespace client {
      export const v1 = {
        ..._99
      };
    }
  }
  export const ClientFactory = {
    ..._415,
    ..._416
  };
}