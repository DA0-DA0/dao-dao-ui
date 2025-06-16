import * as _442 from "./data/v1/events";
import * as _443 from "./data/v1/state";
import * as _444 from "./data/v1/tx";
import * as _445 from "./data/v1/types";
import * as _446 from "./data/v2/events";
import * as _447 from "./data/v2/state";
import * as _448 from "./data/v2/tx";
import * as _449 from "./data/v2/types";
import * as _450 from "./ecocredit/basket/v1/events";
import * as _451 from "./ecocredit/basket/v1/state";
import * as _452 from "./ecocredit/basket/v1/tx";
import * as _453 from "./ecocredit/basket/v1/types";
import * as _454 from "./ecocredit/marketplace/v1/events";
import * as _455 from "./ecocredit/marketplace/v1/state";
import * as _456 from "./ecocredit/marketplace/v1/tx";
import * as _457 from "./ecocredit/marketplace/v1/types";
import * as _458 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _459 from "./ecocredit/v1/events";
import * as _460 from "./ecocredit/v1/state";
import * as _461 from "./ecocredit/v1/tx";
import * as _462 from "./ecocredit/v1/types";
import * as _463 from "./ecocredit/v1alpha1/events";
import * as _464 from "./ecocredit/v1alpha1/genesis";
import * as _465 from "./ecocredit/v1alpha1/tx";
import * as _466 from "./ecocredit/v1alpha1/types";
import * as _467 from "./intertx/v1/query";
import * as _468 from "./intertx/v1/tx";
import * as _797 from "./data/v1/tx.amino";
import * as _798 from "./data/v2/tx.amino";
import * as _799 from "./ecocredit/basket/v1/tx.amino";
import * as _800 from "./ecocredit/marketplace/v1/tx.amino";
import * as _801 from "./ecocredit/v1/tx.amino";
import * as _802 from "./ecocredit/v1alpha1/tx.amino";
import * as _803 from "./intertx/v1/tx.amino";
import * as _804 from "./data/v1/tx.registry";
import * as _805 from "./data/v2/tx.registry";
import * as _806 from "./ecocredit/basket/v1/tx.registry";
import * as _807 from "./ecocredit/marketplace/v1/tx.registry";
import * as _808 from "./ecocredit/v1/tx.registry";
import * as _809 from "./ecocredit/v1alpha1/tx.registry";
import * as _810 from "./intertx/v1/tx.registry";
import * as _811 from "./intertx/v1/query.rpc.Query";
import * as _812 from "./data/v1/tx.rpc.msg";
import * as _813 from "./data/v2/tx.rpc.msg";
import * as _814 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _815 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _816 from "./ecocredit/v1/tx.rpc.msg";
import * as _817 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _818 from "./intertx/v1/tx.rpc.msg";
import * as _881 from "./rpc.query";
import * as _882 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._442,
      ..._443,
      ..._444,
      ..._445,
      ..._797,
      ..._804,
      ..._812
    };
    export const v2 = {
      ..._446,
      ..._447,
      ..._448,
      ..._449,
      ..._798,
      ..._805,
      ..._813
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._450,
        ..._451,
        ..._452,
        ..._453,
        ..._799,
        ..._806,
        ..._814
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._454,
        ..._455,
        ..._456,
        ..._457,
        ..._800,
        ..._807,
        ..._815
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._458
      };
    }
    export const v1 = {
      ..._459,
      ..._460,
      ..._461,
      ..._462,
      ..._801,
      ..._808,
      ..._816
    };
    export const v1alpha1 = {
      ..._463,
      ..._464,
      ..._465,
      ..._466,
      ..._802,
      ..._809,
      ..._817
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._467,
      ..._468,
      ..._803,
      ..._810,
      ..._811,
      ..._818
    };
  }
  export const ClientFactory = {
    ..._881,
    ..._882
  };
}