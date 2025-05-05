import * as _154 from "./ccv/consumer/v1/consumer";
import * as _155 from "./ccv/consumer/v1/genesis";
import * as _156 from "./ccv/consumer/v1/query";
import * as _157 from "./ccv/consumer/v1/tx";
import * as _158 from "./ccv/provider/v1/genesis";
import * as _159 from "./ccv/provider/v1/provider";
import * as _160 from "./ccv/provider/v1/query";
import * as _161 from "./ccv/provider/v1/tx";
import * as _162 from "./ccv/v1/shared_consumer";
import * as _163 from "./ccv/v1/wire";
import * as _518 from "./ccv/consumer/v1/tx.amino";
import * as _519 from "./ccv/provider/v1/tx.amino";
import * as _520 from "./ccv/consumer/v1/tx.registry";
import * as _521 from "./ccv/provider/v1/tx.registry";
import * as _522 from "./ccv/consumer/v1/query.rpc.Query";
import * as _523 from "./ccv/provider/v1/query.rpc.Query";
import * as _524 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _525 from "./ccv/provider/v1/tx.rpc.msg";
import * as _715 from "./rpc.query";
import * as _716 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._154,
        ..._155,
        ..._156,
        ..._157,
        ..._518,
        ..._520,
        ..._522,
        ..._524
      };
    }
    export namespace provider {
      export const v1 = {
        ..._158,
        ..._159,
        ..._160,
        ..._161,
        ..._519,
        ..._521,
        ..._523,
        ..._525
      };
    }
    export const v1 = {
      ..._162,
      ..._163
    };
  }
  export const ClientFactory = {
    ..._715,
    ..._716
  };
}