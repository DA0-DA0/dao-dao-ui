import * as _266 from "./liquidstake/v1beta1/genesis";
import * as _267 from "./liquidstake/v1beta1/liquidstake";
import * as _268 from "./liquidstake/v1beta1/query";
import * as _269 from "./liquidstake/v1beta1/tx";
import * as _270 from "./liquidstakeibc/v1beta1/genesis";
import * as _271 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _272 from "./liquidstakeibc/v1beta1/msgs";
import * as _273 from "./liquidstakeibc/v1beta1/params";
import * as _274 from "./liquidstakeibc/v1beta1/query";
import * as _275 from "./lscosmos/v1beta1/genesis";
import * as _276 from "./lscosmos/v1beta1/governance_proposal";
import * as _277 from "./lscosmos/v1beta1/lscosmos";
import * as _278 from "./lscosmos/v1beta1/msgs";
import * as _279 from "./lscosmos/v1beta1/params";
import * as _280 from "./lscosmos/v1beta1/query";
import * as _281 from "./ratesync/v1beta1/contract";
import * as _282 from "./ratesync/v1beta1/genesis";
import * as _283 from "./ratesync/v1beta1/params";
import * as _284 from "./ratesync/v1beta1/query";
import * as _285 from "./ratesync/v1beta1/ratesync";
import * as _286 from "./ratesync/v1beta1/tx";
import * as _524 from "./liquidstake/v1beta1/tx.amino";
import * as _525 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _526 from "./lscosmos/v1beta1/msgs.amino";
import * as _527 from "./ratesync/v1beta1/tx.amino";
import * as _528 from "./liquidstake/v1beta1/tx.registry";
import * as _529 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _530 from "./lscosmos/v1beta1/msgs.registry";
import * as _531 from "./ratesync/v1beta1/tx.registry";
import * as _532 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _533 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _534 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _535 from "./ratesync/v1beta1/query.rpc.Query";
import * as _536 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _537 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _538 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _539 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _596 from "./rpc.query";
import * as _597 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._524,
      ..._528,
      ..._532,
      ..._536
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._274,
      ..._525,
      ..._529,
      ..._533,
      ..._537
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._280,
      ..._526,
      ..._530,
      ..._534,
      ..._538
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._285,
      ..._286,
      ..._527,
      ..._531,
      ..._535,
      ..._539
    };
  }
  export const ClientFactory = {
    ..._596,
    ..._597
  };
}