import * as _129 from "./applications/interchain_accounts/controller/v1/controller";
import * as _130 from "./applications/interchain_accounts/controller/v1/query";
import * as _131 from "./applications/interchain_accounts/controller/v1/tx";
import * as _132 from "./applications/interchain_accounts/host/v1/host";
import * as _133 from "./applications/interchain_accounts/host/v1/query";
import * as _134 from "./applications/interchain_accounts/host/v1/tx";
import * as _135 from "./applications/interchain_accounts/v1/account";
import * as _136 from "./applications/interchain_accounts/v1/metadata";
import * as _137 from "./applications/interchain_accounts/v1/packet";
import * as _138 from "./applications/transfer/v1/authz";
import * as _139 from "./applications/transfer/v1/denomtrace";
import * as _140 from "./applications/transfer/v1/genesis";
import * as _141 from "./applications/transfer/v1/packet";
import * as _142 from "./applications/transfer/v1/query";
import * as _143 from "./applications/transfer/v1/token";
import * as _144 from "./applications/transfer/v1/transfer";
import * as _145 from "./applications/transfer/v1/tx";
import * as _146 from "./core/channel/v1/channel";
import * as _147 from "./core/channel/v1/genesis";
import * as _148 from "./core/channel/v1/query";
import * as _149 from "./core/channel/v1/tx";
import * as _150 from "./core/client/v1/client";
import * as _151 from "./core/client/v1/genesis";
import * as _152 from "./core/client/v1/query";
import * as _153 from "./core/client/v1/tx";
import * as _154 from "./core/commitment/v1/commitment";
import * as _155 from "./core/commitment/v2/commitment";
import * as _156 from "./core/connection/v1/connection";
import * as _157 from "./core/connection/v1/genesis";
import * as _158 from "./core/connection/v1/query";
import * as _159 from "./core/connection/v1/tx";
import * as _160 from "./lightclients/tendermint/v1/tendermint";
import * as _509 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _510 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _511 from "./applications/transfer/v1/tx.amino";
import * as _512 from "./core/channel/v1/tx.amino";
import * as _513 from "./core/client/v1/tx.amino";
import * as _514 from "./core/connection/v1/tx.amino";
import * as _515 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _516 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _517 from "./applications/transfer/v1/tx.registry";
import * as _518 from "./core/channel/v1/tx.registry";
import * as _519 from "./core/client/v1/tx.registry";
import * as _520 from "./core/connection/v1/tx.registry";
import * as _521 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _522 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _523 from "./applications/transfer/v1/query.rpc.Query";
import * as _524 from "./core/channel/v1/query.rpc.Query";
import * as _525 from "./core/client/v1/query.rpc.Query";
import * as _526 from "./core/connection/v1/query.rpc.Query";
import * as _527 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _528 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _529 from "./applications/transfer/v1/tx.rpc.msg";
import * as _530 from "./core/channel/v1/tx.rpc.msg";
import * as _531 from "./core/client/v1/tx.rpc.msg";
import * as _532 from "./core/connection/v1/tx.rpc.msg";
import * as _734 from "./rpc.query";
import * as _735 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._129,
          ..._130,
          ..._131,
          ..._509,
          ..._515,
          ..._521,
          ..._527
        };
      }
      export namespace host {
        export const v1 = {
          ..._132,
          ..._133,
          ..._134,
          ..._510,
          ..._516,
          ..._522,
          ..._528
        };
      }
      export const v1 = {
        ..._135,
        ..._136,
        ..._137
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._138,
        ..._139,
        ..._140,
        ..._141,
        ..._142,
        ..._143,
        ..._144,
        ..._145,
        ..._511,
        ..._517,
        ..._523,
        ..._529
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._146,
        ..._147,
        ..._148,
        ..._149,
        ..._512,
        ..._518,
        ..._524,
        ..._530
      };
    }
    export namespace client {
      export const v1 = {
        ..._150,
        ..._151,
        ..._152,
        ..._153,
        ..._513,
        ..._519,
        ..._525,
        ..._531
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._154
      };
      export const v2 = {
        ..._155
      };
    }
    export namespace connection {
      export const v1 = {
        ..._156,
        ..._157,
        ..._158,
        ..._159,
        ..._514,
        ..._520,
        ..._526,
        ..._532
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._160
      };
    }
  }
  export const ClientFactory = {
    ..._734,
    ..._735
  };
}