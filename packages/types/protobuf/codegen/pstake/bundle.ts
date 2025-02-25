import * as _304 from "./liquidstake/v1beta1/genesis";
import * as _305 from "./liquidstake/v1beta1/liquidstake";
import * as _306 from "./liquidstake/v1beta1/query";
import * as _307 from "./liquidstake/v1beta1/tx";
import * as _308 from "./liquidstakeibc/v1beta1/genesis";
import * as _309 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _310 from "./liquidstakeibc/v1beta1/msgs";
import * as _311 from "./liquidstakeibc/v1beta1/params";
import * as _312 from "./liquidstakeibc/v1beta1/query";
import * as _313 from "./lscosmos/v1beta1/genesis";
import * as _314 from "./lscosmos/v1beta1/governance_proposal";
import * as _315 from "./lscosmos/v1beta1/lscosmos";
import * as _316 from "./lscosmos/v1beta1/msgs";
import * as _317 from "./lscosmos/v1beta1/params";
import * as _318 from "./lscosmos/v1beta1/query";
import * as _319 from "./ratesync/v1beta1/contract";
import * as _320 from "./ratesync/v1beta1/genesis";
import * as _321 from "./ratesync/v1beta1/params";
import * as _322 from "./ratesync/v1beta1/query";
import * as _323 from "./ratesync/v1beta1/ratesync";
import * as _324 from "./ratesync/v1beta1/tx";
import * as _626 from "./liquidstake/v1beta1/tx.amino";
import * as _627 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _628 from "./lscosmos/v1beta1/msgs.amino";
import * as _629 from "./ratesync/v1beta1/tx.amino";
import * as _630 from "./liquidstake/v1beta1/tx.registry";
import * as _631 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _632 from "./lscosmos/v1beta1/msgs.registry";
import * as _633 from "./ratesync/v1beta1/tx.registry";
import * as _634 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _635 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _636 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _637 from "./ratesync/v1beta1/query.rpc.Query";
import * as _638 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _639 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _640 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _641 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _731 from "./rpc.query";
import * as _732 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._304,
      ..._305,
      ..._306,
      ..._307,
      ..._626,
      ..._630,
      ..._634,
      ..._638
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._312,
      ..._627,
      ..._631,
      ..._635,
      ..._639
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._628,
      ..._632,
      ..._636,
      ..._640
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._323,
      ..._324,
      ..._629,
      ..._633,
      ..._637,
      ..._641
    };
  }
  export const ClientFactory = {
    ..._731,
    ..._732
  };
}