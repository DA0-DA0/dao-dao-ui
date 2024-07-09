import * as _347 from "./compute/v1beta1/genesis";
import * as _348 from "./compute/v1beta1/msg";
import * as _349 from "./compute/v1beta1/query";
import * as _350 from "./compute/v1beta1/types";
import * as _351 from "./emergencybutton/v1beta1/genesis";
import * as _352 from "./emergencybutton/v1beta1/params";
import * as _353 from "./emergencybutton/v1beta1/query";
import * as _354 from "./emergencybutton/v1beta1/tx";
import * as _355 from "./intertx/v1beta1/query";
import * as _356 from "./intertx/v1beta1/tx";
import * as _357 from "./registration/v1beta1/genesis";
import * as _358 from "./registration/v1beta1/msg";
import * as _359 from "./registration/v1beta1/query";
import * as _360 from "./registration/v1beta1/types";
import * as _619 from "./compute/v1beta1/msg.amino";
import * as _620 from "./emergencybutton/v1beta1/tx.amino";
import * as _621 from "./intertx/v1beta1/tx.amino";
import * as _622 from "./compute/v1beta1/msg.registry";
import * as _623 from "./emergencybutton/v1beta1/tx.registry";
import * as _624 from "./intertx/v1beta1/tx.registry";
import * as _625 from "./compute/v1beta1/query.rpc.Query";
import * as _626 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _627 from "./intertx/v1beta1/query.rpc.Query";
import * as _628 from "./registration/v1beta1/query.rpc.Query";
import * as _629 from "./compute/v1beta1/msg.rpc.msg";
import * as _630 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _631 from "./intertx/v1beta1/tx.rpc.msg";
import * as _664 from "./rpc.query";
import * as _665 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._347,
      ..._348,
      ..._349,
      ..._350,
      ..._619,
      ..._622,
      ..._625,
      ..._629
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._351,
      ..._352,
      ..._353,
      ..._354,
      ..._620,
      ..._623,
      ..._626,
      ..._630
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._355,
      ..._356,
      ..._621,
      ..._624,
      ..._627,
      ..._631
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._357,
      ..._358,
      ..._359,
      ..._360,
      ..._628
    };
  }
  export const ClientFactory = {
    ..._664,
    ..._665
  };
}