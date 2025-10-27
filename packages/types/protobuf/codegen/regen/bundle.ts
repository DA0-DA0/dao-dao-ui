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
import * as _844 from "./data/v1/tx.amino";
import * as _845 from "./data/v2/tx.amino";
import * as _846 from "./ecocredit/basket/v1/tx.amino";
import * as _847 from "./ecocredit/marketplace/v1/tx.amino";
import * as _848 from "./ecocredit/v1/tx.amino";
import * as _849 from "./ecocredit/v1alpha1/tx.amino";
import * as _850 from "./intertx/v1/tx.amino";
import * as _851 from "./data/v1/tx.registry";
import * as _852 from "./data/v2/tx.registry";
import * as _853 from "./ecocredit/basket/v1/tx.registry";
import * as _854 from "./ecocredit/marketplace/v1/tx.registry";
import * as _855 from "./ecocredit/v1/tx.registry";
import * as _856 from "./ecocredit/v1alpha1/tx.registry";
import * as _857 from "./intertx/v1/tx.registry";
import * as _858 from "./intertx/v1/query.rpc.Query";
import * as _859 from "./data/v1/tx.rpc.msg";
import * as _860 from "./data/v2/tx.rpc.msg";
import * as _861 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _862 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _863 from "./ecocredit/v1/tx.rpc.msg";
import * as _864 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _865 from "./intertx/v1/tx.rpc.msg";
import * as _936 from "./rpc.query";
import * as _937 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._462,
      ..._463,
      ..._464,
      ..._465,
      ..._844,
      ..._851,
      ..._859
    };
    export const v2 = {
      ..._466,
      ..._467,
      ..._468,
      ..._469,
      ..._845,
      ..._852,
      ..._860
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._470,
        ..._471,
        ..._472,
        ..._473,
        ..._846,
        ..._853,
        ..._861
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._474,
        ..._475,
        ..._476,
        ..._477,
        ..._847,
        ..._854,
        ..._862
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
      ..._848,
      ..._855,
      ..._863
    };
    export const v1alpha1 = {
      ..._483,
      ..._484,
      ..._485,
      ..._486,
      ..._849,
      ..._856,
      ..._864
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._487,
      ..._488,
      ..._850,
      ..._857,
      ..._858,
      ..._865
    };
  }
  export const ClientFactory = {
    ..._936,
    ..._937
  };
}