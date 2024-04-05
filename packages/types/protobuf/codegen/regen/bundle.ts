import * as _264 from "./data/v1/events";
import * as _265 from "./data/v1/state";
import * as _266 from "./data/v1/tx";
import * as _267 from "./data/v1/types";
import * as _268 from "./data/v2/events";
import * as _269 from "./data/v2/state";
import * as _270 from "./data/v2/tx";
import * as _271 from "./data/v2/types";
import * as _272 from "./ecocredit/basket/v1/events";
import * as _273 from "./ecocredit/basket/v1/state";
import * as _274 from "./ecocredit/basket/v1/tx";
import * as _275 from "./ecocredit/basket/v1/types";
import * as _276 from "./ecocredit/marketplace/v1/events";
import * as _277 from "./ecocredit/marketplace/v1/state";
import * as _278 from "./ecocredit/marketplace/v1/tx";
import * as _279 from "./ecocredit/marketplace/v1/types";
import * as _280 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _281 from "./ecocredit/v1/events";
import * as _282 from "./ecocredit/v1/state";
import * as _283 from "./ecocredit/v1/tx";
import * as _284 from "./ecocredit/v1/types";
import * as _285 from "./ecocredit/v1alpha1/events";
import * as _286 from "./ecocredit/v1alpha1/genesis";
import * as _287 from "./ecocredit/v1alpha1/tx";
import * as _288 from "./ecocredit/v1alpha1/types";
import * as _289 from "./intertx/v1/query";
import * as _290 from "./intertx/v1/tx";
import * as _480 from "./data/v1/tx.amino";
import * as _481 from "./data/v2/tx.amino";
import * as _482 from "./ecocredit/basket/v1/tx.amino";
import * as _483 from "./ecocredit/marketplace/v1/tx.amino";
import * as _484 from "./ecocredit/v1/tx.amino";
import * as _485 from "./ecocredit/v1alpha1/tx.amino";
import * as _486 from "./intertx/v1/tx.amino";
import * as _487 from "./data/v1/tx.registry";
import * as _488 from "./data/v2/tx.registry";
import * as _489 from "./ecocredit/basket/v1/tx.registry";
import * as _490 from "./ecocredit/marketplace/v1/tx.registry";
import * as _491 from "./ecocredit/v1/tx.registry";
import * as _492 from "./ecocredit/v1alpha1/tx.registry";
import * as _493 from "./intertx/v1/tx.registry";
import * as _494 from "./intertx/v1/query.rpc.Query";
import * as _495 from "./data/v1/tx.rpc.msg";
import * as _496 from "./data/v2/tx.rpc.msg";
import * as _497 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _498 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _499 from "./ecocredit/v1/tx.rpc.msg";
import * as _500 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _501 from "./intertx/v1/tx.rpc.msg";
import * as _523 from "./rpc.query";
import * as _524 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._480,
      ..._487,
      ..._495
    };
    export const v2 = {
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._481,
      ..._488,
      ..._496
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._272,
        ..._273,
        ..._274,
        ..._275,
        ..._482,
        ..._489,
        ..._497
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._276,
        ..._277,
        ..._278,
        ..._279,
        ..._483,
        ..._490,
        ..._498
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._280
      };
    }
    export const v1 = {
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._484,
      ..._491,
      ..._499
    };
    export const v1alpha1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._485,
      ..._492,
      ..._500
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._289,
      ..._290,
      ..._486,
      ..._493,
      ..._494,
      ..._501
    };
  }
  export const ClientFactory = {
    ..._523,
    ..._524
  };
}