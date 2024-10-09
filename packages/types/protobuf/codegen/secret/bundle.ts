import * as _364 from "./compute/v1beta1/genesis";
import * as _365 from "./compute/v1beta1/msg";
import * as _366 from "./compute/v1beta1/query";
import * as _367 from "./compute/v1beta1/types";
import * as _368 from "./emergencybutton/v1beta1/genesis";
import * as _369 from "./emergencybutton/v1beta1/params";
import * as _370 from "./emergencybutton/v1beta1/query";
import * as _371 from "./emergencybutton/v1beta1/tx";
import * as _372 from "./intertx/v1beta1/query";
import * as _373 from "./intertx/v1beta1/tx";
import * as _374 from "./registration/v1beta1/genesis";
import * as _375 from "./registration/v1beta1/msg";
import * as _376 from "./registration/v1beta1/query";
import * as _377 from "./registration/v1beta1/types";
import * as _645 from "./compute/v1beta1/msg.amino";
import * as _646 from "./emergencybutton/v1beta1/tx.amino";
import * as _647 from "./intertx/v1beta1/tx.amino";
import * as _648 from "./compute/v1beta1/msg.registry";
import * as _649 from "./emergencybutton/v1beta1/tx.registry";
import * as _650 from "./intertx/v1beta1/tx.registry";
import * as _651 from "./compute/v1beta1/query.rpc.Query";
import * as _652 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _653 from "./intertx/v1beta1/query.rpc.Query";
import * as _654 from "./registration/v1beta1/query.rpc.Query";
import * as _655 from "./compute/v1beta1/msg.rpc.msg";
import * as _656 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _657 from "./intertx/v1beta1/tx.rpc.msg";
import * as _693 from "./rpc.query";
import * as _694 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._645,
      ..._648,
      ..._651,
      ..._655
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._368,
      ..._369,
      ..._370,
      ..._371,
      ..._646,
      ..._649,
      ..._652,
      ..._656
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._372,
      ..._373,
      ..._647,
      ..._650,
      ..._653,
      ..._657
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._654
    };
  }
  export const ClientFactory = {
    ..._693,
    ..._694
  };
}