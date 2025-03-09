import * as _374 from "./compute/v1beta1/genesis";
import * as _375 from "./compute/v1beta1/msg";
import * as _376 from "./compute/v1beta1/query";
import * as _377 from "./compute/v1beta1/types";
import * as _378 from "./emergencybutton/v1beta1/genesis";
import * as _379 from "./emergencybutton/v1beta1/params";
import * as _380 from "./emergencybutton/v1beta1/query";
import * as _381 from "./emergencybutton/v1beta1/tx";
import * as _382 from "./intertx/v1beta1/query";
import * as _383 from "./intertx/v1beta1/tx";
import * as _384 from "./registration/v1beta1/genesis";
import * as _385 from "./registration/v1beta1/msg";
import * as _386 from "./registration/v1beta1/query";
import * as _387 from "./registration/v1beta1/types";
import * as _681 from "./compute/v1beta1/msg.amino";
import * as _682 from "./emergencybutton/v1beta1/tx.amino";
import * as _683 from "./intertx/v1beta1/tx.amino";
import * as _684 from "./compute/v1beta1/msg.registry";
import * as _685 from "./emergencybutton/v1beta1/tx.registry";
import * as _686 from "./intertx/v1beta1/tx.registry";
import * as _687 from "./compute/v1beta1/query.rpc.Query";
import * as _688 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _689 from "./intertx/v1beta1/query.rpc.Query";
import * as _690 from "./registration/v1beta1/query.rpc.Query";
import * as _691 from "./compute/v1beta1/msg.rpc.msg";
import * as _692 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _693 from "./intertx/v1beta1/tx.rpc.msg";
import * as _741 from "./rpc.query";
import * as _742 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._681,
      ..._684,
      ..._687,
      ..._691
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._378,
      ..._379,
      ..._380,
      ..._381,
      ..._682,
      ..._685,
      ..._688,
      ..._692
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._382,
      ..._383,
      ..._683,
      ..._686,
      ..._689,
      ..._693
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._384,
      ..._385,
      ..._386,
      ..._387,
      ..._690
    };
  }
  export const ClientFactory = {
    ..._741,
    ..._742
  };
}