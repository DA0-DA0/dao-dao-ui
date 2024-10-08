import * as _148 from "./ccv/consumer/v1/consumer";
import * as _149 from "./ccv/consumer/v1/genesis";
import * as _150 from "./ccv/consumer/v1/query";
import * as _151 from "./ccv/consumer/v1/tx";
import * as _152 from "./ccv/v1/shared_consumer";
import * as _153 from "./ccv/v1/wire";
import * as _490 from "./ccv/consumer/v1/tx.amino";
import * as _491 from "./ccv/consumer/v1/tx.registry";
import * as _492 from "./ccv/consumer/v1/query.rpc.Query";
import * as _493 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _675 from "./rpc.query";
import * as _676 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._148,
        ..._149,
        ..._150,
        ..._151,
        ..._490,
        ..._491,
        ..._492,
        ..._493
      };
    }
    export const v1 = {
      ..._152,
      ..._153
    };
  }
  export const ClientFactory = {
    ..._675,
    ..._676
  };
}