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
import * as _815 from "./liquidstake/v1beta1/tx.amino";
import * as _816 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _817 from "./lscosmos/v1beta1/msgs.amino";
import * as _818 from "./ratesync/v1beta1/tx.amino";
import * as _819 from "./liquidstake/v1beta1/tx.registry";
import * as _820 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _821 from "./lscosmos/v1beta1/msgs.registry";
import * as _822 from "./ratesync/v1beta1/tx.registry";
import * as _823 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _824 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _825 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _826 from "./ratesync/v1beta1/query.rpc.Query";
import * as _827 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _828 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _829 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _830 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _932 from "./rpc.query";
import * as _933 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._423,
      ..._424,
      ..._425,
      ..._426,
      ..._815,
      ..._819,
      ..._823,
      ..._827
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._427,
      ..._428,
      ..._429,
      ..._430,
      ..._431,
      ..._816,
      ..._820,
      ..._824,
      ..._828
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
      ..._817,
      ..._821,
      ..._825,
      ..._829
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
      ..._818,
      ..._822,
      ..._826,
      ..._830
    };
  }
  export const ClientFactory = {
    ..._932,
    ..._933
  };
}