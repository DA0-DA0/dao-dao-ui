import * as _294 from "./liquidstake/v1beta1/genesis";
import * as _295 from "./liquidstake/v1beta1/liquidstake";
import * as _296 from "./liquidstake/v1beta1/query";
import * as _297 from "./liquidstake/v1beta1/tx";
import * as _298 from "./liquidstakeibc/v1beta1/genesis";
import * as _299 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _300 from "./liquidstakeibc/v1beta1/msgs";
import * as _301 from "./liquidstakeibc/v1beta1/params";
import * as _302 from "./liquidstakeibc/v1beta1/query";
import * as _303 from "./lscosmos/v1beta1/genesis";
import * as _304 from "./lscosmos/v1beta1/governance_proposal";
import * as _305 from "./lscosmos/v1beta1/lscosmos";
import * as _306 from "./lscosmos/v1beta1/msgs";
import * as _307 from "./lscosmos/v1beta1/params";
import * as _308 from "./lscosmos/v1beta1/query";
import * as _309 from "./ratesync/v1beta1/contract";
import * as _310 from "./ratesync/v1beta1/genesis";
import * as _311 from "./ratesync/v1beta1/params";
import * as _312 from "./ratesync/v1beta1/query";
import * as _313 from "./ratesync/v1beta1/ratesync";
import * as _314 from "./ratesync/v1beta1/tx";
import * as _590 from "./liquidstake/v1beta1/tx.amino";
import * as _591 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _592 from "./lscosmos/v1beta1/msgs.amino";
import * as _593 from "./ratesync/v1beta1/tx.amino";
import * as _594 from "./liquidstake/v1beta1/tx.registry";
import * as _595 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _596 from "./lscosmos/v1beta1/msgs.registry";
import * as _597 from "./ratesync/v1beta1/tx.registry";
import * as _598 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _599 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _600 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _601 from "./ratesync/v1beta1/query.rpc.Query";
import * as _602 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _603 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _604 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _605 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _683 from "./rpc.query";
import * as _684 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._294,
      ..._295,
      ..._296,
      ..._297,
      ..._590,
      ..._594,
      ..._598,
      ..._602
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._302,
      ..._591,
      ..._595,
      ..._599,
      ..._603
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._303,
      ..._304,
      ..._305,
      ..._306,
      ..._307,
      ..._308,
      ..._592,
      ..._596,
      ..._600,
      ..._604
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._309,
      ..._310,
      ..._311,
      ..._312,
      ..._313,
      ..._314,
      ..._593,
      ..._597,
      ..._601,
      ..._605
    };
  }
  export const ClientFactory = {
    ..._683,
    ..._684
  };
}