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
import * as _640 from "./compute/v1beta1/msg.amino";
import * as _641 from "./emergencybutton/v1beta1/tx.amino";
import * as _642 from "./intertx/v1beta1/tx.amino";
import * as _643 from "./compute/v1beta1/msg.registry";
import * as _644 from "./emergencybutton/v1beta1/tx.registry";
import * as _645 from "./intertx/v1beta1/tx.registry";
import * as _646 from "./compute/v1beta1/query.rpc.Query";
import * as _647 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _648 from "./intertx/v1beta1/query.rpc.Query";
import * as _649 from "./registration/v1beta1/query.rpc.Query";
import * as _650 from "./compute/v1beta1/msg.rpc.msg";
import * as _651 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _652 from "./intertx/v1beta1/tx.rpc.msg";
import * as _687 from "./rpc.query";
import * as _688 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._360,
      ..._361,
      ..._362,
      ..._363,
      ..._640,
      ..._643,
      ..._646,
      ..._650
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._641,
      ..._644,
      ..._647,
      ..._651
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._368,
      ..._369,
      ..._642,
      ..._645,
      ..._648,
      ..._652
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._649
    };
  }
  export const ClientFactory = {
    ..._687,
    ..._688
  };
}