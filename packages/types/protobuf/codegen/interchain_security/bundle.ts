import * as _181 from "./ccv/consumer/v1/consumer";
import * as _182 from "./ccv/consumer/v1/genesis";
import * as _183 from "./ccv/consumer/v1/query";
import * as _184 from "./ccv/consumer/v1/tx";
import * as _185 from "./ccv/provider/v1/genesis";
import * as _186 from "./ccv/provider/v1/provider";
import * as _187 from "./ccv/provider/v1/query";
import * as _188 from "./ccv/provider/v1/tx";
import * as _189 from "./ccv/v1/shared_consumer";
import * as _190 from "./ccv/v1/wire";
import * as _654 from "./ccv/consumer/v1/tx.amino";
import * as _655 from "./ccv/provider/v1/tx.amino";
import * as _656 from "./ccv/consumer/v1/tx.registry";
import * as _657 from "./ccv/provider/v1/tx.registry";
import * as _658 from "./ccv/consumer/v1/query.rpc.Query";
import * as _659 from "./ccv/provider/v1/query.rpc.Query";
import * as _660 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _661 from "./ccv/provider/v1/tx.rpc.msg";
import * as _900 from "./rpc.query";
import * as _901 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._181,
        ..._182,
        ..._183,
        ..._184,
        ..._654,
        ..._656,
        ..._658,
        ..._660
      };
    }
    export namespace provider {
      export const v1 = {
        ..._185,
        ..._186,
        ..._187,
        ..._188,
        ..._655,
        ..._657,
        ..._659,
        ..._661
      };
    }
    export const v1 = {
      ..._189,
      ..._190
    };
  }
  export const ClientFactory = {
    ..._900,
    ..._901
  };
}