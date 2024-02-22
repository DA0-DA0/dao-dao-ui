import * as _93 from "./applications/interchain_accounts/controller/v1/controller";
import * as _94 from "./applications/interchain_accounts/controller/v1/query";
import * as _95 from "./applications/interchain_accounts/controller/v1/tx";
import * as _96 from "./applications/interchain_accounts/host/v1/host";
import * as _97 from "./applications/interchain_accounts/host/v1/query";
import * as _98 from "./applications/interchain_accounts/host/v1/tx";
import * as _99 from "./applications/interchain_accounts/v1/account";
import * as _100 from "./applications/interchain_accounts/v1/metadata";
import * as _101 from "./applications/interchain_accounts/v1/packet";
import * as _102 from "./applications/transfer/v1/authz";
import * as _103 from "./applications/transfer/v1/genesis";
import * as _104 from "./applications/transfer/v1/query";
import * as _105 from "./applications/transfer/v1/transfer";
import * as _106 from "./applications/transfer/v1/tx";
import * as _107 from "./core/channel/v1/channel";
import * as _108 from "./core/channel/v1/genesis";
import * as _109 from "./core/channel/v1/query";
import * as _110 from "./core/channel/v1/tx";
import * as _111 from "./core/client/v1/client";
import * as _344 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _345 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _346 from "./applications/transfer/v1/tx.amino";
import * as _347 from "./core/channel/v1/tx.amino";
import * as _348 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _349 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _350 from "./applications/transfer/v1/tx.registry";
import * as _351 from "./core/channel/v1/tx.registry";
import * as _352 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _353 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _354 from "./applications/transfer/v1/query.rpc.Query";
import * as _355 from "./core/channel/v1/query.rpc.Query";
import * as _356 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _357 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _358 from "./applications/transfer/v1/tx.rpc.msg";
import * as _359 from "./core/channel/v1/tx.rpc.msg";
import * as _484 from "./rpc.query";
import * as _485 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._93,
          ..._94,
          ..._95,
          ..._344,
          ..._348,
          ..._352,
          ..._356
        };
      }
      export namespace host {
        export const v1 = {
          ..._96,
          ..._97,
          ..._98,
          ..._345,
          ..._349,
          ..._353,
          ..._357
        };
      }
      export const v1 = {
        ..._99,
        ..._100,
        ..._101
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._102,
        ..._103,
        ..._104,
        ..._105,
        ..._106,
        ..._346,
        ..._350,
        ..._354,
        ..._358
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._107,
        ..._108,
        ..._109,
        ..._110,
        ..._347,
        ..._351,
        ..._355,
        ..._359
      };
    }
    export namespace client {
      export const v1 = {
        ..._111
      };
    }
  }
  export const ClientFactory = {
    ..._484,
    ..._485
  };
}