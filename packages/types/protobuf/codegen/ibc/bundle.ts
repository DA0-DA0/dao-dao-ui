import * as _113 from "./applications/interchain_accounts/controller/v1/controller";
import * as _114 from "./applications/interchain_accounts/controller/v1/query";
import * as _115 from "./applications/interchain_accounts/controller/v1/tx";
import * as _116 from "./applications/interchain_accounts/host/v1/host";
import * as _117 from "./applications/interchain_accounts/host/v1/query";
import * as _118 from "./applications/interchain_accounts/host/v1/tx";
import * as _119 from "./applications/interchain_accounts/v1/account";
import * as _120 from "./applications/interchain_accounts/v1/metadata";
import * as _121 from "./applications/interchain_accounts/v1/packet";
import * as _122 from "./applications/transfer/v1/authz";
import * as _123 from "./applications/transfer/v1/genesis";
import * as _124 from "./applications/transfer/v1/query";
import * as _125 from "./applications/transfer/v1/transfer";
import * as _126 from "./applications/transfer/v1/tx";
import * as _127 from "./core/channel/v1/channel";
import * as _128 from "./core/channel/v1/genesis";
import * as _129 from "./core/channel/v1/query";
import * as _130 from "./core/channel/v1/tx";
import * as _131 from "./core/client/v1/client";
import * as _132 from "./core/client/v1/genesis";
import * as _133 from "./core/client/v1/query";
import * as _134 from "./core/client/v1/tx";
import * as _391 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _392 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _393 from "./applications/transfer/v1/tx.amino";
import * as _394 from "./core/channel/v1/tx.amino";
import * as _395 from "./core/client/v1/tx.amino";
import * as _396 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _397 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _398 from "./applications/transfer/v1/tx.registry";
import * as _399 from "./core/channel/v1/tx.registry";
import * as _400 from "./core/client/v1/tx.registry";
import * as _401 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _402 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _403 from "./applications/transfer/v1/query.rpc.Query";
import * as _404 from "./core/channel/v1/query.rpc.Query";
import * as _405 from "./core/client/v1/query.rpc.Query";
import * as _406 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _407 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _408 from "./applications/transfer/v1/tx.rpc.msg";
import * as _409 from "./core/channel/v1/tx.rpc.msg";
import * as _410 from "./core/client/v1/tx.rpc.msg";
import * as _549 from "./rpc.query";
import * as _550 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._113,
          ..._114,
          ..._115,
          ..._391,
          ..._396,
          ..._401,
          ..._406
        };
      }
      export namespace host {
        export const v1 = {
          ..._116,
          ..._117,
          ..._118,
          ..._392,
          ..._397,
          ..._402,
          ..._407
        };
      }
      export const v1 = {
        ..._119,
        ..._120,
        ..._121
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._122,
        ..._123,
        ..._124,
        ..._125,
        ..._126,
        ..._393,
        ..._398,
        ..._403,
        ..._408
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._127,
        ..._128,
        ..._129,
        ..._130,
        ..._394,
        ..._399,
        ..._404,
        ..._409
      };
    }
    export namespace client {
      export const v1 = {
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._395,
        ..._400,
        ..._405,
        ..._410
      };
    }
  }
  export const ClientFactory = {
    ..._549,
    ..._550
  };
}