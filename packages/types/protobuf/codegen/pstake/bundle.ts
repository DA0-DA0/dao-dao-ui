import * as _276 from "./liquidstake/v1beta1/genesis";
import * as _277 from "./liquidstake/v1beta1/liquidstake";
import * as _278 from "./liquidstake/v1beta1/query";
import * as _279 from "./liquidstake/v1beta1/tx";
import * as _280 from "./liquidstakeibc/v1beta1/genesis";
import * as _281 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _282 from "./liquidstakeibc/v1beta1/msgs";
import * as _283 from "./liquidstakeibc/v1beta1/params";
import * as _284 from "./liquidstakeibc/v1beta1/query";
import * as _285 from "./lscosmos/v1beta1/genesis";
import * as _286 from "./lscosmos/v1beta1/governance_proposal";
import * as _287 from "./lscosmos/v1beta1/lscosmos";
import * as _288 from "./lscosmos/v1beta1/msgs";
import * as _289 from "./lscosmos/v1beta1/params";
import * as _290 from "./lscosmos/v1beta1/query";
import * as _291 from "./ratesync/v1beta1/contract";
import * as _292 from "./ratesync/v1beta1/genesis";
import * as _293 from "./ratesync/v1beta1/params";
import * as _294 from "./ratesync/v1beta1/query";
import * as _295 from "./ratesync/v1beta1/ratesync";
import * as _296 from "./ratesync/v1beta1/tx";
import * as _560 from "./liquidstake/v1beta1/tx.amino";
import * as _561 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _562 from "./lscosmos/v1beta1/msgs.amino";
import * as _563 from "./ratesync/v1beta1/tx.amino";
import * as _564 from "./liquidstake/v1beta1/tx.registry";
import * as _565 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _566 from "./lscosmos/v1beta1/msgs.registry";
import * as _567 from "./ratesync/v1beta1/tx.registry";
import * as _568 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _569 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _570 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _571 from "./ratesync/v1beta1/query.rpc.Query";
import * as _572 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _573 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _574 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _575 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _649 from "./rpc.query";
import * as _650 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._560,
      ..._564,
      ..._568,
      ..._572
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._561,
      ..._565,
      ..._569,
      ..._573
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._562,
      ..._566,
      ..._570,
      ..._574
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._296,
      ..._563,
      ..._567,
      ..._571,
      ..._575
    };
  }
  export const ClientFactory = {
    ..._649,
    ..._650
  };
}