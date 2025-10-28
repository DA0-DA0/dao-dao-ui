import * as _462 from "./data/v1/events";
import * as _463 from "./data/v1/state";
import * as _464 from "./data/v1/tx";
import * as _465 from "./data/v1/types";
import * as _466 from "./data/v2/events";
import * as _467 from "./data/v2/state";
import * as _468 from "./data/v2/tx";
import * as _469 from "./data/v2/types";
import * as _470 from "./ecocredit/basket/v1/events";
import * as _471 from "./ecocredit/basket/v1/state";
import * as _472 from "./ecocredit/basket/v1/tx";
import * as _473 from "./ecocredit/basket/v1/types";
import * as _474 from "./ecocredit/marketplace/v1/events";
import * as _475 from "./ecocredit/marketplace/v1/state";
import * as _476 from "./ecocredit/marketplace/v1/tx";
import * as _477 from "./ecocredit/marketplace/v1/types";
import * as _478 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _479 from "./ecocredit/v1/events";
import * as _480 from "./ecocredit/v1/state";
import * as _481 from "./ecocredit/v1/tx";
import * as _482 from "./ecocredit/v1/types";
import * as _483 from "./ecocredit/v1alpha1/events";
import * as _484 from "./ecocredit/v1alpha1/genesis";
import * as _485 from "./ecocredit/v1alpha1/tx";
import * as _486 from "./ecocredit/v1alpha1/types";
import * as _487 from "./intertx/v1/query";
import * as _488 from "./intertx/v1/tx";
import * as _830 from "./data/v1/tx.amino";
import * as _831 from "./data/v2/tx.amino";
import * as _832 from "./ecocredit/basket/v1/tx.amino";
import * as _833 from "./ecocredit/marketplace/v1/tx.amino";
import * as _834 from "./ecocredit/v1/tx.amino";
import * as _835 from "./ecocredit/v1alpha1/tx.amino";
import * as _836 from "./intertx/v1/tx.amino";
import * as _837 from "./data/v1/tx.registry";
import * as _838 from "./data/v2/tx.registry";
import * as _839 from "./ecocredit/basket/v1/tx.registry";
import * as _840 from "./ecocredit/marketplace/v1/tx.registry";
import * as _841 from "./ecocredit/v1/tx.registry";
import * as _842 from "./ecocredit/v1alpha1/tx.registry";
import * as _843 from "./intertx/v1/tx.registry";
import * as _844 from "./intertx/v1/query.rpc.Query";
import * as _845 from "./data/v1/tx.rpc.msg";
import * as _846 from "./data/v2/tx.rpc.msg";
import * as _847 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _848 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _849 from "./ecocredit/v1/tx.rpc.msg";
import * as _850 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _851 from "./intertx/v1/tx.rpc.msg";
import * as _918 from "./rpc.query";
import * as _919 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._462,
      ..._463,
      ..._464,
      ..._465,
      ..._830,
      ..._837,
      ..._845
    };
    export const v2 = {
      ..._466,
      ..._467,
      ..._468,
      ..._469,
      ..._831,
      ..._838,
      ..._846
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._470,
        ..._471,
        ..._472,
        ..._473,
        ..._832,
        ..._839,
        ..._847
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._474,
        ..._475,
        ..._476,
        ..._477,
        ..._833,
        ..._840,
        ..._848
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._478
      };
    }
    export const v1 = {
      ..._479,
      ..._480,
      ..._481,
      ..._482,
      ..._834,
      ..._841,
      ..._849
    };
    export const v1alpha1 = {
      ..._483,
      ..._484,
      ..._485,
      ..._486,
      ..._835,
      ..._842,
      ..._850
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._487,
      ..._488,
      ..._836,
      ..._843,
      ..._844,
      ..._851
    };
  }
  export const ClientFactory = {
    ..._918,
    ..._919
  };
}