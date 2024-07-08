import * as _118 from "./applications/interchain_accounts/controller/v1/controller";
import * as _119 from "./applications/interchain_accounts/controller/v1/query";
import * as _120 from "./applications/interchain_accounts/controller/v1/tx";
import * as _121 from "./applications/interchain_accounts/host/v1/host";
import * as _122 from "./applications/interchain_accounts/host/v1/query";
import * as _123 from "./applications/interchain_accounts/host/v1/tx";
import * as _124 from "./applications/interchain_accounts/v1/account";
import * as _125 from "./applications/interchain_accounts/v1/metadata";
import * as _126 from "./applications/interchain_accounts/v1/packet";
import * as _127 from "./applications/transfer/v1/authz";
import * as _128 from "./applications/transfer/v1/genesis";
import * as _129 from "./applications/transfer/v1/query";
import * as _130 from "./applications/transfer/v1/transfer";
import * as _131 from "./applications/transfer/v1/tx";
import * as _132 from "./core/channel/v1/channel";
import * as _133 from "./core/channel/v1/genesis";
import * as _134 from "./core/channel/v1/query";
import * as _135 from "./core/channel/v1/tx";
import * as _136 from "./core/client/v1/client";
import * as _137 from "./core/client/v1/genesis";
import * as _138 from "./core/client/v1/query";
import * as _139 from "./core/client/v1/tx";
import * as _448 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _449 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _450 from "./applications/transfer/v1/tx.amino";
import * as _451 from "./core/channel/v1/tx.amino";
import * as _452 from "./core/client/v1/tx.amino";
import * as _453 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _454 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _455 from "./applications/transfer/v1/tx.registry";
import * as _456 from "./core/channel/v1/tx.registry";
import * as _457 from "./core/client/v1/tx.registry";
import * as _458 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _459 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _460 from "./applications/transfer/v1/query.rpc.Query";
import * as _461 from "./core/channel/v1/query.rpc.Query";
import * as _462 from "./core/client/v1/query.rpc.Query";
import * as _463 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _464 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _465 from "./applications/transfer/v1/tx.rpc.msg";
import * as _466 from "./core/channel/v1/tx.rpc.msg";
import * as _467 from "./core/client/v1/tx.rpc.msg";
import * as _646 from "./rpc.query";
import * as _647 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._118,
          ..._119,
          ..._120,
          ..._448,
          ..._453,
          ..._458,
          ..._463
        };
      }
      export namespace host {
        export const v1 = {
          ..._121,
          ..._122,
          ..._123,
          ..._449,
          ..._454,
          ..._459,
          ..._464
        };
      }
      export const v1 = {
        ..._124,
        ..._125,
        ..._126
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._127,
        ..._128,
        ..._129,
        ..._130,
        ..._131,
        ..._450,
        ..._455,
        ..._460,
        ..._465
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._132,
        ..._133,
        ..._134,
        ..._135,
        ..._451,
        ..._456,
        ..._461,
        ..._466
      };
    }
    export namespace client {
      export const v1 = {
        ..._136,
        ..._137,
        ..._138,
        ..._139,
        ..._452,
        ..._457,
        ..._462,
        ..._467
      };
    }
  }
  export const ClientFactory = {
    ..._646,
    ..._647
  };
}