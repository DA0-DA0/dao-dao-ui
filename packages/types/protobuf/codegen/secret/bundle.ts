import * as _480 from "./compute/v1beta1/genesis";
import * as _481 from "./compute/v1beta1/msg";
import * as _482 from "./compute/v1beta1/query";
import * as _483 from "./compute/v1beta1/types";
import * as _484 from "./emergencybutton/v1beta1/genesis";
import * as _485 from "./emergencybutton/v1beta1/params";
import * as _486 from "./emergencybutton/v1beta1/query";
import * as _487 from "./emergencybutton/v1beta1/tx";
import * as _488 from "./intertx/v1beta1/query";
import * as _489 from "./intertx/v1beta1/tx";
import * as _490 from "./registration/v1beta1/genesis";
import * as _491 from "./registration/v1beta1/msg";
import * as _492 from "./registration/v1beta1/query";
import * as _493 from "./registration/v1beta1/types";
import * as _834 from "./compute/v1beta1/msg.amino";
import * as _835 from "./emergencybutton/v1beta1/tx.amino";
import * as _836 from "./intertx/v1beta1/tx.amino";
import * as _837 from "./compute/v1beta1/msg.registry";
import * as _838 from "./emergencybutton/v1beta1/tx.registry";
import * as _839 from "./intertx/v1beta1/tx.registry";
import * as _840 from "./compute/v1beta1/query.rpc.Query";
import * as _841 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _842 from "./intertx/v1beta1/query.rpc.Query";
import * as _843 from "./registration/v1beta1/query.rpc.Query";
import * as _844 from "./compute/v1beta1/msg.rpc.msg";
import * as _845 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _846 from "./intertx/v1beta1/tx.rpc.msg";
import * as _898 from "./rpc.query";
import * as _899 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._480,
      ..._481,
      ..._482,
      ..._483,
      ..._834,
      ..._837,
      ..._840,
      ..._844
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._484,
      ..._485,
      ..._486,
      ..._487,
      ..._835,
      ..._838,
      ..._841,
      ..._845
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._488,
      ..._489,
      ..._836,
      ..._839,
      ..._842,
      ..._846
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._490,
      ..._491,
      ..._492,
      ..._493,
      ..._843
    };
  }
  export const ClientFactory = {
    ..._898,
    ..._899
  };
}