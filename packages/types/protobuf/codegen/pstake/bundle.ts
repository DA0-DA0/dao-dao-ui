import * as _272 from "./liquidstake/v1beta1/genesis";
import * as _273 from "./liquidstake/v1beta1/liquidstake";
import * as _274 from "./liquidstake/v1beta1/query";
import * as _275 from "./liquidstake/v1beta1/tx";
import * as _276 from "./liquidstakeibc/v1beta1/genesis";
import * as _277 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _278 from "./liquidstakeibc/v1beta1/msgs";
import * as _279 from "./liquidstakeibc/v1beta1/params";
import * as _280 from "./liquidstakeibc/v1beta1/query";
import * as _281 from "./lscosmos/v1beta1/genesis";
import * as _282 from "./lscosmos/v1beta1/governance_proposal";
import * as _283 from "./lscosmos/v1beta1/lscosmos";
import * as _284 from "./lscosmos/v1beta1/msgs";
import * as _285 from "./lscosmos/v1beta1/params";
import * as _286 from "./lscosmos/v1beta1/query";
import * as _287 from "./ratesync/v1beta1/contract";
import * as _288 from "./ratesync/v1beta1/genesis";
import * as _289 from "./ratesync/v1beta1/params";
import * as _290 from "./ratesync/v1beta1/query";
import * as _291 from "./ratesync/v1beta1/ratesync";
import * as _292 from "./ratesync/v1beta1/tx";
import * as _537 from "./liquidstake/v1beta1/tx.amino";
import * as _538 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _539 from "./lscosmos/v1beta1/msgs.amino";
import * as _540 from "./ratesync/v1beta1/tx.amino";
import * as _541 from "./liquidstake/v1beta1/tx.registry";
import * as _542 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _543 from "./lscosmos/v1beta1/msgs.registry";
import * as _544 from "./ratesync/v1beta1/tx.registry";
import * as _545 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _546 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _547 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _548 from "./ratesync/v1beta1/query.rpc.Query";
import * as _549 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _550 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _551 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _552 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _610 from "./rpc.query";
import * as _611 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._272,
      ..._273,
      ..._274,
      ..._275,
      ..._537,
      ..._541,
      ..._545,
      ..._549
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._280,
      ..._538,
      ..._542,
      ..._546,
      ..._550
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._285,
      ..._286,
      ..._539,
      ..._543,
      ..._547,
      ..._551
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._291,
      ..._292,
      ..._540,
      ..._544,
      ..._548,
      ..._552
    };
  }
  export const ClientFactory = {
    ..._610,
    ..._611
  };
}