import * as _298 from "./liquidstake/v1beta1/genesis";
import * as _299 from "./liquidstake/v1beta1/liquidstake";
import * as _300 from "./liquidstake/v1beta1/query";
import * as _301 from "./liquidstake/v1beta1/tx";
import * as _302 from "./liquidstakeibc/v1beta1/genesis";
import * as _303 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _304 from "./liquidstakeibc/v1beta1/msgs";
import * as _305 from "./liquidstakeibc/v1beta1/params";
import * as _306 from "./liquidstakeibc/v1beta1/query";
import * as _307 from "./lscosmos/v1beta1/genesis";
import * as _308 from "./lscosmos/v1beta1/governance_proposal";
import * as _309 from "./lscosmos/v1beta1/lscosmos";
import * as _310 from "./lscosmos/v1beta1/msgs";
import * as _311 from "./lscosmos/v1beta1/params";
import * as _312 from "./lscosmos/v1beta1/query";
import * as _313 from "./ratesync/v1beta1/contract";
import * as _314 from "./ratesync/v1beta1/genesis";
import * as _315 from "./ratesync/v1beta1/params";
import * as _316 from "./ratesync/v1beta1/query";
import * as _317 from "./ratesync/v1beta1/ratesync";
import * as _318 from "./ratesync/v1beta1/tx";
import * as _594 from "./liquidstake/v1beta1/tx.amino";
import * as _595 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _596 from "./lscosmos/v1beta1/msgs.amino";
import * as _597 from "./ratesync/v1beta1/tx.amino";
import * as _598 from "./liquidstake/v1beta1/tx.registry";
import * as _599 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _600 from "./lscosmos/v1beta1/msgs.registry";
import * as _601 from "./ratesync/v1beta1/tx.registry";
import * as _602 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _603 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _604 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _605 from "./ratesync/v1beta1/query.rpc.Query";
import * as _606 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _607 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _608 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _609 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _687 from "./rpc.query";
import * as _688 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._594,
      ..._598,
      ..._602,
      ..._606
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._302,
      ..._303,
      ..._304,
      ..._305,
      ..._306,
      ..._595,
      ..._599,
      ..._603,
      ..._607
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._307,
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._312,
      ..._596,
      ..._600,
      ..._604,
      ..._608
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._597,
      ..._601,
      ..._605,
      ..._609
    };
  }
  export const ClientFactory = {
    ..._687,
    ..._688
  };
}