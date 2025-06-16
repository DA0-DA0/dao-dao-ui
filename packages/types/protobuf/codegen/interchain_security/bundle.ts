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
import * as _621 from "./ccv/consumer/v1/tx.amino";
import * as _622 from "./ccv/provider/v1/tx.amino";
import * as _623 from "./ccv/consumer/v1/tx.registry";
import * as _624 from "./ccv/provider/v1/tx.registry";
import * as _625 from "./ccv/consumer/v1/query.rpc.Query";
import * as _626 from "./ccv/provider/v1/query.rpc.Query";
import * as _627 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _628 from "./ccv/provider/v1/tx.rpc.msg";
import * as _863 from "./rpc.query";
import * as _864 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._161,
        ..._162,
        ..._163,
        ..._164,
        ..._621,
        ..._623,
        ..._625,
        ..._627
      };
    }
    export namespace provider {
      export const v1 = {
        ..._165,
        ..._166,
        ..._167,
        ..._168,
        ..._622,
        ..._624,
        ..._626,
        ..._628
      };
    }
    export const v1 = {
      ..._169,
      ..._170
    };
  }
  export const ClientFactory = {
    ..._863,
    ..._864
  };
}