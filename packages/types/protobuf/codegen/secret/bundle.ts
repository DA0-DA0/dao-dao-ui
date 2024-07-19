import * as _353 from "./compute/v1beta1/genesis";
import * as _354 from "./compute/v1beta1/msg";
import * as _355 from "./compute/v1beta1/query";
import * as _356 from "./compute/v1beta1/types";
import * as _357 from "./emergencybutton/v1beta1/genesis";
import * as _358 from "./emergencybutton/v1beta1/params";
import * as _359 from "./emergencybutton/v1beta1/query";
import * as _360 from "./emergencybutton/v1beta1/tx";
import * as _361 from "./intertx/v1beta1/query";
import * as _362 from "./intertx/v1beta1/tx";
import * as _363 from "./registration/v1beta1/genesis";
import * as _364 from "./registration/v1beta1/msg";
import * as _365 from "./registration/v1beta1/query";
import * as _366 from "./registration/v1beta1/types";
import * as _629 from "./compute/v1beta1/msg.amino";
import * as _630 from "./emergencybutton/v1beta1/tx.amino";
import * as _631 from "./intertx/v1beta1/tx.amino";
import * as _632 from "./compute/v1beta1/msg.registry";
import * as _633 from "./emergencybutton/v1beta1/tx.registry";
import * as _634 from "./intertx/v1beta1/tx.registry";
import * as _635 from "./compute/v1beta1/query.rpc.Query";
import * as _636 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _637 from "./intertx/v1beta1/query.rpc.Query";
import * as _638 from "./registration/v1beta1/query.rpc.Query";
import * as _639 from "./compute/v1beta1/msg.rpc.msg";
import * as _640 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _641 from "./intertx/v1beta1/tx.rpc.msg";
import * as _674 from "./rpc.query";
import * as _675 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._353,
      ..._354,
      ..._355,
      ..._356,
      ..._629,
      ..._632,
      ..._635,
      ..._639
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._357,
      ..._358,
      ..._359,
      ..._360,
      ..._630,
      ..._633,
      ..._636,
      ..._640
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._361,
      ..._362,
      ..._631,
      ..._634,
      ..._637,
      ..._641
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._638
    };
  }
  export const ClientFactory = {
    ..._674,
    ..._675
  };
}