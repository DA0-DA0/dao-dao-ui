import * as _280 from "./data/v1/events";
import * as _281 from "./data/v1/state";
import * as _282 from "./data/v1/tx";
import * as _283 from "./data/v1/types";
import * as _284 from "./data/v2/events";
import * as _285 from "./data/v2/state";
import * as _286 from "./data/v2/tx";
import * as _287 from "./data/v2/types";
import * as _288 from "./ecocredit/basket/v1/events";
import * as _289 from "./ecocredit/basket/v1/state";
import * as _290 from "./ecocredit/basket/v1/tx";
import * as _291 from "./ecocredit/basket/v1/types";
import * as _292 from "./ecocredit/marketplace/v1/events";
import * as _293 from "./ecocredit/marketplace/v1/state";
import * as _294 from "./ecocredit/marketplace/v1/tx";
import * as _295 from "./ecocredit/marketplace/v1/types";
import * as _296 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _297 from "./ecocredit/v1/events";
import * as _298 from "./ecocredit/v1/state";
import * as _299 from "./ecocredit/v1/tx";
import * as _300 from "./ecocredit/v1/types";
import * as _301 from "./ecocredit/v1alpha1/events";
import * as _302 from "./ecocredit/v1alpha1/genesis";
import * as _303 from "./ecocredit/v1alpha1/tx";
import * as _304 from "./ecocredit/v1alpha1/types";
import * as _305 from "./intertx/v1/query";
import * as _306 from "./intertx/v1/tx";
import * as _508 from "./data/v1/tx.amino";
import * as _509 from "./data/v2/tx.amino";
import * as _510 from "./ecocredit/basket/v1/tx.amino";
import * as _511 from "./ecocredit/marketplace/v1/tx.amino";
import * as _512 from "./ecocredit/v1/tx.amino";
import * as _513 from "./ecocredit/v1alpha1/tx.amino";
import * as _514 from "./intertx/v1/tx.amino";
import * as _515 from "./data/v1/tx.registry";
import * as _516 from "./data/v2/tx.registry";
import * as _517 from "./ecocredit/basket/v1/tx.registry";
import * as _518 from "./ecocredit/marketplace/v1/tx.registry";
import * as _519 from "./ecocredit/v1/tx.registry";
import * as _520 from "./ecocredit/v1alpha1/tx.registry";
import * as _521 from "./intertx/v1/tx.registry";
import * as _522 from "./intertx/v1/query.rpc.Query";
import * as _523 from "./data/v1/tx.rpc.msg";
import * as _524 from "./data/v2/tx.rpc.msg";
import * as _525 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _526 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _527 from "./ecocredit/v1/tx.rpc.msg";
import * as _528 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _529 from "./intertx/v1/tx.rpc.msg";
import * as _553 from "./rpc.query";
import * as _554 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._508,
      ..._515,
      ..._523
    };
    export const v2 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._509,
      ..._516,
      ..._524
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._288,
        ..._289,
        ..._290,
        ..._291,
        ..._510,
        ..._517,
        ..._525
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._292,
        ..._293,
        ..._294,
        ..._295,
        ..._511,
        ..._518,
        ..._526
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._296
      };
    }
    export const v1 = {
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._512,
      ..._519,
      ..._527
    };
    export const v1alpha1 = {
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._513,
      ..._520,
      ..._528
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._305,
      ..._306,
      ..._514,
      ..._521,
      ..._522,
      ..._529
    };
  }
  export const ClientFactory = {
    ..._553,
    ..._554
  };
}