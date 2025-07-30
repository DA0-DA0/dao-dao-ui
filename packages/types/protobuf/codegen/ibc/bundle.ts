import * as _140 from "./applications/interchain_accounts/controller/v1/controller";
import * as _141 from "./applications/interchain_accounts/controller/v1/query";
import * as _142 from "./applications/interchain_accounts/controller/v1/tx";
import * as _143 from "./applications/interchain_accounts/host/v1/host";
import * as _144 from "./applications/interchain_accounts/host/v1/query";
import * as _145 from "./applications/interchain_accounts/host/v1/tx";
import * as _146 from "./applications/interchain_accounts/v1/account";
import * as _147 from "./applications/interchain_accounts/v1/metadata";
import * as _148 from "./applications/interchain_accounts/v1/packet";
import * as _149 from "./applications/transfer/v1/authz";
import * as _150 from "./applications/transfer/v1/denomtrace";
import * as _151 from "./applications/transfer/v1/genesis";
import * as _152 from "./applications/transfer/v1/packet";
import * as _153 from "./applications/transfer/v1/query";
import * as _154 from "./applications/transfer/v1/token";
import * as _155 from "./applications/transfer/v1/transfer";
import * as _156 from "./applications/transfer/v1/tx";
import * as _157 from "./core/channel/v1/channel";
import * as _158 from "./core/channel/v1/genesis";
import * as _159 from "./core/channel/v1/query";
import * as _160 from "./core/channel/v1/tx";
import * as _161 from "./core/client/v1/client";
import * as _162 from "./core/client/v1/genesis";
import * as _163 from "./core/client/v1/query";
import * as _164 from "./core/client/v1/tx";
import * as _165 from "./core/commitment/v1/commitment";
import * as _166 from "./core/commitment/v2/commitment";
import * as _167 from "./core/connection/v1/connection";
import * as _168 from "./core/connection/v1/genesis";
import * as _169 from "./core/connection/v1/query";
import * as _170 from "./core/connection/v1/tx";
import * as _171 from "./lightclients/tendermint/v1/tendermint";
import * as _617 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _618 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _619 from "./applications/transfer/v1/tx.amino";
import * as _620 from "./core/channel/v1/tx.amino";
import * as _621 from "./core/client/v1/tx.amino";
import * as _622 from "./core/connection/v1/tx.amino";
import * as _623 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _624 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _625 from "./applications/transfer/v1/tx.registry";
import * as _626 from "./core/channel/v1/tx.registry";
import * as _627 from "./core/client/v1/tx.registry";
import * as _628 from "./core/connection/v1/tx.registry";
import * as _629 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _630 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _631 from "./applications/transfer/v1/query.rpc.Query";
import * as _632 from "./core/channel/v1/query.rpc.Query";
import * as _633 from "./core/client/v1/query.rpc.Query";
import * as _634 from "./core/connection/v1/query.rpc.Query";
import * as _635 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _636 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _637 from "./applications/transfer/v1/tx.rpc.msg";
import * as _638 from "./core/channel/v1/tx.rpc.msg";
import * as _639 from "./core/client/v1/tx.rpc.msg";
import * as _640 from "./core/connection/v1/tx.rpc.msg";
import * as _885 from "./rpc.query";
import * as _886 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._140,
          ..._141,
          ..._142,
          ..._617,
          ..._623,
          ..._629,
          ..._635
        };
      }
      export namespace host {
        export const v1 = {
          ..._143,
          ..._144,
          ..._145,
          ..._618,
          ..._624,
          ..._630,
          ..._636
        };
      }
      export const v1 = {
        ..._146,
        ..._147,
        ..._148
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._149,
        ..._150,
        ..._151,
        ..._152,
        ..._153,
        ..._154,
        ..._155,
        ..._156,
        ..._619,
        ..._625,
        ..._631,
        ..._637
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._157,
        ..._158,
        ..._159,
        ..._160,
        ..._620,
        ..._626,
        ..._632,
        ..._638
      };
    }
    export namespace client {
      export const v1 = {
        ..._161,
        ..._162,
        ..._163,
        ..._164,
        ..._621,
        ..._627,
        ..._633,
        ..._639
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._165
      };
      export const v2 = {
        ..._166
      };
    }
    export namespace connection {
      export const v1 = {
        ..._167,
        ..._168,
        ..._169,
        ..._170,
        ..._622,
        ..._628,
        ..._634,
        ..._640
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._171
      };
    }
  }
  export const ClientFactory = {
    ..._885,
    ..._886
  };
}