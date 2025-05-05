import * as _370 from "./compute/v1beta1/genesis";
import * as _371 from "./compute/v1beta1/msg";
import * as _372 from "./compute/v1beta1/query";
import * as _373 from "./compute/v1beta1/types";
import * as _374 from "./emergencybutton/v1beta1/genesis";
import * as _375 from "./emergencybutton/v1beta1/params";
import * as _376 from "./emergencybutton/v1beta1/query";
import * as _377 from "./emergencybutton/v1beta1/tx";
import * as _378 from "./intertx/v1beta1/query";
import * as _379 from "./intertx/v1beta1/tx";
import * as _380 from "./registration/v1beta1/genesis";
import * as _381 from "./registration/v1beta1/msg";
import * as _382 from "./registration/v1beta1/query";
import * as _383 from "./registration/v1beta1/types";
import * as _673 from "./compute/v1beta1/msg.amino";
import * as _674 from "./emergencybutton/v1beta1/tx.amino";
import * as _675 from "./intertx/v1beta1/tx.amino";
import * as _676 from "./compute/v1beta1/msg.registry";
import * as _677 from "./emergencybutton/v1beta1/tx.registry";
import * as _678 from "./intertx/v1beta1/tx.registry";
import * as _679 from "./compute/v1beta1/query.rpc.Query";
import * as _680 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _681 from "./intertx/v1beta1/query.rpc.Query";
import * as _682 from "./registration/v1beta1/query.rpc.Query";
import * as _683 from "./compute/v1beta1/msg.rpc.msg";
import * as _684 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _685 from "./intertx/v1beta1/tx.rpc.msg";
import * as _733 from "./rpc.query";
import * as _734 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._673,
      ..._676,
      ..._679,
      ..._683
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._674,
      ..._677,
      ..._680,
      ..._684
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._378,
      ..._379,
      ..._675,
      ..._678,
      ..._681,
      ..._685
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._380,
      ..._381,
      ..._382,
      ..._383,
      ..._682
    };
  }
  export const ClientFactory = {
    ..._733,
    ..._734
  };
}