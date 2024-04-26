import * as _284 from "./data/v1/events";
import * as _285 from "./data/v1/state";
import * as _286 from "./data/v1/tx";
import * as _287 from "./data/v1/types";
import * as _288 from "./data/v2/events";
import * as _289 from "./data/v2/state";
import * as _290 from "./data/v2/tx";
import * as _291 from "./data/v2/types";
import * as _292 from "./ecocredit/basket/v1/events";
import * as _293 from "./ecocredit/basket/v1/state";
import * as _294 from "./ecocredit/basket/v1/tx";
import * as _295 from "./ecocredit/basket/v1/types";
import * as _296 from "./ecocredit/marketplace/v1/events";
import * as _297 from "./ecocredit/marketplace/v1/state";
import * as _298 from "./ecocredit/marketplace/v1/tx";
import * as _299 from "./ecocredit/marketplace/v1/types";
import * as _300 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _301 from "./ecocredit/v1/events";
import * as _302 from "./ecocredit/v1/state";
import * as _303 from "./ecocredit/v1/tx";
import * as _304 from "./ecocredit/v1/types";
import * as _305 from "./ecocredit/v1alpha1/events";
import * as _306 from "./ecocredit/v1alpha1/genesis";
import * as _307 from "./ecocredit/v1alpha1/tx";
import * as _308 from "./ecocredit/v1alpha1/types";
import * as _309 from "./intertx/v1/query";
import * as _310 from "./intertx/v1/tx";
import * as _516 from "./data/v1/tx.amino";
import * as _517 from "./data/v2/tx.amino";
import * as _518 from "./ecocredit/basket/v1/tx.amino";
import * as _519 from "./ecocredit/marketplace/v1/tx.amino";
import * as _520 from "./ecocredit/v1/tx.amino";
import * as _521 from "./ecocredit/v1alpha1/tx.amino";
import * as _522 from "./intertx/v1/tx.amino";
import * as _523 from "./data/v1/tx.registry";
import * as _524 from "./data/v2/tx.registry";
import * as _525 from "./ecocredit/basket/v1/tx.registry";
import * as _526 from "./ecocredit/marketplace/v1/tx.registry";
import * as _527 from "./ecocredit/v1/tx.registry";
import * as _528 from "./ecocredit/v1alpha1/tx.registry";
import * as _529 from "./intertx/v1/tx.registry";
import * as _530 from "./intertx/v1/query.rpc.Query";
import * as _531 from "./data/v1/tx.rpc.msg";
import * as _532 from "./data/v2/tx.rpc.msg";
import * as _533 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _534 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _535 from "./ecocredit/v1/tx.rpc.msg";
import * as _536 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _537 from "./intertx/v1/tx.rpc.msg";
import * as _561 from "./rpc.query";
import * as _562 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._516,
      ..._523,
      ..._531
    };
    export const v2 = {
      ..._288,
      ..._289,
      ..._290,
      ..._291,
      ..._517,
      ..._524,
      ..._532
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._292,
        ..._293,
        ..._294,
        ..._295,
        ..._518,
        ..._525,
        ..._533
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._296,
        ..._297,
        ..._298,
        ..._299,
        ..._519,
        ..._526,
        ..._534
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._300
      };
    }
    export const v1 = {
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._520,
      ..._527,
      ..._535
    };
    export const v1alpha1 = {
      ..._305,
      ..._306,
      ..._307,
      ..._308,
      ..._521,
      ..._528,
      ..._536
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._309,
      ..._310,
      ..._522,
      ..._529,
      ..._530,
      ..._537
    };
  }
  export const ClientFactory = {
    ..._561,
    ..._562
  };
}