import * as _469 from "./compute/v1beta1/genesis";
import * as _470 from "./compute/v1beta1/msg";
import * as _471 from "./compute/v1beta1/query";
import * as _472 from "./compute/v1beta1/types";
import * as _473 from "./emergencybutton/v1beta1/genesis";
import * as _474 from "./emergencybutton/v1beta1/params";
import * as _475 from "./emergencybutton/v1beta1/query";
import * as _476 from "./emergencybutton/v1beta1/tx";
import * as _477 from "./intertx/v1beta1/query";
import * as _478 from "./intertx/v1beta1/tx";
import * as _479 from "./registration/v1beta1/genesis";
import * as _480 from "./registration/v1beta1/msg";
import * as _481 from "./registration/v1beta1/query";
import * as _482 from "./registration/v1beta1/types";
import * as _819 from "./compute/v1beta1/msg.amino";
import * as _820 from "./emergencybutton/v1beta1/tx.amino";
import * as _821 from "./intertx/v1beta1/tx.amino";
import * as _822 from "./compute/v1beta1/msg.registry";
import * as _823 from "./emergencybutton/v1beta1/tx.registry";
import * as _824 from "./intertx/v1beta1/tx.registry";
import * as _825 from "./compute/v1beta1/query.rpc.Query";
import * as _826 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _827 from "./intertx/v1beta1/query.rpc.Query";
import * as _828 from "./registration/v1beta1/query.rpc.Query";
import * as _829 from "./compute/v1beta1/msg.rpc.msg";
import * as _830 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _831 from "./intertx/v1beta1/tx.rpc.msg";
import * as _883 from "./rpc.query";
import * as _884 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._469,
      ..._470,
      ..._471,
      ..._472,
      ..._819,
      ..._822,
      ..._825,
      ..._829
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._473,
      ..._474,
      ..._475,
      ..._476,
      ..._820,
      ..._823,
      ..._826,
      ..._830
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._477,
      ..._478,
      ..._821,
      ..._824,
      ..._827,
      ..._831
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._479,
      ..._480,
      ..._481,
      ..._482,
      ..._828
    };
  }
  export const ClientFactory = {
    ..._883,
    ..._884
  };
}