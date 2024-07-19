import * as _287 from "./liquidstake/v1beta1/genesis";
import * as _288 from "./liquidstake/v1beta1/liquidstake";
import * as _289 from "./liquidstake/v1beta1/query";
import * as _290 from "./liquidstake/v1beta1/tx";
import * as _291 from "./liquidstakeibc/v1beta1/genesis";
import * as _292 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _293 from "./liquidstakeibc/v1beta1/msgs";
import * as _294 from "./liquidstakeibc/v1beta1/params";
import * as _295 from "./liquidstakeibc/v1beta1/query";
import * as _296 from "./lscosmos/v1beta1/genesis";
import * as _297 from "./lscosmos/v1beta1/governance_proposal";
import * as _298 from "./lscosmos/v1beta1/lscosmos";
import * as _299 from "./lscosmos/v1beta1/msgs";
import * as _300 from "./lscosmos/v1beta1/params";
import * as _301 from "./lscosmos/v1beta1/query";
import * as _302 from "./ratesync/v1beta1/contract";
import * as _303 from "./ratesync/v1beta1/genesis";
import * as _304 from "./ratesync/v1beta1/params";
import * as _305 from "./ratesync/v1beta1/query";
import * as _306 from "./ratesync/v1beta1/ratesync";
import * as _307 from "./ratesync/v1beta1/tx";
import * as _578 from "./liquidstake/v1beta1/tx.amino";
import * as _579 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _580 from "./lscosmos/v1beta1/msgs.amino";
import * as _581 from "./ratesync/v1beta1/tx.amino";
import * as _582 from "./liquidstake/v1beta1/tx.registry";
import * as _583 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _584 from "./lscosmos/v1beta1/msgs.registry";
import * as _585 from "./ratesync/v1beta1/tx.registry";
import * as _586 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _587 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _588 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _589 from "./ratesync/v1beta1/query.rpc.Query";
import * as _590 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _591 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _592 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _593 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _668 from "./rpc.query";
import * as _669 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._578,
      ..._582,
      ..._586,
      ..._590
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._579,
      ..._583,
      ..._587,
      ..._591
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._296,
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._580,
      ..._584,
      ..._588,
      ..._592
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._302,
      ..._303,
      ..._304,
      ..._305,
      ..._306,
      ..._307,
      ..._581,
      ..._585,
      ..._589,
      ..._593
    };
  }
  export const ClientFactory = {
    ..._668,
    ..._669
  };
}