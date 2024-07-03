import * as _147 from "./ccv/consumer/v1/consumer";
import * as _148 from "./ccv/consumer/v1/genesis";
import * as _149 from "./ccv/consumer/v1/query";
import * as _150 from "./ccv/consumer/v1/tx";
import * as _151 from "./ccv/v1/shared_consumer";
import * as _152 from "./ccv/v1/wire";
import * as _486 from "./ccv/consumer/v1/tx.amino";
import * as _487 from "./ccv/consumer/v1/tx.registry";
import * as _488 from "./ccv/consumer/v1/query.rpc.Query";
import * as _489 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _671 from "./rpc.query";
import * as _672 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._147,
        ..._148,
        ..._149,
        ..._150,
        ..._486,
        ..._487,
        ..._488,
        ..._489
      };
    }
    export const v1 = {
      ..._151,
      ..._152
    };
  }
  export const ClientFactory = {
    ..._671,
    ..._672
  };
}