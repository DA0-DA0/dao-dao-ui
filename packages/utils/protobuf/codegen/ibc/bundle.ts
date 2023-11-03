import * as _76 from "./applications/transfer/v1/authz";
import * as _77 from "./applications/transfer/v1/genesis";
import * as _78 from "./applications/transfer/v1/query";
import * as _79 from "./applications/transfer/v1/transfer";
import * as _80 from "./applications/transfer/v1/tx";
import * as _81 from "./core/channel/v1/channel";
import * as _82 from "./core/channel/v1/genesis";
import * as _83 from "./core/channel/v1/query";
import * as _84 from "./core/channel/v1/tx";
import * as _85 from "./core/client/v1/client";
import * as _240 from "./applications/transfer/v1/tx.amino";
import * as _241 from "./core/channel/v1/tx.amino";
import * as _242 from "./applications/transfer/v1/tx.registry";
import * as _243 from "./core/channel/v1/tx.registry";
import * as _244 from "./applications/transfer/v1/query.rpc.Query";
import * as _245 from "./core/channel/v1/query.rpc.Query";
import * as _246 from "./applications/transfer/v1/tx.rpc.msg";
import * as _247 from "./core/channel/v1/tx.rpc.msg";
import * as _323 from "./rpc.query";
import * as _324 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._76,
        ..._77,
        ..._78,
        ..._79,
        ..._80,
        ..._240,
        ..._242,
        ..._244,
        ..._246
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._81,
        ..._82,
        ..._83,
        ..._84,
        ..._241,
        ..._243,
        ..._245,
        ..._247
      };
    }
    export namespace client {
      export const v1 = {
        ..._85
      };
    }
  }
  export const ClientFactory = {
    ..._323,
    ..._324
  };
}