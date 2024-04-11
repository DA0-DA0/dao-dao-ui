import * as _266 from "./data/v1/events";
import * as _267 from "./data/v1/state";
import * as _268 from "./data/v1/tx";
import * as _269 from "./data/v1/types";
import * as _270 from "./data/v2/events";
import * as _271 from "./data/v2/state";
import * as _272 from "./data/v2/tx";
import * as _273 from "./data/v2/types";
import * as _274 from "./ecocredit/basket/v1/events";
import * as _275 from "./ecocredit/basket/v1/state";
import * as _276 from "./ecocredit/basket/v1/tx";
import * as _277 from "./ecocredit/basket/v1/types";
import * as _278 from "./ecocredit/marketplace/v1/events";
import * as _279 from "./ecocredit/marketplace/v1/state";
import * as _280 from "./ecocredit/marketplace/v1/tx";
import * as _281 from "./ecocredit/marketplace/v1/types";
import * as _282 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _283 from "./ecocredit/v1/events";
import * as _284 from "./ecocredit/v1/state";
import * as _285 from "./ecocredit/v1/tx";
import * as _286 from "./ecocredit/v1/types";
import * as _287 from "./ecocredit/v1alpha1/events";
import * as _288 from "./ecocredit/v1alpha1/genesis";
import * as _289 from "./ecocredit/v1alpha1/tx";
import * as _290 from "./ecocredit/v1alpha1/types";
import * as _291 from "./intertx/v1/query";
import * as _292 from "./intertx/v1/tx";
import * as _485 from "./data/v1/tx.amino";
import * as _486 from "./data/v2/tx.amino";
import * as _487 from "./ecocredit/basket/v1/tx.amino";
import * as _488 from "./ecocredit/marketplace/v1/tx.amino";
import * as _489 from "./ecocredit/v1/tx.amino";
import * as _490 from "./ecocredit/v1alpha1/tx.amino";
import * as _491 from "./intertx/v1/tx.amino";
import * as _492 from "./data/v1/tx.registry";
import * as _493 from "./data/v2/tx.registry";
import * as _494 from "./ecocredit/basket/v1/tx.registry";
import * as _495 from "./ecocredit/marketplace/v1/tx.registry";
import * as _496 from "./ecocredit/v1/tx.registry";
import * as _497 from "./ecocredit/v1alpha1/tx.registry";
import * as _498 from "./intertx/v1/tx.registry";
import * as _499 from "./intertx/v1/query.rpc.Query";
import * as _500 from "./data/v1/tx.rpc.msg";
import * as _501 from "./data/v2/tx.rpc.msg";
import * as _502 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _503 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _504 from "./ecocredit/v1/tx.rpc.msg";
import * as _505 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _506 from "./intertx/v1/tx.rpc.msg";
import * as _528 from "./rpc.query";
import * as _529 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._485,
      ..._492,
      ..._500
    };
    export const v2 = {
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._486,
      ..._493,
      ..._501
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._274,
        ..._275,
        ..._276,
        ..._277,
        ..._487,
        ..._494,
        ..._502
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._278,
        ..._279,
        ..._280,
        ..._281,
        ..._488,
        ..._495,
        ..._503
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._282
      };
    }
    export const v1 = {
      ..._283,
      ..._284,
      ..._285,
      ..._286,
      ..._489,
      ..._496,
      ..._504
    };
    export const v1alpha1 = {
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._490,
      ..._497,
      ..._505
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._291,
      ..._292,
      ..._491,
      ..._498,
      ..._499,
      ..._506
    };
  }
  export const ClientFactory = {
    ..._528,
    ..._529
  };
}