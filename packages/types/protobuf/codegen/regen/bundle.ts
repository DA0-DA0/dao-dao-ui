import * as _453 from "./data/v1/events";
import * as _454 from "./data/v1/state";
import * as _455 from "./data/v1/tx";
import * as _456 from "./data/v1/types";
import * as _457 from "./data/v2/events";
import * as _458 from "./data/v2/state";
import * as _459 from "./data/v2/tx";
import * as _460 from "./data/v2/types";
import * as _461 from "./ecocredit/basket/v1/events";
import * as _462 from "./ecocredit/basket/v1/state";
import * as _463 from "./ecocredit/basket/v1/tx";
import * as _464 from "./ecocredit/basket/v1/types";
import * as _465 from "./ecocredit/marketplace/v1/events";
import * as _466 from "./ecocredit/marketplace/v1/state";
import * as _467 from "./ecocredit/marketplace/v1/tx";
import * as _468 from "./ecocredit/marketplace/v1/types";
import * as _469 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _470 from "./ecocredit/v1/events";
import * as _471 from "./ecocredit/v1/state";
import * as _472 from "./ecocredit/v1/tx";
import * as _473 from "./ecocredit/v1/types";
import * as _474 from "./ecocredit/v1alpha1/events";
import * as _475 from "./ecocredit/v1alpha1/genesis";
import * as _476 from "./ecocredit/v1alpha1/tx";
import * as _477 from "./ecocredit/v1alpha1/types";
import * as _478 from "./intertx/v1/query";
import * as _479 from "./intertx/v1/tx";
import * as _812 from "./data/v1/tx.amino";
import * as _813 from "./data/v2/tx.amino";
import * as _814 from "./ecocredit/basket/v1/tx.amino";
import * as _815 from "./ecocredit/marketplace/v1/tx.amino";
import * as _816 from "./ecocredit/v1/tx.amino";
import * as _817 from "./ecocredit/v1alpha1/tx.amino";
import * as _818 from "./intertx/v1/tx.amino";
import * as _819 from "./data/v1/tx.registry";
import * as _820 from "./data/v2/tx.registry";
import * as _821 from "./ecocredit/basket/v1/tx.registry";
import * as _822 from "./ecocredit/marketplace/v1/tx.registry";
import * as _823 from "./ecocredit/v1/tx.registry";
import * as _824 from "./ecocredit/v1alpha1/tx.registry";
import * as _825 from "./intertx/v1/tx.registry";
import * as _826 from "./intertx/v1/query.rpc.Query";
import * as _827 from "./data/v1/tx.rpc.msg";
import * as _828 from "./data/v2/tx.rpc.msg";
import * as _829 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _830 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _831 from "./ecocredit/v1/tx.rpc.msg";
import * as _832 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _833 from "./intertx/v1/tx.rpc.msg";
import * as _896 from "./rpc.query";
import * as _897 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._453,
      ..._454,
      ..._455,
      ..._456,
      ..._812,
      ..._819,
      ..._827
    };
    export const v2 = {
      ..._457,
      ..._458,
      ..._459,
      ..._460,
      ..._813,
      ..._820,
      ..._828
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._461,
        ..._462,
        ..._463,
        ..._464,
        ..._814,
        ..._821,
        ..._829
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._465,
        ..._466,
        ..._467,
        ..._468,
        ..._815,
        ..._822,
        ..._830
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._469
      };
    }
    export const v1 = {
      ..._470,
      ..._471,
      ..._472,
      ..._473,
      ..._816,
      ..._823,
      ..._831
    };
    export const v1alpha1 = {
      ..._474,
      ..._475,
      ..._476,
      ..._477,
      ..._817,
      ..._824,
      ..._832
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._478,
      ..._479,
      ..._818,
      ..._825,
      ..._826,
      ..._833
    };
  }
  export const ClientFactory = {
    ..._896,
    ..._897
  };
}