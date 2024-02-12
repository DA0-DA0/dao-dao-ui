import * as _244 from "./data/v1/events";
import * as _245 from "./data/v1/state";
import * as _246 from "./data/v1/tx";
import * as _247 from "./data/v1/types";
import * as _248 from "./data/v2/events";
import * as _249 from "./data/v2/state";
import * as _250 from "./data/v2/tx";
import * as _251 from "./data/v2/types";
import * as _252 from "./ecocredit/basket/v1/events";
import * as _253 from "./ecocredit/basket/v1/state";
import * as _254 from "./ecocredit/basket/v1/tx";
import * as _255 from "./ecocredit/basket/v1/types";
import * as _256 from "./ecocredit/marketplace/v1/events";
import * as _257 from "./ecocredit/marketplace/v1/state";
import * as _258 from "./ecocredit/marketplace/v1/tx";
import * as _259 from "./ecocredit/marketplace/v1/types";
import * as _260 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _261 from "./ecocredit/v1/events";
import * as _262 from "./ecocredit/v1/state";
import * as _263 from "./ecocredit/v1/tx";
import * as _264 from "./ecocredit/v1/types";
import * as _265 from "./ecocredit/v1alpha1/events";
import * as _266 from "./ecocredit/v1alpha1/genesis";
import * as _267 from "./ecocredit/v1alpha1/tx";
import * as _268 from "./ecocredit/v1alpha1/types";
import * as _269 from "./intertx/v1/query";
import * as _270 from "./intertx/v1/tx";
import * as _452 from "./data/v1/tx.amino";
import * as _453 from "./data/v2/tx.amino";
import * as _454 from "./ecocredit/basket/v1/tx.amino";
import * as _455 from "./ecocredit/marketplace/v1/tx.amino";
import * as _456 from "./ecocredit/v1/tx.amino";
import * as _457 from "./ecocredit/v1alpha1/tx.amino";
import * as _458 from "./intertx/v1/tx.amino";
import * as _459 from "./data/v1/tx.registry";
import * as _460 from "./data/v2/tx.registry";
import * as _461 from "./ecocredit/basket/v1/tx.registry";
import * as _462 from "./ecocredit/marketplace/v1/tx.registry";
import * as _463 from "./ecocredit/v1/tx.registry";
import * as _464 from "./ecocredit/v1alpha1/tx.registry";
import * as _465 from "./intertx/v1/tx.registry";
import * as _466 from "./intertx/v1/query.rpc.Query";
import * as _467 from "./data/v1/tx.rpc.msg";
import * as _468 from "./data/v2/tx.rpc.msg";
import * as _469 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _470 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _471 from "./ecocredit/v1/tx.rpc.msg";
import * as _472 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _473 from "./intertx/v1/tx.rpc.msg";
import * as _493 from "./rpc.query";
import * as _494 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._452,
      ..._459,
      ..._467
    };
    export const v2 = {
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._453,
      ..._460,
      ..._468
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._252,
        ..._253,
        ..._254,
        ..._255,
        ..._454,
        ..._461,
        ..._469
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._256,
        ..._257,
        ..._258,
        ..._259,
        ..._455,
        ..._462,
        ..._470
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._260
      };
    }
    export const v1 = {
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._456,
      ..._463,
      ..._471
    };
    export const v1alpha1 = {
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._457,
      ..._464,
      ..._472
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._269,
      ..._270,
      ..._458,
      ..._465,
      ..._466,
      ..._473
    };
  }
  export const ClientFactory = {
    ..._493,
    ..._494
  };
}