import * as _245 from "./data/v1/events";
import * as _246 from "./data/v1/state";
import * as _247 from "./data/v1/tx";
import * as _248 from "./data/v1/types";
import * as _249 from "./data/v2/events";
import * as _250 from "./data/v2/state";
import * as _251 from "./data/v2/tx";
import * as _252 from "./data/v2/types";
import * as _253 from "./ecocredit/basket/v1/events";
import * as _254 from "./ecocredit/basket/v1/state";
import * as _255 from "./ecocredit/basket/v1/tx";
import * as _256 from "./ecocredit/basket/v1/types";
import * as _257 from "./ecocredit/marketplace/v1/events";
import * as _258 from "./ecocredit/marketplace/v1/state";
import * as _259 from "./ecocredit/marketplace/v1/tx";
import * as _260 from "./ecocredit/marketplace/v1/types";
import * as _261 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _262 from "./ecocredit/v1/events";
import * as _263 from "./ecocredit/v1/state";
import * as _264 from "./ecocredit/v1/tx";
import * as _265 from "./ecocredit/v1/types";
import * as _266 from "./ecocredit/v1alpha1/events";
import * as _267 from "./ecocredit/v1alpha1/genesis";
import * as _268 from "./ecocredit/v1alpha1/tx";
import * as _269 from "./ecocredit/v1alpha1/types";
import * as _270 from "./intertx/v1/query";
import * as _271 from "./intertx/v1/tx";
import * as _453 from "./data/v1/tx.amino";
import * as _454 from "./data/v2/tx.amino";
import * as _455 from "./ecocredit/basket/v1/tx.amino";
import * as _456 from "./ecocredit/marketplace/v1/tx.amino";
import * as _457 from "./ecocredit/v1/tx.amino";
import * as _458 from "./ecocredit/v1alpha1/tx.amino";
import * as _459 from "./intertx/v1/tx.amino";
import * as _460 from "./data/v1/tx.registry";
import * as _461 from "./data/v2/tx.registry";
import * as _462 from "./ecocredit/basket/v1/tx.registry";
import * as _463 from "./ecocredit/marketplace/v1/tx.registry";
import * as _464 from "./ecocredit/v1/tx.registry";
import * as _465 from "./ecocredit/v1alpha1/tx.registry";
import * as _466 from "./intertx/v1/tx.registry";
import * as _467 from "./intertx/v1/query.rpc.Query";
import * as _468 from "./data/v1/tx.rpc.msg";
import * as _469 from "./data/v2/tx.rpc.msg";
import * as _470 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _471 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _472 from "./ecocredit/v1/tx.rpc.msg";
import * as _473 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _474 from "./intertx/v1/tx.rpc.msg";
import * as _494 from "./rpc.query";
import * as _495 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._453,
      ..._460,
      ..._468
    };
    export const v2 = {
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._454,
      ..._461,
      ..._469
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._253,
        ..._254,
        ..._255,
        ..._256,
        ..._455,
        ..._462,
        ..._470
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._257,
        ..._258,
        ..._259,
        ..._260,
        ..._456,
        ..._463,
        ..._471
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._261
      };
    }
    export const v1 = {
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._457,
      ..._464,
      ..._472
    };
    export const v1alpha1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._458,
      ..._465,
      ..._473
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._270,
      ..._271,
      ..._459,
      ..._466,
      ..._467,
      ..._474
    };
  }
  export const ClientFactory = {
    ..._494,
    ..._495
  };
}