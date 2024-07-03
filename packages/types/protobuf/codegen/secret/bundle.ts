import * as _360 from "./compute/v1beta1/genesis";
import * as _361 from "./compute/v1beta1/msg";
import * as _362 from "./compute/v1beta1/query";
import * as _363 from "./compute/v1beta1/types";
import * as _364 from "./emergencybutton/v1beta1/genesis";
import * as _365 from "./emergencybutton/v1beta1/params";
import * as _366 from "./emergencybutton/v1beta1/query";
import * as _367 from "./emergencybutton/v1beta1/tx";
import * as _368 from "./intertx/v1beta1/query";
import * as _369 from "./intertx/v1beta1/tx";
import * as _370 from "./registration/v1beta1/genesis";
import * as _371 from "./registration/v1beta1/msg";
import * as _372 from "./registration/v1beta1/query";
import * as _373 from "./registration/v1beta1/types";
import * as _641 from "./compute/v1beta1/msg.amino";
import * as _642 from "./emergencybutton/v1beta1/tx.amino";
import * as _643 from "./intertx/v1beta1/tx.amino";
import * as _644 from "./compute/v1beta1/msg.registry";
import * as _645 from "./emergencybutton/v1beta1/tx.registry";
import * as _646 from "./intertx/v1beta1/tx.registry";
import * as _647 from "./compute/v1beta1/query.rpc.Query";
import * as _648 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _649 from "./intertx/v1beta1/query.rpc.Query";
import * as _650 from "./registration/v1beta1/query.rpc.Query";
import * as _651 from "./compute/v1beta1/msg.rpc.msg";
import * as _652 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _653 from "./intertx/v1beta1/tx.rpc.msg";
import * as _689 from "./rpc.query";
import * as _690 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._360,
      ..._361,
      ..._362,
      ..._363,
      ..._641,
      ..._644,
      ..._647,
      ..._651
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._642,
      ..._645,
      ..._648,
      ..._652
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._368,
      ..._369,
      ..._643,
      ..._646,
      ..._649,
      ..._653
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._650
    };
  }
  export const ClientFactory = {
    ..._689,
    ..._690
  };
}