import * as _403 from "./liquidstake/v1beta1/genesis";
import * as _404 from "./liquidstake/v1beta1/liquidstake";
import * as _405 from "./liquidstake/v1beta1/query";
import * as _406 from "./liquidstake/v1beta1/tx";
import * as _407 from "./liquidstakeibc/v1beta1/genesis";
import * as _408 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _409 from "./liquidstakeibc/v1beta1/msgs";
import * as _410 from "./liquidstakeibc/v1beta1/params";
import * as _411 from "./liquidstakeibc/v1beta1/query";
import * as _412 from "./lscosmos/v1beta1/genesis";
import * as _413 from "./lscosmos/v1beta1/governance_proposal";
import * as _414 from "./lscosmos/v1beta1/lscosmos";
import * as _415 from "./lscosmos/v1beta1/msgs";
import * as _416 from "./lscosmos/v1beta1/params";
import * as _417 from "./lscosmos/v1beta1/query";
import * as _418 from "./ratesync/v1beta1/contract";
import * as _419 from "./ratesync/v1beta1/genesis";
import * as _420 from "./ratesync/v1beta1/params";
import * as _421 from "./ratesync/v1beta1/query";
import * as _422 from "./ratesync/v1beta1/ratesync";
import * as _423 from "./ratesync/v1beta1/tx";
import * as _768 from "./liquidstake/v1beta1/tx.amino";
import * as _769 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _770 from "./lscosmos/v1beta1/msgs.amino";
import * as _771 from "./ratesync/v1beta1/tx.amino";
import * as _772 from "./liquidstake/v1beta1/tx.registry";
import * as _773 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _774 from "./lscosmos/v1beta1/msgs.registry";
import * as _775 from "./ratesync/v1beta1/tx.registry";
import * as _776 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _777 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _778 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _779 from "./ratesync/v1beta1/query.rpc.Query";
import * as _780 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _781 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _782 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _783 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _877 from "./rpc.query";
import * as _878 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._403,
      ..._404,
      ..._405,
      ..._406,
      ..._768,
      ..._772,
      ..._776,
      ..._780
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._407,
      ..._408,
      ..._409,
      ..._410,
      ..._411,
      ..._769,
      ..._773,
      ..._777,
      ..._781
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._412,
      ..._413,
      ..._414,
      ..._415,
      ..._416,
      ..._417,
      ..._770,
      ..._774,
      ..._778,
      ..._782
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._418,
      ..._419,
      ..._420,
      ..._421,
      ..._422,
      ..._423,
      ..._771,
      ..._775,
      ..._779,
      ..._783
    };
  }
  export const ClientFactory = {
    ..._877,
    ..._878
  };
}