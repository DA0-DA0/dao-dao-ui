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
import * as _817 from "./data/v1/tx.amino";
import * as _818 from "./data/v2/tx.amino";
import * as _819 from "./ecocredit/basket/v1/tx.amino";
import * as _820 from "./ecocredit/marketplace/v1/tx.amino";
import * as _821 from "./ecocredit/v1/tx.amino";
import * as _822 from "./ecocredit/v1alpha1/tx.amino";
import * as _823 from "./intertx/v1/tx.amino";
import * as _824 from "./data/v1/tx.registry";
import * as _825 from "./data/v2/tx.registry";
import * as _826 from "./ecocredit/basket/v1/tx.registry";
import * as _827 from "./ecocredit/marketplace/v1/tx.registry";
import * as _828 from "./ecocredit/v1/tx.registry";
import * as _829 from "./ecocredit/v1alpha1/tx.registry";
import * as _830 from "./intertx/v1/tx.registry";
import * as _831 from "./intertx/v1/query.rpc.Query";
import * as _832 from "./data/v1/tx.rpc.msg";
import * as _833 from "./data/v2/tx.rpc.msg";
import * as _834 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _835 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _836 from "./ecocredit/v1/tx.rpc.msg";
import * as _837 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _838 from "./intertx/v1/tx.rpc.msg";
import * as _905 from "./rpc.query";
import * as _906 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._453,
      ..._454,
      ..._455,
      ..._456,
      ..._817,
      ..._824,
      ..._832
    };
    export const v2 = {
      ..._457,
      ..._458,
      ..._459,
      ..._460,
      ..._818,
      ..._825,
      ..._833
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._461,
        ..._462,
        ..._463,
        ..._464,
        ..._819,
        ..._826,
        ..._834
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._465,
        ..._466,
        ..._467,
        ..._468,
        ..._820,
        ..._827,
        ..._835
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
      ..._821,
      ..._828,
      ..._836
    };
    export const v1alpha1 = {
      ..._474,
      ..._475,
      ..._476,
      ..._477,
      ..._822,
      ..._829,
      ..._837
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._478,
      ..._479,
      ..._823,
      ..._830,
      ..._831,
      ..._838
    };
  }
  export const ClientFactory = {
    ..._905,
    ..._906
  };
}