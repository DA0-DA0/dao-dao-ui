import * as _363 from "./compute/v1beta1/genesis";
import * as _364 from "./compute/v1beta1/msg";
import * as _365 from "./compute/v1beta1/query";
import * as _366 from "./compute/v1beta1/types";
import * as _367 from "./emergencybutton/v1beta1/genesis";
import * as _368 from "./emergencybutton/v1beta1/params";
import * as _369 from "./emergencybutton/v1beta1/query";
import * as _370 from "./emergencybutton/v1beta1/tx";
import * as _371 from "./intertx/v1beta1/query";
import * as _372 from "./intertx/v1beta1/tx";
import * as _373 from "./registration/v1beta1/genesis";
import * as _374 from "./registration/v1beta1/msg";
import * as _375 from "./registration/v1beta1/query";
import * as _376 from "./registration/v1beta1/types";
import * as _644 from "./compute/v1beta1/msg.amino";
import * as _645 from "./emergencybutton/v1beta1/tx.amino";
import * as _646 from "./intertx/v1beta1/tx.amino";
import * as _647 from "./compute/v1beta1/msg.registry";
import * as _648 from "./emergencybutton/v1beta1/tx.registry";
import * as _649 from "./intertx/v1beta1/tx.registry";
import * as _650 from "./compute/v1beta1/query.rpc.Query";
import * as _651 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _652 from "./intertx/v1beta1/query.rpc.Query";
import * as _653 from "./registration/v1beta1/query.rpc.Query";
import * as _654 from "./compute/v1beta1/msg.rpc.msg";
import * as _655 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _656 from "./intertx/v1beta1/tx.rpc.msg";
import * as _692 from "./rpc.query";
import * as _693 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._644,
      ..._647,
      ..._650,
      ..._654
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._367,
      ..._368,
      ..._369,
      ..._370,
      ..._645,
      ..._648,
      ..._651,
      ..._655
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._371,
      ..._372,
      ..._646,
      ..._649,
      ..._652,
      ..._656
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._373,
      ..._374,
      ..._375,
      ..._376,
      ..._653
    };
  }
  export const ClientFactory = {
    ..._692,
    ..._693
  };
}