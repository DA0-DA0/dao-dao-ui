import * as _122 from "./applications/interchain_accounts/controller/v1/controller";
import * as _123 from "./applications/interchain_accounts/controller/v1/query";
import * as _124 from "./applications/interchain_accounts/controller/v1/tx";
import * as _125 from "./applications/interchain_accounts/host/v1/host";
import * as _126 from "./applications/interchain_accounts/host/v1/query";
import * as _127 from "./applications/interchain_accounts/host/v1/tx";
import * as _128 from "./applications/interchain_accounts/v1/account";
import * as _129 from "./applications/interchain_accounts/v1/metadata";
import * as _130 from "./applications/interchain_accounts/v1/packet";
import * as _131 from "./applications/transfer/v1/authz";
import * as _132 from "./applications/transfer/v1/genesis";
import * as _133 from "./applications/transfer/v1/query";
import * as _134 from "./applications/transfer/v1/transfer";
import * as _135 from "./applications/transfer/v1/tx";
import * as _136 from "./core/channel/v1/channel";
import * as _137 from "./core/channel/v1/genesis";
import * as _138 from "./core/channel/v1/query";
import * as _139 from "./core/channel/v1/tx";
import * as _140 from "./core/client/v1/client";
import * as _141 from "./core/client/v1/genesis";
import * as _142 from "./core/client/v1/query";
import * as _143 from "./core/client/v1/tx";
import * as _144 from "./core/commitment/v1/commitment";
import * as _145 from "./core/connection/v1/connection";
import * as _146 from "./core/connection/v1/genesis";
import * as _147 from "./core/connection/v1/query";
import * as _148 from "./core/connection/v1/tx";
import * as _149 from "./lightclients/tendermint/v1/tendermint";
import * as _494 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _495 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _496 from "./applications/transfer/v1/tx.amino";
import * as _497 from "./core/channel/v1/tx.amino";
import * as _498 from "./core/client/v1/tx.amino";
import * as _499 from "./core/connection/v1/tx.amino";
import * as _500 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _501 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _502 from "./applications/transfer/v1/tx.registry";
import * as _503 from "./core/channel/v1/tx.registry";
import * as _504 from "./core/client/v1/tx.registry";
import * as _505 from "./core/connection/v1/tx.registry";
import * as _506 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _507 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _508 from "./applications/transfer/v1/query.rpc.Query";
import * as _509 from "./core/channel/v1/query.rpc.Query";
import * as _510 from "./core/client/v1/query.rpc.Query";
import * as _511 from "./core/connection/v1/query.rpc.Query";
import * as _512 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _513 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _514 from "./applications/transfer/v1/tx.rpc.msg";
import * as _515 from "./core/channel/v1/tx.rpc.msg";
import * as _516 from "./core/client/v1/tx.rpc.msg";
import * as _517 from "./core/connection/v1/tx.rpc.msg";
import * as _717 from "./rpc.query";
import * as _718 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._122,
          ..._123,
          ..._124,
          ..._494,
          ..._500,
          ..._506,
          ..._512
        };
      }
      export namespace host {
        export const v1 = {
          ..._125,
          ..._126,
          ..._127,
          ..._495,
          ..._501,
          ..._507,
          ..._513
        };
      }
      export const v1 = {
        ..._128,
        ..._129,
        ..._130
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._135,
        ..._496,
        ..._502,
        ..._508,
        ..._514
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._136,
        ..._137,
        ..._138,
        ..._139,
        ..._497,
        ..._503,
        ..._509,
        ..._515
      };
    }
    export namespace client {
      export const v1 = {
        ..._140,
        ..._141,
        ..._142,
        ..._143,
        ..._498,
        ..._504,
        ..._510,
        ..._516
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._144
      };
    }
    export namespace connection {
      export const v1 = {
        ..._145,
        ..._146,
        ..._147,
        ..._148,
        ..._499,
        ..._505,
        ..._511,
        ..._517
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._149
      };
    }
  }
  export const ClientFactory = {
    ..._717,
    ..._718
  };
}