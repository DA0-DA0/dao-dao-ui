import * as _117 from "./applications/interchain_accounts/controller/v1/controller";
import * as _118 from "./applications/interchain_accounts/controller/v1/query";
import * as _119 from "./applications/interchain_accounts/controller/v1/tx";
import * as _120 from "./applications/interchain_accounts/host/v1/host";
import * as _121 from "./applications/interchain_accounts/host/v1/query";
import * as _122 from "./applications/interchain_accounts/host/v1/tx";
import * as _123 from "./applications/interchain_accounts/v1/account";
import * as _124 from "./applications/interchain_accounts/v1/metadata";
import * as _125 from "./applications/interchain_accounts/v1/packet";
import * as _126 from "./applications/transfer/v1/authz";
import * as _127 from "./applications/transfer/v1/genesis";
import * as _128 from "./applications/transfer/v1/query";
import * as _129 from "./applications/transfer/v1/transfer";
import * as _130 from "./applications/transfer/v1/tx";
import * as _131 from "./core/channel/v1/channel";
import * as _132 from "./core/channel/v1/genesis";
import * as _133 from "./core/channel/v1/query";
import * as _134 from "./core/channel/v1/tx";
import * as _135 from "./core/client/v1/client";
import * as _136 from "./core/client/v1/genesis";
import * as _137 from "./core/client/v1/query";
import * as _138 from "./core/client/v1/tx";
import * as _428 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _429 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _430 from "./applications/transfer/v1/tx.amino";
import * as _431 from "./core/channel/v1/tx.amino";
import * as _432 from "./core/client/v1/tx.amino";
import * as _433 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _434 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _435 from "./applications/transfer/v1/tx.registry";
import * as _436 from "./core/channel/v1/tx.registry";
import * as _437 from "./core/client/v1/tx.registry";
import * as _438 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _439 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _440 from "./applications/transfer/v1/query.rpc.Query";
import * as _441 from "./core/channel/v1/query.rpc.Query";
import * as _442 from "./core/client/v1/query.rpc.Query";
import * as _443 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _444 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _445 from "./applications/transfer/v1/tx.rpc.msg";
import * as _446 from "./core/channel/v1/tx.rpc.msg";
import * as _447 from "./core/client/v1/tx.rpc.msg";
import * as _607 from "./rpc.query";
import * as _608 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._117,
          ..._118,
          ..._119,
          ..._428,
          ..._433,
          ..._438,
          ..._443
        };
      }
      export namespace host {
        export const v1 = {
          ..._120,
          ..._121,
          ..._122,
          ..._429,
          ..._434,
          ..._439,
          ..._444
        };
      }
      export const v1 = {
        ..._123,
        ..._124,
        ..._125
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._126,
        ..._127,
        ..._128,
        ..._129,
        ..._130,
        ..._430,
        ..._435,
        ..._440,
        ..._445
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._431,
        ..._436,
        ..._441,
        ..._446
      };
    }
    export namespace client {
      export const v1 = {
        ..._135,
        ..._136,
        ..._137,
        ..._138,
        ..._432,
        ..._437,
        ..._442,
        ..._447
      };
    }
  }
  export const ClientFactory = {
    ..._607,
    ..._608
  };
}