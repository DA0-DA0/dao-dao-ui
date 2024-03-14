import * as _261 from "./data/v1/events";
import * as _262 from "./data/v1/state";
import * as _263 from "./data/v1/tx";
import * as _264 from "./data/v1/types";
import * as _265 from "./data/v2/events";
import * as _266 from "./data/v2/state";
import * as _267 from "./data/v2/tx";
import * as _268 from "./data/v2/types";
import * as _269 from "./ecocredit/basket/v1/events";
import * as _270 from "./ecocredit/basket/v1/state";
import * as _271 from "./ecocredit/basket/v1/tx";
import * as _272 from "./ecocredit/basket/v1/types";
import * as _273 from "./ecocredit/marketplace/v1/events";
import * as _274 from "./ecocredit/marketplace/v1/state";
import * as _275 from "./ecocredit/marketplace/v1/tx";
import * as _276 from "./ecocredit/marketplace/v1/types";
import * as _277 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _278 from "./ecocredit/v1/events";
import * as _279 from "./ecocredit/v1/state";
import * as _280 from "./ecocredit/v1/tx";
import * as _281 from "./ecocredit/v1/types";
import * as _282 from "./ecocredit/v1alpha1/events";
import * as _283 from "./ecocredit/v1alpha1/genesis";
import * as _284 from "./ecocredit/v1alpha1/tx";
import * as _285 from "./ecocredit/v1alpha1/types";
import * as _286 from "./intertx/v1/query";
import * as _287 from "./intertx/v1/tx";
import * as _473 from "./data/v1/tx.amino";
import * as _474 from "./data/v2/tx.amino";
import * as _475 from "./ecocredit/basket/v1/tx.amino";
import * as _476 from "./ecocredit/marketplace/v1/tx.amino";
import * as _477 from "./ecocredit/v1/tx.amino";
import * as _478 from "./ecocredit/v1alpha1/tx.amino";
import * as _479 from "./intertx/v1/tx.amino";
import * as _480 from "./data/v1/tx.registry";
import * as _481 from "./data/v2/tx.registry";
import * as _482 from "./ecocredit/basket/v1/tx.registry";
import * as _483 from "./ecocredit/marketplace/v1/tx.registry";
import * as _484 from "./ecocredit/v1/tx.registry";
import * as _485 from "./ecocredit/v1alpha1/tx.registry";
import * as _486 from "./intertx/v1/tx.registry";
import * as _487 from "./intertx/v1/query.rpc.Query";
import * as _488 from "./data/v1/tx.rpc.msg";
import * as _489 from "./data/v2/tx.rpc.msg";
import * as _490 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _491 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _492 from "./ecocredit/v1/tx.rpc.msg";
import * as _493 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _494 from "./intertx/v1/tx.rpc.msg";
import * as _516 from "./rpc.query";
import * as _517 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._473,
      ..._480,
      ..._488
    };
    export const v2 = {
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._474,
      ..._481,
      ..._489
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._269,
        ..._270,
        ..._271,
        ..._272,
        ..._475,
        ..._482,
        ..._490
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._273,
        ..._274,
        ..._275,
        ..._276,
        ..._476,
        ..._483,
        ..._491
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._277
      };
    }
    export const v1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._477,
      ..._484,
      ..._492
    };
    export const v1alpha1 = {
      ..._282,
      ..._283,
      ..._284,
      ..._285,
      ..._478,
      ..._485,
      ..._493
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._286,
      ..._287,
      ..._479,
      ..._486,
      ..._487,
      ..._494
    };
  }
  export const ClientFactory = {
    ..._516,
    ..._517
  };
}