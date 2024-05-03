import * as _116 from "./applications/interchain_accounts/controller/v1/controller";
import * as _117 from "./applications/interchain_accounts/controller/v1/query";
import * as _118 from "./applications/interchain_accounts/controller/v1/tx";
import * as _119 from "./applications/interchain_accounts/host/v1/host";
import * as _120 from "./applications/interchain_accounts/host/v1/query";
import * as _121 from "./applications/interchain_accounts/host/v1/tx";
import * as _122 from "./applications/interchain_accounts/v1/account";
import * as _123 from "./applications/interchain_accounts/v1/metadata";
import * as _124 from "./applications/interchain_accounts/v1/packet";
import * as _125 from "./applications/transfer/v1/authz";
import * as _126 from "./applications/transfer/v1/genesis";
import * as _127 from "./applications/transfer/v1/query";
import * as _128 from "./applications/transfer/v1/transfer";
import * as _129 from "./applications/transfer/v1/tx";
import * as _130 from "./core/channel/v1/channel";
import * as _131 from "./core/channel/v1/genesis";
import * as _132 from "./core/channel/v1/query";
import * as _133 from "./core/channel/v1/tx";
import * as _134 from "./core/client/v1/client";
import * as _135 from "./core/client/v1/genesis";
import * as _136 from "./core/client/v1/query";
import * as _137 from "./core/client/v1/tx";
import * as _419 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _420 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _421 from "./applications/transfer/v1/tx.amino";
import * as _422 from "./core/channel/v1/tx.amino";
import * as _423 from "./core/client/v1/tx.amino";
import * as _424 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _425 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _426 from "./applications/transfer/v1/tx.registry";
import * as _427 from "./core/channel/v1/tx.registry";
import * as _428 from "./core/client/v1/tx.registry";
import * as _429 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _430 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _431 from "./applications/transfer/v1/query.rpc.Query";
import * as _432 from "./core/channel/v1/query.rpc.Query";
import * as _433 from "./core/client/v1/query.rpc.Query";
import * as _434 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _435 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _436 from "./applications/transfer/v1/tx.rpc.msg";
import * as _437 from "./core/channel/v1/tx.rpc.msg";
import * as _438 from "./core/client/v1/tx.rpc.msg";
import * as _593 from "./rpc.query";
import * as _594 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._116,
          ..._117,
          ..._118,
          ..._419,
          ..._424,
          ..._429,
          ..._434
        };
      }
      export namespace host {
        export const v1 = {
          ..._119,
          ..._120,
          ..._121,
          ..._420,
          ..._425,
          ..._430,
          ..._435
        };
      }
      export const v1 = {
        ..._122,
        ..._123,
        ..._124
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._125,
        ..._126,
        ..._127,
        ..._128,
        ..._129,
        ..._421,
        ..._426,
        ..._431,
        ..._436
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._130,
        ..._131,
        ..._132,
        ..._133,
        ..._422,
        ..._427,
        ..._432,
        ..._437
      };
    }
    export namespace client {
      export const v1 = {
        ..._134,
        ..._135,
        ..._136,
        ..._137,
        ..._423,
        ..._428,
        ..._433,
        ..._438
      };
    }
  }
  export const ClientFactory = {
    ..._593,
    ..._594
  };
}