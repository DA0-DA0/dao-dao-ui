import * as _308 from "./liquidstake/v1beta1/genesis";
import * as _309 from "./liquidstake/v1beta1/liquidstake";
import * as _310 from "./liquidstake/v1beta1/query";
import * as _311 from "./liquidstake/v1beta1/tx";
import * as _312 from "./liquidstakeibc/v1beta1/genesis";
import * as _313 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _314 from "./liquidstakeibc/v1beta1/msgs";
import * as _315 from "./liquidstakeibc/v1beta1/params";
import * as _316 from "./liquidstakeibc/v1beta1/query";
import * as _317 from "./lscosmos/v1beta1/genesis";
import * as _318 from "./lscosmos/v1beta1/governance_proposal";
import * as _319 from "./lscosmos/v1beta1/lscosmos";
import * as _320 from "./lscosmos/v1beta1/msgs";
import * as _321 from "./lscosmos/v1beta1/params";
import * as _322 from "./lscosmos/v1beta1/query";
import * as _323 from "./ratesync/v1beta1/contract";
import * as _324 from "./ratesync/v1beta1/genesis";
import * as _325 from "./ratesync/v1beta1/params";
import * as _326 from "./ratesync/v1beta1/query";
import * as _327 from "./ratesync/v1beta1/ratesync";
import * as _328 from "./ratesync/v1beta1/tx";
import * as _630 from "./liquidstake/v1beta1/tx.amino";
import * as _631 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _632 from "./lscosmos/v1beta1/msgs.amino";
import * as _633 from "./ratesync/v1beta1/tx.amino";
import * as _634 from "./liquidstake/v1beta1/tx.registry";
import * as _635 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _636 from "./lscosmos/v1beta1/msgs.registry";
import * as _637 from "./ratesync/v1beta1/tx.registry";
import * as _638 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _639 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _640 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _641 from "./ratesync/v1beta1/query.rpc.Query";
import * as _642 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _643 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _644 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _645 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _735 from "./rpc.query";
import * as _736 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._630,
      ..._634,
      ..._638,
      ..._642
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._631,
      ..._635,
      ..._639,
      ..._643
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._317,
      ..._318,
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._632,
      ..._636,
      ..._640,
      ..._644
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._323,
      ..._324,
      ..._325,
      ..._326,
      ..._327,
      ..._328,
      ..._633,
      ..._637,
      ..._641,
      ..._645
    };
  }
  export const ClientFactory = {
    ..._735,
    ..._736
  };
}