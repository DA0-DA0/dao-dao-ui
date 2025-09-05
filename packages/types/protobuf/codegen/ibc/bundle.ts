import * as _149 from "./applications/interchain_accounts/controller/v1/controller";
import * as _150 from "./applications/interchain_accounts/controller/v1/query";
import * as _151 from "./applications/interchain_accounts/controller/v1/tx";
import * as _152 from "./applications/interchain_accounts/host/v1/host";
import * as _153 from "./applications/interchain_accounts/host/v1/query";
import * as _154 from "./applications/interchain_accounts/host/v1/tx";
import * as _155 from "./applications/interchain_accounts/v1/account";
import * as _156 from "./applications/interchain_accounts/v1/metadata";
import * as _157 from "./applications/interchain_accounts/v1/packet";
import * as _158 from "./applications/transfer/v1/authz";
import * as _159 from "./applications/transfer/v1/denomtrace";
import * as _160 from "./applications/transfer/v1/genesis";
import * as _161 from "./applications/transfer/v1/packet";
import * as _162 from "./applications/transfer/v1/query";
import * as _163 from "./applications/transfer/v1/token";
import * as _164 from "./applications/transfer/v1/transfer";
import * as _165 from "./applications/transfer/v1/tx";
import * as _166 from "./core/channel/v1/channel";
import * as _167 from "./core/channel/v1/genesis";
import * as _168 from "./core/channel/v1/query";
import * as _169 from "./core/channel/v1/tx";
import * as _170 from "./core/client/v1/client";
import * as _171 from "./core/client/v1/genesis";
import * as _172 from "./core/client/v1/query";
import * as _173 from "./core/client/v1/tx";
import * as _174 from "./core/commitment/v1/commitment";
import * as _175 from "./core/commitment/v2/commitment";
import * as _176 from "./core/connection/v1/connection";
import * as _177 from "./core/connection/v1/genesis";
import * as _178 from "./core/connection/v1/query";
import * as _179 from "./core/connection/v1/tx";
import * as _180 from "./lightclients/tendermint/v1/tendermint";
import * as _630 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _631 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _632 from "./applications/transfer/v1/tx.amino";
import * as _633 from "./core/channel/v1/tx.amino";
import * as _634 from "./core/client/v1/tx.amino";
import * as _635 from "./core/connection/v1/tx.amino";
import * as _636 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _637 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _638 from "./applications/transfer/v1/tx.registry";
import * as _639 from "./core/channel/v1/tx.registry";
import * as _640 from "./core/client/v1/tx.registry";
import * as _641 from "./core/connection/v1/tx.registry";
import * as _642 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _643 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _644 from "./applications/transfer/v1/query.rpc.Query";
import * as _645 from "./core/channel/v1/query.rpc.Query";
import * as _646 from "./core/client/v1/query.rpc.Query";
import * as _647 from "./core/connection/v1/query.rpc.Query";
import * as _648 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _649 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _650 from "./applications/transfer/v1/tx.rpc.msg";
import * as _651 from "./core/channel/v1/tx.rpc.msg";
import * as _652 from "./core/client/v1/tx.rpc.msg";
import * as _653 from "./core/connection/v1/tx.rpc.msg";
import * as _898 from "./rpc.query";
import * as _899 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._149,
          ..._150,
          ..._151,
          ..._630,
          ..._636,
          ..._642,
          ..._648
        };
      }
      export namespace host {
        export const v1 = {
          ..._152,
          ..._153,
          ..._154,
          ..._631,
          ..._637,
          ..._643,
          ..._649
        };
      }
      export const v1 = {
        ..._155,
        ..._156,
        ..._157
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._158,
        ..._159,
        ..._160,
        ..._161,
        ..._162,
        ..._163,
        ..._164,
        ..._165,
        ..._632,
        ..._638,
        ..._644,
        ..._650
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._166,
        ..._167,
        ..._168,
        ..._169,
        ..._633,
        ..._639,
        ..._645,
        ..._651
      };
    }
    export namespace client {
      export const v1 = {
        ..._170,
        ..._171,
        ..._172,
        ..._173,
        ..._634,
        ..._640,
        ..._646,
        ..._652
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._174
      };
      export const v2 = {
        ..._175
      };
    }
    export namespace connection {
      export const v1 = {
        ..._176,
        ..._177,
        ..._178,
        ..._179,
        ..._635,
        ..._641,
        ..._647,
        ..._653
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._180
      };
    }
  }
  export const ClientFactory = {
    ..._898,
    ..._899
  };
}