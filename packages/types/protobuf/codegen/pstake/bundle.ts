import * as _297 from "./liquidstake/v1beta1/genesis";
import * as _298 from "./liquidstake/v1beta1/liquidstake";
import * as _299 from "./liquidstake/v1beta1/query";
import * as _300 from "./liquidstake/v1beta1/tx";
import * as _301 from "./liquidstakeibc/v1beta1/genesis";
import * as _302 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _303 from "./liquidstakeibc/v1beta1/msgs";
import * as _304 from "./liquidstakeibc/v1beta1/params";
import * as _305 from "./liquidstakeibc/v1beta1/query";
import * as _306 from "./lscosmos/v1beta1/genesis";
import * as _307 from "./lscosmos/v1beta1/governance_proposal";
import * as _308 from "./lscosmos/v1beta1/lscosmos";
import * as _309 from "./lscosmos/v1beta1/msgs";
import * as _310 from "./lscosmos/v1beta1/params";
import * as _311 from "./lscosmos/v1beta1/query";
import * as _312 from "./ratesync/v1beta1/contract";
import * as _313 from "./ratesync/v1beta1/genesis";
import * as _314 from "./ratesync/v1beta1/params";
import * as _315 from "./ratesync/v1beta1/query";
import * as _316 from "./ratesync/v1beta1/ratesync";
import * as _317 from "./ratesync/v1beta1/tx";
import * as _593 from "./liquidstake/v1beta1/tx.amino";
import * as _594 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _595 from "./lscosmos/v1beta1/msgs.amino";
import * as _596 from "./ratesync/v1beta1/tx.amino";
import * as _597 from "./liquidstake/v1beta1/tx.registry";
import * as _598 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _599 from "./lscosmos/v1beta1/msgs.registry";
import * as _600 from "./ratesync/v1beta1/tx.registry";
import * as _601 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _602 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _603 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _604 from "./ratesync/v1beta1/query.rpc.Query";
import * as _605 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _606 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _607 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _608 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _686 from "./rpc.query";
import * as _687 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._593,
      ..._597,
      ..._601,
      ..._605
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._305,
      ..._594,
      ..._598,
      ..._602,
      ..._606
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._306,
      ..._307,
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._595,
      ..._599,
      ..._603,
      ..._607
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._317,
      ..._596,
      ..._600,
      ..._604,
      ..._608
    };
  }
  export const ClientFactory = {
    ..._686,
    ..._687
  };
}