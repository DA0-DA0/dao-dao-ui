import * as _414 from "./liquidstake/v1beta1/genesis";
import * as _415 from "./liquidstake/v1beta1/liquidstake";
import * as _416 from "./liquidstake/v1beta1/query";
import * as _417 from "./liquidstake/v1beta1/tx";
import * as _418 from "./liquidstakeibc/v1beta1/genesis";
import * as _419 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _420 from "./liquidstakeibc/v1beta1/msgs";
import * as _421 from "./liquidstakeibc/v1beta1/params";
import * as _422 from "./liquidstakeibc/v1beta1/query";
import * as _423 from "./lscosmos/v1beta1/genesis";
import * as _424 from "./lscosmos/v1beta1/governance_proposal";
import * as _425 from "./lscosmos/v1beta1/lscosmos";
import * as _426 from "./lscosmos/v1beta1/msgs";
import * as _427 from "./lscosmos/v1beta1/params";
import * as _428 from "./lscosmos/v1beta1/query";
import * as _429 from "./ratesync/v1beta1/contract";
import * as _430 from "./ratesync/v1beta1/genesis";
import * as _431 from "./ratesync/v1beta1/params";
import * as _432 from "./ratesync/v1beta1/query";
import * as _433 from "./ratesync/v1beta1/ratesync";
import * as _434 from "./ratesync/v1beta1/tx";
import * as _788 from "./liquidstake/v1beta1/tx.amino";
import * as _789 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _790 from "./lscosmos/v1beta1/msgs.amino";
import * as _791 from "./ratesync/v1beta1/tx.amino";
import * as _792 from "./liquidstake/v1beta1/tx.registry";
import * as _793 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _794 from "./lscosmos/v1beta1/msgs.registry";
import * as _795 from "./ratesync/v1beta1/tx.registry";
import * as _796 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _797 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _798 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _799 from "./ratesync/v1beta1/query.rpc.Query";
import * as _800 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _801 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _802 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _803 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _901 from "./rpc.query";
import * as _902 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._414,
      ..._415,
      ..._416,
      ..._417,
      ..._788,
      ..._792,
      ..._796,
      ..._800
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._418,
      ..._419,
      ..._420,
      ..._421,
      ..._422,
      ..._789,
      ..._793,
      ..._797,
      ..._801
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._423,
      ..._424,
      ..._425,
      ..._426,
      ..._427,
      ..._428,
      ..._790,
      ..._794,
      ..._798,
      ..._802
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._429,
      ..._430,
      ..._431,
      ..._432,
      ..._433,
      ..._434,
      ..._791,
      ..._795,
      ..._799,
      ..._803
    };
  }
  export const ClientFactory = {
    ..._901,
    ..._902
  };
}