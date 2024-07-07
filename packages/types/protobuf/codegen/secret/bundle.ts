import * as _342 from "./compute/v1beta1/genesis";
import * as _343 from "./compute/v1beta1/msg";
import * as _344 from "./compute/v1beta1/query";
import * as _345 from "./compute/v1beta1/types";
import * as _346 from "./emergencybutton/v1beta1/genesis";
import * as _347 from "./emergencybutton/v1beta1/params";
import * as _348 from "./emergencybutton/v1beta1/query";
import * as _349 from "./emergencybutton/v1beta1/tx";
import * as _350 from "./intertx/v1beta1/query";
import * as _351 from "./intertx/v1beta1/tx";
import * as _352 from "./registration/v1beta1/genesis";
import * as _353 from "./registration/v1beta1/msg";
import * as _354 from "./registration/v1beta1/query";
import * as _355 from "./registration/v1beta1/types";
import * as _611 from "./compute/v1beta1/msg.amino";
import * as _612 from "./emergencybutton/v1beta1/tx.amino";
import * as _613 from "./intertx/v1beta1/tx.amino";
import * as _614 from "./compute/v1beta1/msg.registry";
import * as _615 from "./emergencybutton/v1beta1/tx.registry";
import * as _616 from "./intertx/v1beta1/tx.registry";
import * as _617 from "./compute/v1beta1/query.rpc.Query";
import * as _618 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _619 from "./intertx/v1beta1/query.rpc.Query";
import * as _620 from "./registration/v1beta1/query.rpc.Query";
import * as _621 from "./compute/v1beta1/msg.rpc.msg";
import * as _622 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _623 from "./intertx/v1beta1/tx.rpc.msg";
import * as _655 from "./rpc.query";
import * as _656 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._342,
      ..._343,
      ..._344,
      ..._345,
      ..._611,
      ..._614,
      ..._617,
      ..._621
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._346,
      ..._347,
      ..._348,
      ..._349,
      ..._612,
      ..._615,
      ..._618,
      ..._622
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._350,
      ..._351,
      ..._613,
      ..._616,
      ..._619,
      ..._623
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._352,
      ..._353,
      ..._354,
      ..._355,
      ..._620
    };
  }
  export const ClientFactory = {
    ..._655,
    ..._656
  };
}