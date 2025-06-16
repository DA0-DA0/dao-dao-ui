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
import * as _597 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _598 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _599 from "./applications/transfer/v1/tx.amino";
import * as _600 from "./core/channel/v1/tx.amino";
import * as _601 from "./core/client/v1/tx.amino";
import * as _602 from "./core/connection/v1/tx.amino";
import * as _603 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _604 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _605 from "./applications/transfer/v1/tx.registry";
import * as _606 from "./core/channel/v1/tx.registry";
import * as _607 from "./core/client/v1/tx.registry";
import * as _608 from "./core/connection/v1/tx.registry";
import * as _609 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _610 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _611 from "./applications/transfer/v1/query.rpc.Query";
import * as _612 from "./core/channel/v1/query.rpc.Query";
import * as _613 from "./core/client/v1/query.rpc.Query";
import * as _614 from "./core/connection/v1/query.rpc.Query";
import * as _615 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _616 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _617 from "./applications/transfer/v1/tx.rpc.msg";
import * as _618 from "./core/channel/v1/tx.rpc.msg";
import * as _619 from "./core/client/v1/tx.rpc.msg";
import * as _620 from "./core/connection/v1/tx.rpc.msg";
import * as _861 from "./rpc.query";
import * as _862 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._129,
          ..._130,
          ..._131,
          ..._597,
          ..._603,
          ..._609,
          ..._615
        };
      }
      export namespace host {
        export const v1 = {
          ..._132,
          ..._133,
          ..._134,
          ..._598,
          ..._604,
          ..._610,
          ..._616
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
        ..._599,
        ..._605,
        ..._611,
        ..._617
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
        ..._600,
        ..._606,
        ..._612,
        ..._618
      };
    }
    export namespace client {
      export const v1 = {
        ..._150,
        ..._151,
        ..._152,
        ..._153,
        ..._601,
        ..._607,
        ..._613,
        ..._619
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
        ..._602,
        ..._608,
        ..._614,
        ..._620
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
    ..._861,
    ..._862
  };
}