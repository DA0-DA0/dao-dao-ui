import * as _423 from "./liquidstake/v1beta1/genesis";
import * as _424 from "./liquidstake/v1beta1/liquidstake";
import * as _425 from "./liquidstake/v1beta1/query";
import * as _426 from "./liquidstake/v1beta1/tx";
import * as _427 from "./liquidstakeibc/v1beta1/genesis";
import * as _428 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _429 from "./liquidstakeibc/v1beta1/msgs";
import * as _430 from "./liquidstakeibc/v1beta1/params";
import * as _431 from "./liquidstakeibc/v1beta1/query";
import * as _432 from "./lscosmos/v1beta1/genesis";
import * as _433 from "./lscosmos/v1beta1/governance_proposal";
import * as _434 from "./lscosmos/v1beta1/lscosmos";
import * as _435 from "./lscosmos/v1beta1/msgs";
import * as _436 from "./lscosmos/v1beta1/params";
import * as _437 from "./lscosmos/v1beta1/query";
import * as _438 from "./ratesync/v1beta1/contract";
import * as _439 from "./ratesync/v1beta1/genesis";
import * as _440 from "./ratesync/v1beta1/params";
import * as _441 from "./ratesync/v1beta1/query";
import * as _442 from "./ratesync/v1beta1/ratesync";
import * as _443 from "./ratesync/v1beta1/tx";
import * as _801 from "./liquidstake/v1beta1/tx.amino";
import * as _802 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _803 from "./lscosmos/v1beta1/msgs.amino";
import * as _804 from "./ratesync/v1beta1/tx.amino";
import * as _805 from "./liquidstake/v1beta1/tx.registry";
import * as _806 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _807 from "./lscosmos/v1beta1/msgs.registry";
import * as _808 from "./ratesync/v1beta1/tx.registry";
import * as _809 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _810 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _811 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _812 from "./ratesync/v1beta1/query.rpc.Query";
import * as _813 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _814 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _815 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _816 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _914 from "./rpc.query";
import * as _915 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._423,
      ..._424,
      ..._425,
      ..._426,
      ..._801,
      ..._805,
      ..._809,
      ..._813
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._427,
      ..._428,
      ..._429,
      ..._430,
      ..._431,
      ..._802,
      ..._806,
      ..._810,
      ..._814
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._432,
      ..._433,
      ..._434,
      ..._435,
      ..._436,
      ..._437,
      ..._803,
      ..._807,
      ..._811,
      ..._815
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._438,
      ..._439,
      ..._440,
      ..._441,
      ..._442,
      ..._443,
      ..._804,
      ..._808,
      ..._812,
      ..._816
    };
  }
  export const ClientFactory = {
    ..._914,
    ..._915
  };
}