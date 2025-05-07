import * as _381 from "./compute/v1beta1/genesis";
import * as _382 from "./compute/v1beta1/msg";
import * as _383 from "./compute/v1beta1/query";
import * as _384 from "./compute/v1beta1/types";
import * as _385 from "./emergencybutton/v1beta1/genesis";
import * as _386 from "./emergencybutton/v1beta1/params";
import * as _387 from "./emergencybutton/v1beta1/query";
import * as _388 from "./emergencybutton/v1beta1/tx";
import * as _389 from "./intertx/v1beta1/query";
import * as _390 from "./intertx/v1beta1/tx";
import * as _391 from "./registration/v1beta1/genesis";
import * as _392 from "./registration/v1beta1/msg";
import * as _393 from "./registration/v1beta1/query";
import * as _394 from "./registration/v1beta1/types";
import * as _692 from "./compute/v1beta1/msg.amino";
import * as _693 from "./emergencybutton/v1beta1/tx.amino";
import * as _694 from "./intertx/v1beta1/tx.amino";
import * as _695 from "./compute/v1beta1/msg.registry";
import * as _696 from "./emergencybutton/v1beta1/tx.registry";
import * as _697 from "./intertx/v1beta1/tx.registry";
import * as _698 from "./compute/v1beta1/query.rpc.Query";
import * as _699 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _700 from "./intertx/v1beta1/query.rpc.Query";
import * as _701 from "./registration/v1beta1/query.rpc.Query";
import * as _702 from "./compute/v1beta1/msg.rpc.msg";
import * as _703 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _704 from "./intertx/v1beta1/tx.rpc.msg";
import * as _754 from "./rpc.query";
import * as _755 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._381,
      ..._382,
      ..._383,
      ..._384,
      ..._692,
      ..._695,
      ..._698,
      ..._702
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._385,
      ..._386,
      ..._387,
      ..._388,
      ..._693,
      ..._696,
      ..._699,
      ..._703
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._389,
      ..._390,
      ..._694,
      ..._697,
      ..._700,
      ..._704
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._391,
      ..._392,
      ..._393,
      ..._394,
      ..._701
    };
  }
  export const ClientFactory = {
    ..._754,
    ..._755
  };
}