import * as _150 from "./ccv/consumer/v1/consumer";
import * as _151 from "./ccv/consumer/v1/genesis";
import * as _152 from "./ccv/consumer/v1/query";
import * as _153 from "./ccv/consumer/v1/tx";
import * as _154 from "./ccv/provider/v1/genesis";
import * as _155 from "./ccv/provider/v1/provider";
import * as _156 from "./ccv/provider/v1/query";
import * as _157 from "./ccv/provider/v1/tx";
import * as _158 from "./ccv/v1/shared_consumer";
import * as _159 from "./ccv/v1/wire";
import * as _518 from "./ccv/consumer/v1/tx.amino";
import * as _519 from "./ccv/provider/v1/tx.amino";
import * as _520 from "./ccv/consumer/v1/tx.registry";
import * as _521 from "./ccv/provider/v1/tx.registry";
import * as _522 from "./ccv/consumer/v1/query.rpc.Query";
import * as _523 from "./ccv/provider/v1/query.rpc.Query";
import * as _524 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _525 from "./ccv/provider/v1/tx.rpc.msg";
import * as _719 from "./rpc.query";
import * as _720 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._150,
        ..._151,
        ..._152,
        ..._153,
        ..._518,
        ..._520,
        ..._522,
        ..._524
      };
    }
    export namespace provider {
      export const v1 = {
        ..._154,
        ..._155,
        ..._156,
        ..._157,
        ..._519,
        ..._521,
        ..._523,
        ..._525
      };
    }
    export const v1 = {
      ..._158,
      ..._159
    };
  }
  export const ClientFactory = {
    ..._719,
    ..._720
  };
}