import * as _489 from "./compute/v1beta1/genesis";
import * as _490 from "./compute/v1beta1/msg";
import * as _491 from "./compute/v1beta1/query";
import * as _492 from "./compute/v1beta1/types";
import * as _493 from "./emergencybutton/v1beta1/genesis";
import * as _494 from "./emergencybutton/v1beta1/params";
import * as _495 from "./emergencybutton/v1beta1/query";
import * as _496 from "./emergencybutton/v1beta1/tx";
import * as _497 from "./intertx/v1beta1/query";
import * as _498 from "./intertx/v1beta1/tx";
import * as _499 from "./registration/v1beta1/genesis";
import * as _500 from "./registration/v1beta1/msg";
import * as _501 from "./registration/v1beta1/query";
import * as _502 from "./registration/v1beta1/types";
import * as _866 from "./compute/v1beta1/msg.amino";
import * as _867 from "./emergencybutton/v1beta1/tx.amino";
import * as _868 from "./intertx/v1beta1/tx.amino";
import * as _869 from "./compute/v1beta1/msg.registry";
import * as _870 from "./emergencybutton/v1beta1/tx.registry";
import * as _871 from "./intertx/v1beta1/tx.registry";
import * as _872 from "./compute/v1beta1/query.rpc.Query";
import * as _873 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _874 from "./intertx/v1beta1/query.rpc.Query";
import * as _875 from "./registration/v1beta1/query.rpc.Query";
import * as _876 from "./compute/v1beta1/msg.rpc.msg";
import * as _877 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _878 from "./intertx/v1beta1/tx.rpc.msg";
import * as _938 from "./rpc.query";
import * as _939 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._489,
      ..._490,
      ..._491,
      ..._492,
      ..._866,
      ..._869,
      ..._872,
      ..._876
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._493,
      ..._494,
      ..._495,
      ..._496,
      ..._867,
      ..._870,
      ..._873,
      ..._877
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._497,
      ..._498,
      ..._868,
      ..._871,
      ..._874,
      ..._878
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._499,
      ..._500,
      ..._501,
      ..._502,
      ..._875
    };
  }
  export const ClientFactory = {
    ..._938,
    ..._939
  };
}