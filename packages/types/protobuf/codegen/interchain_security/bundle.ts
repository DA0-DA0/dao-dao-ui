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
import * as _668 from "./ccv/consumer/v1/tx.amino";
import * as _669 from "./ccv/provider/v1/tx.amino";
import * as _670 from "./ccv/consumer/v1/tx.registry";
import * as _671 from "./ccv/provider/v1/tx.registry";
import * as _672 from "./ccv/consumer/v1/query.rpc.Query";
import * as _673 from "./ccv/provider/v1/query.rpc.Query";
import * as _674 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _675 from "./ccv/provider/v1/tx.rpc.msg";
import * as _918 from "./rpc.query";
import * as _919 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._181,
        ..._182,
        ..._183,
        ..._184,
        ..._668,
        ..._670,
        ..._672,
        ..._674
      };
    }
    export namespace provider {
      export const v1 = {
        ..._185,
        ..._186,
        ..._187,
        ..._188,
        ..._669,
        ..._671,
        ..._673,
        ..._675
      };
    }
    export const v1 = {
      ..._189,
      ..._190
    };
  }
  export const ClientFactory = {
    ..._918,
    ..._919
  };
}