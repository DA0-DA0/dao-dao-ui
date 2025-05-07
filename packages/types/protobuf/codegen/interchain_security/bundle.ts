import * as _161 from "./ccv/consumer/v1/consumer";
import * as _162 from "./ccv/consumer/v1/genesis";
import * as _163 from "./ccv/consumer/v1/query";
import * as _164 from "./ccv/consumer/v1/tx";
import * as _165 from "./ccv/provider/v1/genesis";
import * as _166 from "./ccv/provider/v1/provider";
import * as _167 from "./ccv/provider/v1/query";
import * as _168 from "./ccv/provider/v1/tx";
import * as _169 from "./ccv/v1/shared_consumer";
import * as _170 from "./ccv/v1/wire";
import * as _533 from "./ccv/consumer/v1/tx.amino";
import * as _534 from "./ccv/provider/v1/tx.amino";
import * as _535 from "./ccv/consumer/v1/tx.registry";
import * as _536 from "./ccv/provider/v1/tx.registry";
import * as _537 from "./ccv/consumer/v1/query.rpc.Query";
import * as _538 from "./ccv/provider/v1/query.rpc.Query";
import * as _539 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _540 from "./ccv/provider/v1/tx.rpc.msg";
import * as _736 from "./rpc.query";
import * as _737 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._161,
        ..._162,
        ..._163,
        ..._164,
        ..._533,
        ..._535,
        ..._537,
        ..._539
      };
    }
    export namespace provider {
      export const v1 = {
        ..._165,
        ..._166,
        ..._167,
        ..._168,
        ..._534,
        ..._536,
        ..._538,
        ..._540
      };
    }
    export const v1 = {
      ..._169,
      ..._170
    };
  }
  export const ClientFactory = {
    ..._736,
    ..._737
  };
}