import * as _73 from "./applications/transfer/v1/authz";
import * as _74 from "./applications/transfer/v1/genesis";
import * as _75 from "./applications/transfer/v1/query";
import * as _76 from "./applications/transfer/v1/transfer";
import * as _77 from "./applications/transfer/v1/tx";
import * as _78 from "./core/channel/v1/channel";
import * as _79 from "./core/channel/v1/genesis";
import * as _80 from "./core/channel/v1/query";
import * as _81 from "./core/channel/v1/tx";
import * as _82 from "./core/client/v1/client";
import * as _233 from "./applications/transfer/v1/tx.amino";
import * as _234 from "./core/channel/v1/tx.amino";
import * as _235 from "./applications/transfer/v1/tx.registry";
import * as _236 from "./core/channel/v1/tx.registry";
import * as _237 from "./applications/transfer/v1/query.rpc.Query";
import * as _238 from "./core/channel/v1/query.rpc.Query";
import * as _239 from "./applications/transfer/v1/tx.rpc.msg";
import * as _240 from "./core/channel/v1/tx.rpc.msg";
import * as _314 from "./rpc.query";
import * as _315 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._73,
        ..._74,
        ..._75,
        ..._76,
        ..._77,
        ..._233,
        ..._235,
        ..._237,
        ..._239
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._78,
        ..._79,
        ..._80,
        ..._81,
        ..._234,
        ..._236,
        ..._238,
        ..._240
      };
    }
    export namespace client {
      export const v1 = {
        ..._82
      };
    }
  }
  export const ClientFactory = {
    ..._314,
    ..._315
  };
}