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
import * as _551 from "./liquidstake/v1beta1/tx.amino";
import * as _552 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _553 from "./lscosmos/v1beta1/msgs.amino";
import * as _554 from "./ratesync/v1beta1/tx.amino";
import * as _555 from "./liquidstake/v1beta1/tx.registry";
import * as _556 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _557 from "./lscosmos/v1beta1/msgs.registry";
import * as _558 from "./ratesync/v1beta1/tx.registry";
import * as _559 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _560 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _561 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _562 from "./ratesync/v1beta1/query.rpc.Query";
import * as _563 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _564 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _565 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _566 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _637 from "./rpc.query";
import * as _638 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._272,
      ..._273,
      ..._274,
      ..._275,
      ..._551,
      ..._555,
      ..._559,
      ..._563
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._280,
      ..._552,
      ..._556,
      ..._560,
      ..._564
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
      ..._553,
      ..._557,
      ..._561,
      ..._565
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
      ..._554,
      ..._558,
      ..._562,
      ..._566
    };
  }
  export const ClientFactory = {
    ..._637,
    ..._638
  };
}