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
import * as _128 from "./core/client/v1/genesis";
import * as _129 from "./core/client/v1/query";
import * as _130 from "./core/client/v1/tx";
import * as _383 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _384 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _385 from "./applications/transfer/v1/tx.amino";
import * as _386 from "./core/channel/v1/tx.amino";
import * as _387 from "./core/client/v1/tx.amino";
import * as _388 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _389 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _390 from "./applications/transfer/v1/tx.registry";
import * as _391 from "./core/channel/v1/tx.registry";
import * as _392 from "./core/client/v1/tx.registry";
import * as _393 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _394 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _395 from "./applications/transfer/v1/query.rpc.Query";
import * as _396 from "./core/channel/v1/query.rpc.Query";
import * as _397 from "./core/client/v1/query.rpc.Query";
import * as _398 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _399 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _400 from "./applications/transfer/v1/tx.rpc.msg";
import * as _401 from "./core/channel/v1/tx.rpc.msg";
import * as _402 from "./core/client/v1/tx.rpc.msg";
import * as _541 from "./rpc.query";
import * as _542 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._109,
          ..._110,
          ..._111,
          ..._383,
          ..._388,
          ..._393,
          ..._398
        };
      }
      export namespace host {
        export const v1 = {
          ..._112,
          ..._113,
          ..._114,
          ..._384,
          ..._389,
          ..._394,
          ..._399
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
        ..._385,
        ..._390,
        ..._395,
        ..._400
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
        ..._386,
        ..._391,
        ..._396,
        ..._401
      };
    }
    export namespace client {
      export const v1 = {
        ..._127,
        ..._128,
        ..._129,
        ..._130,
        ..._387,
        ..._392,
        ..._397,
        ..._402
      };
    }
  }
  export const ClientFactory = {
    ..._541,
    ..._542
  };
}