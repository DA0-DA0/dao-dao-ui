import * as _109 from "./applications/interchain_accounts/controller/v1/controller";
import * as _110 from "./applications/interchain_accounts/controller/v1/query";
import * as _111 from "./applications/interchain_accounts/controller/v1/tx";
import * as _112 from "./applications/interchain_accounts/host/v1/host";
import * as _113 from "./applications/interchain_accounts/host/v1/query";
import * as _114 from "./applications/interchain_accounts/host/v1/tx";
import * as _115 from "./applications/interchain_accounts/v1/account";
import * as _116 from "./applications/interchain_accounts/v1/metadata";
import * as _117 from "./applications/interchain_accounts/v1/packet";
import * as _118 from "./applications/transfer/v1/authz";
import * as _119 from "./applications/transfer/v1/genesis";
import * as _120 from "./applications/transfer/v1/query";
import * as _121 from "./applications/transfer/v1/transfer";
import * as _122 from "./applications/transfer/v1/tx";
import * as _123 from "./core/channel/v1/channel";
import * as _124 from "./core/channel/v1/genesis";
import * as _125 from "./core/channel/v1/query";
import * as _126 from "./core/channel/v1/tx";
import * as _127 from "./core/client/v1/client";
import * as _364 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _365 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _366 from "./applications/transfer/v1/tx.amino";
import * as _367 from "./core/channel/v1/tx.amino";
import * as _368 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _369 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _370 from "./applications/transfer/v1/tx.registry";
import * as _371 from "./core/channel/v1/tx.registry";
import * as _372 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _373 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _374 from "./applications/transfer/v1/query.rpc.Query";
import * as _375 from "./core/channel/v1/query.rpc.Query";
import * as _376 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _377 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _378 from "./applications/transfer/v1/tx.rpc.msg";
import * as _379 from "./core/channel/v1/tx.rpc.msg";
import * as _506 from "./rpc.query";
import * as _507 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._109,
          ..._110,
          ..._111,
          ..._364,
          ..._368,
          ..._372,
          ..._376
        };
      }
      export namespace host {
        export const v1 = {
          ..._112,
          ..._113,
          ..._114,
          ..._365,
          ..._369,
          ..._373,
          ..._377
        };
      }
      export const v1 = {
        ..._115,
        ..._116,
        ..._117
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._118,
        ..._119,
        ..._120,
        ..._121,
        ..._122,
        ..._366,
        ..._370,
        ..._374,
        ..._378
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._123,
        ..._124,
        ..._125,
        ..._126,
        ..._367,
        ..._371,
        ..._375,
        ..._379
      };
    }
    export namespace client {
      export const v1 = {
        ..._127
      };
    }
  }
  export const ClientFactory = {
    ..._506,
    ..._507
  };
}