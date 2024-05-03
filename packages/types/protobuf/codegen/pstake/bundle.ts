import * as _269 from "./liquidstake/v1beta1/genesis";
import * as _270 from "./liquidstake/v1beta1/liquidstake";
import * as _271 from "./liquidstake/v1beta1/query";
import * as _272 from "./liquidstake/v1beta1/tx";
import * as _273 from "./liquidstakeibc/v1beta1/genesis";
import * as _274 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _275 from "./liquidstakeibc/v1beta1/msgs";
import * as _276 from "./liquidstakeibc/v1beta1/params";
import * as _277 from "./liquidstakeibc/v1beta1/query";
import * as _278 from "./lscosmos/v1beta1/genesis";
import * as _279 from "./lscosmos/v1beta1/governance_proposal";
import * as _280 from "./lscosmos/v1beta1/lscosmos";
import * as _281 from "./lscosmos/v1beta1/msgs";
import * as _282 from "./lscosmos/v1beta1/params";
import * as _283 from "./lscosmos/v1beta1/query";
import * as _284 from "./ratesync/v1beta1/contract";
import * as _285 from "./ratesync/v1beta1/genesis";
import * as _286 from "./ratesync/v1beta1/params";
import * as _287 from "./ratesync/v1beta1/query";
import * as _288 from "./ratesync/v1beta1/ratesync";
import * as _289 from "./ratesync/v1beta1/tx";
import * as _531 from "./liquidstake/v1beta1/tx.amino";
import * as _532 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _533 from "./lscosmos/v1beta1/msgs.amino";
import * as _534 from "./ratesync/v1beta1/tx.amino";
import * as _535 from "./liquidstake/v1beta1/tx.registry";
import * as _536 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _537 from "./lscosmos/v1beta1/msgs.registry";
import * as _538 from "./ratesync/v1beta1/tx.registry";
import * as _539 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _540 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _541 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _542 from "./ratesync/v1beta1/query.rpc.Query";
import * as _543 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _544 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _545 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _546 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _603 from "./rpc.query";
import * as _604 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._531,
      ..._535,
      ..._539,
      ..._543
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._532,
      ..._536,
      ..._540,
      ..._544
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._533,
      ..._537,
      ..._541,
      ..._545
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._534,
      ..._538,
      ..._542,
      ..._546
    };
  }
  export const ClientFactory = {
    ..._603,
    ..._604
  };
}