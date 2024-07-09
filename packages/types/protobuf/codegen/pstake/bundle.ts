import * as _281 from "./liquidstake/v1beta1/genesis";
import * as _282 from "./liquidstake/v1beta1/liquidstake";
import * as _283 from "./liquidstake/v1beta1/query";
import * as _284 from "./liquidstake/v1beta1/tx";
import * as _285 from "./liquidstakeibc/v1beta1/genesis";
import * as _286 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _287 from "./liquidstakeibc/v1beta1/msgs";
import * as _288 from "./liquidstakeibc/v1beta1/params";
import * as _289 from "./liquidstakeibc/v1beta1/query";
import * as _290 from "./lscosmos/v1beta1/genesis";
import * as _291 from "./lscosmos/v1beta1/governance_proposal";
import * as _292 from "./lscosmos/v1beta1/lscosmos";
import * as _293 from "./lscosmos/v1beta1/msgs";
import * as _294 from "./lscosmos/v1beta1/params";
import * as _295 from "./lscosmos/v1beta1/query";
import * as _296 from "./ratesync/v1beta1/contract";
import * as _297 from "./ratesync/v1beta1/genesis";
import * as _298 from "./ratesync/v1beta1/params";
import * as _299 from "./ratesync/v1beta1/query";
import * as _300 from "./ratesync/v1beta1/ratesync";
import * as _301 from "./ratesync/v1beta1/tx";
import * as _568 from "./liquidstake/v1beta1/tx.amino";
import * as _569 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _570 from "./lscosmos/v1beta1/msgs.amino";
import * as _571 from "./ratesync/v1beta1/tx.amino";
import * as _572 from "./liquidstake/v1beta1/tx.registry";
import * as _573 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _574 from "./lscosmos/v1beta1/msgs.registry";
import * as _575 from "./ratesync/v1beta1/tx.registry";
import * as _576 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _577 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _578 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _579 from "./ratesync/v1beta1/query.rpc.Query";
import * as _580 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _581 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _582 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _583 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _658 from "./rpc.query";
import * as _659 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._568,
      ..._572,
      ..._576,
      ..._580
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._569,
      ..._573,
      ..._577,
      ..._581
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._570,
      ..._574,
      ..._578,
      ..._582
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._296,
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._571,
      ..._575,
      ..._579,
      ..._583
    };
  }
  export const ClientFactory = {
    ..._658,
    ..._659
  };
}