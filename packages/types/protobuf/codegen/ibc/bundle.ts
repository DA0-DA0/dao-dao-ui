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
import * as _412 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _413 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _414 from "./applications/transfer/v1/tx.amino";
import * as _415 from "./core/channel/v1/tx.amino";
import * as _416 from "./core/client/v1/tx.amino";
import * as _417 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _418 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _419 from "./applications/transfer/v1/tx.registry";
import * as _420 from "./core/channel/v1/tx.registry";
import * as _421 from "./core/client/v1/tx.registry";
import * as _422 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _423 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _424 from "./applications/transfer/v1/query.rpc.Query";
import * as _425 from "./core/channel/v1/query.rpc.Query";
import * as _426 from "./core/client/v1/query.rpc.Query";
import * as _427 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _428 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _429 from "./applications/transfer/v1/tx.rpc.msg";
import * as _430 from "./core/channel/v1/tx.rpc.msg";
import * as _431 from "./core/client/v1/tx.rpc.msg";
import * as _586 from "./rpc.query";
import * as _587 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._113,
          ..._114,
          ..._115,
          ..._412,
          ..._417,
          ..._422,
          ..._427
        };
      }
      export namespace host {
        export const v1 = {
          ..._116,
          ..._117,
          ..._118,
          ..._413,
          ..._418,
          ..._423,
          ..._428
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
        ..._414,
        ..._419,
        ..._424,
        ..._429
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
        ..._415,
        ..._420,
        ..._425,
        ..._430
      };
    }
    export namespace client {
      export const v1 = {
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._416,
        ..._421,
        ..._426,
        ..._431
      };
    }
  }
  export const ClientFactory = {
    ..._586,
    ..._587
  };
}