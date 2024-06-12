import * as _275 from "./liquidstake/v1beta1/genesis";
import * as _276 from "./liquidstake/v1beta1/liquidstake";
import * as _277 from "./liquidstake/v1beta1/query";
import * as _278 from "./liquidstake/v1beta1/tx";
import * as _279 from "./liquidstakeibc/v1beta1/genesis";
import * as _280 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _281 from "./liquidstakeibc/v1beta1/msgs";
import * as _282 from "./liquidstakeibc/v1beta1/params";
import * as _283 from "./liquidstakeibc/v1beta1/query";
import * as _284 from "./lscosmos/v1beta1/genesis";
import * as _285 from "./lscosmos/v1beta1/governance_proposal";
import * as _286 from "./lscosmos/v1beta1/lscosmos";
import * as _287 from "./lscosmos/v1beta1/msgs";
import * as _288 from "./lscosmos/v1beta1/params";
import * as _289 from "./lscosmos/v1beta1/query";
import * as _290 from "./ratesync/v1beta1/contract";
import * as _291 from "./ratesync/v1beta1/genesis";
import * as _292 from "./ratesync/v1beta1/params";
import * as _293 from "./ratesync/v1beta1/query";
import * as _294 from "./ratesync/v1beta1/ratesync";
import * as _295 from "./ratesync/v1beta1/tx";
import * as _544 from "./liquidstake/v1beta1/tx.amino";
import * as _545 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _546 from "./lscosmos/v1beta1/msgs.amino";
import * as _547 from "./ratesync/v1beta1/tx.amino";
import * as _548 from "./liquidstake/v1beta1/tx.registry";
import * as _549 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _550 from "./lscosmos/v1beta1/msgs.registry";
import * as _551 from "./ratesync/v1beta1/tx.registry";
import * as _552 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _553 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _554 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _555 from "./ratesync/v1beta1/query.rpc.Query";
import * as _556 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _557 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _558 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _559 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _617 from "./rpc.query";
import * as _618 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._544,
      ..._548,
      ..._552,
      ..._556
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._545,
      ..._549,
      ..._553,
      ..._557
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._546,
      ..._550,
      ..._554,
      ..._558
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._547,
      ..._551,
      ..._555,
      ..._559
    };
  }
  export const ClientFactory = {
    ..._617,
    ..._618
  };
}