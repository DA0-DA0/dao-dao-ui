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
import * as _852 from "./compute/v1beta1/msg.amino";
import * as _853 from "./emergencybutton/v1beta1/tx.amino";
import * as _854 from "./intertx/v1beta1/tx.amino";
import * as _855 from "./compute/v1beta1/msg.registry";
import * as _856 from "./emergencybutton/v1beta1/tx.registry";
import * as _857 from "./intertx/v1beta1/tx.registry";
import * as _858 from "./compute/v1beta1/query.rpc.Query";
import * as _859 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _860 from "./intertx/v1beta1/query.rpc.Query";
import * as _861 from "./registration/v1beta1/query.rpc.Query";
import * as _862 from "./compute/v1beta1/msg.rpc.msg";
import * as _863 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _864 from "./intertx/v1beta1/tx.rpc.msg";
import * as _920 from "./rpc.query";
import * as _921 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._489,
      ..._490,
      ..._491,
      ..._492,
      ..._852,
      ..._855,
      ..._858,
      ..._862
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._493,
      ..._494,
      ..._495,
      ..._496,
      ..._853,
      ..._856,
      ..._859,
      ..._863
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._497,
      ..._498,
      ..._854,
      ..._857,
      ..._860,
      ..._864
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._499,
      ..._500,
      ..._501,
      ..._502,
      ..._861
    };
  }
  export const ClientFactory = {
    ..._920,
    ..._921
  };
}