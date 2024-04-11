import * as _114 from "./applications/interchain_accounts/controller/v1/controller";
import * as _115 from "./applications/interchain_accounts/controller/v1/query";
import * as _116 from "./applications/interchain_accounts/controller/v1/tx";
import * as _117 from "./applications/interchain_accounts/host/v1/host";
import * as _118 from "./applications/interchain_accounts/host/v1/query";
import * as _119 from "./applications/interchain_accounts/host/v1/tx";
import * as _120 from "./applications/interchain_accounts/v1/account";
import * as _121 from "./applications/interchain_accounts/v1/metadata";
import * as _122 from "./applications/interchain_accounts/v1/packet";
import * as _123 from "./applications/transfer/v1/authz";
import * as _124 from "./applications/transfer/v1/genesis";
import * as _125 from "./applications/transfer/v1/query";
import * as _126 from "./applications/transfer/v1/transfer";
import * as _127 from "./applications/transfer/v1/tx";
import * as _128 from "./core/channel/v1/channel";
import * as _129 from "./core/channel/v1/genesis";
import * as _130 from "./core/channel/v1/query";
import * as _131 from "./core/channel/v1/tx";
import * as _132 from "./core/client/v1/client";
import * as _133 from "./core/client/v1/genesis";
import * as _134 from "./core/client/v1/query";
import * as _135 from "./core/client/v1/tx";
import * as _435 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _436 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _437 from "./applications/transfer/v1/tx.amino";
import * as _438 from "./core/channel/v1/tx.amino";
import * as _439 from "./core/client/v1/tx.amino";
import * as _440 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _441 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _442 from "./applications/transfer/v1/tx.registry";
import * as _443 from "./core/channel/v1/tx.registry";
import * as _444 from "./core/client/v1/tx.registry";
import * as _445 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _446 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _447 from "./applications/transfer/v1/query.rpc.Query";
import * as _448 from "./core/channel/v1/query.rpc.Query";
import * as _449 from "./core/client/v1/query.rpc.Query";
import * as _450 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _451 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _452 from "./applications/transfer/v1/tx.rpc.msg";
import * as _453 from "./core/channel/v1/tx.rpc.msg";
import * as _454 from "./core/client/v1/tx.rpc.msg";
import * as _627 from "./rpc.query";
import * as _628 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._114,
          ..._115,
          ..._116,
          ..._435,
          ..._440,
          ..._445,
          ..._450
        };
      }
      export namespace host {
        export const v1 = {
          ..._117,
          ..._118,
          ..._119,
          ..._436,
          ..._441,
          ..._446,
          ..._451
        };
      }
      export const v1 = {
        ..._120,
        ..._121,
        ..._122
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._123,
        ..._124,
        ..._125,
        ..._126,
        ..._127,
        ..._437,
        ..._442,
        ..._447,
        ..._452
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._128,
        ..._129,
        ..._130,
        ..._131,
        ..._438,
        ..._443,
        ..._448,
        ..._453
      };
    }
    export namespace client {
      export const v1 = {
        ..._132,
        ..._133,
        ..._134,
        ..._135,
        ..._439,
        ..._444,
        ..._449,
        ..._454
      };
    }
  }
  export const ClientFactory = {
    ..._627,
    ..._628
  };
}