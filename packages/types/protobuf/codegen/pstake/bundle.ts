import * as _315 from "./liquidstake/v1beta1/genesis";
import * as _316 from "./liquidstake/v1beta1/liquidstake";
import * as _317 from "./liquidstake/v1beta1/query";
import * as _318 from "./liquidstake/v1beta1/tx";
import * as _319 from "./liquidstakeibc/v1beta1/genesis";
import * as _320 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _321 from "./liquidstakeibc/v1beta1/msgs";
import * as _322 from "./liquidstakeibc/v1beta1/params";
import * as _323 from "./liquidstakeibc/v1beta1/query";
import * as _324 from "./lscosmos/v1beta1/genesis";
import * as _325 from "./lscosmos/v1beta1/governance_proposal";
import * as _326 from "./lscosmos/v1beta1/lscosmos";
import * as _327 from "./lscosmos/v1beta1/msgs";
import * as _328 from "./lscosmos/v1beta1/params";
import * as _329 from "./lscosmos/v1beta1/query";
import * as _330 from "./ratesync/v1beta1/contract";
import * as _331 from "./ratesync/v1beta1/genesis";
import * as _332 from "./ratesync/v1beta1/params";
import * as _333 from "./ratesync/v1beta1/query";
import * as _334 from "./ratesync/v1beta1/ratesync";
import * as _335 from "./ratesync/v1beta1/tx";
import * as _641 from "./liquidstake/v1beta1/tx.amino";
import * as _642 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _643 from "./lscosmos/v1beta1/msgs.amino";
import * as _644 from "./ratesync/v1beta1/tx.amino";
import * as _645 from "./liquidstake/v1beta1/tx.registry";
import * as _646 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _647 from "./lscosmos/v1beta1/msgs.registry";
import * as _648 from "./ratesync/v1beta1/tx.registry";
import * as _649 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _650 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _651 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _652 from "./ratesync/v1beta1/query.rpc.Query";
import * as _653 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _654 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _655 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _656 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _748 from "./rpc.query";
import * as _749 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._641,
      ..._645,
      ..._649,
      ..._653
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._323,
      ..._642,
      ..._646,
      ..._650,
      ..._654
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._324,
      ..._325,
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._643,
      ..._647,
      ..._651,
      ..._655
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._330,
      ..._331,
      ..._332,
      ..._333,
      ..._334,
      ..._335,
      ..._644,
      ..._648,
      ..._652,
      ..._656
    };
  }
  export const ClientFactory = {
    ..._748,
    ..._749
  };
}