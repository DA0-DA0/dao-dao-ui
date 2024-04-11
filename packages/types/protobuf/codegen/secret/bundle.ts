import * as _338 from "./compute/v1beta1/genesis";
import * as _339 from "./compute/v1beta1/msg";
import * as _340 from "./compute/v1beta1/query";
import * as _341 from "./compute/v1beta1/types";
import * as _342 from "./emergencybutton/v1beta1/genesis";
import * as _343 from "./emergencybutton/v1beta1/params";
import * as _344 from "./emergencybutton/v1beta1/query";
import * as _345 from "./emergencybutton/v1beta1/tx";
import * as _346 from "./intertx/v1beta1/query";
import * as _347 from "./intertx/v1beta1/tx";
import * as _348 from "./registration/v1beta1/genesis";
import * as _349 from "./registration/v1beta1/msg";
import * as _350 from "./registration/v1beta1/query";
import * as _351 from "./registration/v1beta1/types";
import * as _602 from "./compute/v1beta1/msg.amino";
import * as _603 from "./emergencybutton/v1beta1/tx.amino";
import * as _604 from "./intertx/v1beta1/tx.amino";
import * as _605 from "./compute/v1beta1/msg.registry";
import * as _606 from "./emergencybutton/v1beta1/tx.registry";
import * as _607 from "./intertx/v1beta1/tx.registry";
import * as _608 from "./compute/v1beta1/query.rpc.Query";
import * as _609 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _610 from "./intertx/v1beta1/query.rpc.Query";
import * as _611 from "./registration/v1beta1/query.rpc.Query";
import * as _612 from "./compute/v1beta1/msg.rpc.msg";
import * as _613 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _614 from "./intertx/v1beta1/tx.rpc.msg";
import * as _643 from "./rpc.query";
import * as _644 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._338,
      ..._339,
      ..._340,
      ..._341,
      ..._602,
      ..._605,
      ..._608,
      ..._612
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._342,
      ..._343,
      ..._344,
      ..._345,
      ..._603,
      ..._606,
      ..._609,
      ..._613
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._346,
      ..._347,
      ..._604,
      ..._607,
      ..._610,
      ..._614
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._348,
      ..._349,
      ..._350,
      ..._351,
      ..._611
    };
  }
  export const ClientFactory = {
    ..._643,
    ..._644
  };
}