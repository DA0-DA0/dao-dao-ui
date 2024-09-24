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
import * as _146 from "./lightclients/tendermint/v1/tendermint";
import * as _465 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _466 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _467 from "./applications/transfer/v1/tx.amino";
import * as _468 from "./core/channel/v1/tx.amino";
import * as _469 from "./core/client/v1/tx.amino";
import * as _470 from "./core/connection/v1/tx.amino";
import * as _471 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _472 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _473 from "./applications/transfer/v1/tx.registry";
import * as _474 from "./core/channel/v1/tx.registry";
import * as _475 from "./core/client/v1/tx.registry";
import * as _476 from "./core/connection/v1/tx.registry";
import * as _477 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _478 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _479 from "./applications/transfer/v1/query.rpc.Query";
import * as _480 from "./core/channel/v1/query.rpc.Query";
import * as _481 from "./core/client/v1/query.rpc.Query";
import * as _482 from "./core/connection/v1/query.rpc.Query";
import * as _483 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _484 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _485 from "./applications/transfer/v1/tx.rpc.msg";
import * as _486 from "./core/channel/v1/tx.rpc.msg";
import * as _487 from "./core/client/v1/tx.rpc.msg";
import * as _488 from "./core/connection/v1/tx.rpc.msg";
import * as _672 from "./rpc.query";
import * as _673 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._119,
          ..._120,
          ..._121,
          ..._465,
          ..._471,
          ..._477,
          ..._483
        };
      }
      export namespace host {
        export const v1 = {
          ..._122,
          ..._123,
          ..._124,
          ..._466,
          ..._472,
          ..._478,
          ..._484
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
        ..._467,
        ..._473,
        ..._479,
        ..._485
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
        ..._468,
        ..._474,
        ..._480,
        ..._486
      };
    }
    export namespace client {
      export const v1 = {
        ..._137,
        ..._138,
        ..._139,
        ..._140,
        ..._469,
        ..._475,
        ..._481,
        ..._487
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
        ..._470,
        ..._476,
        ..._482,
        ..._488
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._146
      };
    }
  }
  export const ClientFactory = {
    ..._672,
    ..._673
  };
}