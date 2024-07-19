import * as _119 from "./applications/interchain_accounts/controller/v1/controller";
import * as _120 from "./applications/interchain_accounts/controller/v1/query";
import * as _121 from "./applications/interchain_accounts/controller/v1/tx";
import * as _122 from "./applications/interchain_accounts/host/v1/host";
import * as _123 from "./applications/interchain_accounts/host/v1/query";
import * as _124 from "./applications/interchain_accounts/host/v1/tx";
import * as _125 from "./applications/interchain_accounts/v1/account";
import * as _126 from "./applications/interchain_accounts/v1/metadata";
import * as _127 from "./applications/interchain_accounts/v1/packet";
import * as _128 from "./applications/transfer/v1/authz";
import * as _129 from "./applications/transfer/v1/genesis";
import * as _130 from "./applications/transfer/v1/query";
import * as _131 from "./applications/transfer/v1/transfer";
import * as _132 from "./applications/transfer/v1/tx";
import * as _133 from "./core/channel/v1/channel";
import * as _134 from "./core/channel/v1/genesis";
import * as _135 from "./core/channel/v1/query";
import * as _136 from "./core/channel/v1/tx";
import * as _137 from "./core/client/v1/client";
import * as _138 from "./core/client/v1/genesis";
import * as _139 from "./core/client/v1/query";
import * as _140 from "./core/client/v1/tx";
import * as _141 from "./core/commitment/v1/commitment";
import * as _142 from "./core/connection/v1/connection";
import * as _143 from "./core/connection/v1/genesis";
import * as _144 from "./core/connection/v1/query";
import * as _145 from "./core/connection/v1/tx";
import * as _454 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _455 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _456 from "./applications/transfer/v1/tx.amino";
import * as _457 from "./core/channel/v1/tx.amino";
import * as _458 from "./core/client/v1/tx.amino";
import * as _459 from "./core/connection/v1/tx.amino";
import * as _460 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _461 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _462 from "./applications/transfer/v1/tx.registry";
import * as _463 from "./core/channel/v1/tx.registry";
import * as _464 from "./core/client/v1/tx.registry";
import * as _465 from "./core/connection/v1/tx.registry";
import * as _466 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _467 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _468 from "./applications/transfer/v1/query.rpc.Query";
import * as _469 from "./core/channel/v1/query.rpc.Query";
import * as _470 from "./core/client/v1/query.rpc.Query";
import * as _471 from "./core/connection/v1/query.rpc.Query";
import * as _472 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _473 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _474 from "./applications/transfer/v1/tx.rpc.msg";
import * as _475 from "./core/channel/v1/tx.rpc.msg";
import * as _476 from "./core/client/v1/tx.rpc.msg";
import * as _477 from "./core/connection/v1/tx.rpc.msg";
import * as _656 from "./rpc.query";
import * as _657 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._119,
          ..._120,
          ..._121,
          ..._454,
          ..._460,
          ..._466,
          ..._472
        };
      }
      export namespace host {
        export const v1 = {
          ..._122,
          ..._123,
          ..._124,
          ..._455,
          ..._461,
          ..._467,
          ..._473
        };
      }
      export const v1 = {
        ..._125,
        ..._126,
        ..._127
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._128,
        ..._129,
        ..._130,
        ..._131,
        ..._132,
        ..._456,
        ..._462,
        ..._468,
        ..._474
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._133,
        ..._134,
        ..._135,
        ..._136,
        ..._457,
        ..._463,
        ..._469,
        ..._475
      };
    }
    export namespace client {
      export const v1 = {
        ..._137,
        ..._138,
        ..._139,
        ..._140,
        ..._458,
        ..._464,
        ..._470,
        ..._476
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._141
      };
    }
    export namespace connection {
      export const v1 = {
        ..._142,
        ..._143,
        ..._144,
        ..._145,
        ..._459,
        ..._465,
        ..._471,
        ..._477
      };
    }
  }
  export const ClientFactory = {
    ..._656,
    ..._657
  };
}