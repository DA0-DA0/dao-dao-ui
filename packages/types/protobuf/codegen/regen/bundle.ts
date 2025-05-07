import * as _354 from "./data/v1/events";
import * as _355 from "./data/v1/state";
import * as _356 from "./data/v1/tx";
import * as _357 from "./data/v1/types";
import * as _358 from "./data/v2/events";
import * as _359 from "./data/v2/state";
import * as _360 from "./data/v2/tx";
import * as _361 from "./data/v2/types";
import * as _362 from "./ecocredit/basket/v1/events";
import * as _363 from "./ecocredit/basket/v1/state";
import * as _364 from "./ecocredit/basket/v1/tx";
import * as _365 from "./ecocredit/basket/v1/types";
import * as _366 from "./ecocredit/marketplace/v1/events";
import * as _367 from "./ecocredit/marketplace/v1/state";
import * as _368 from "./ecocredit/marketplace/v1/tx";
import * as _369 from "./ecocredit/marketplace/v1/types";
import * as _370 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _371 from "./ecocredit/v1/events";
import * as _372 from "./ecocredit/v1/state";
import * as _373 from "./ecocredit/v1/tx";
import * as _374 from "./ecocredit/v1/types";
import * as _375 from "./ecocredit/v1alpha1/events";
import * as _376 from "./ecocredit/v1alpha1/genesis";
import * as _377 from "./ecocredit/v1alpha1/tx";
import * as _378 from "./ecocredit/v1alpha1/types";
import * as _379 from "./intertx/v1/query";
import * as _380 from "./intertx/v1/tx";
import * as _670 from "./data/v1/tx.amino";
import * as _671 from "./data/v2/tx.amino";
import * as _672 from "./ecocredit/basket/v1/tx.amino";
import * as _673 from "./ecocredit/marketplace/v1/tx.amino";
import * as _674 from "./ecocredit/v1/tx.amino";
import * as _675 from "./ecocredit/v1alpha1/tx.amino";
import * as _676 from "./intertx/v1/tx.amino";
import * as _677 from "./data/v1/tx.registry";
import * as _678 from "./data/v2/tx.registry";
import * as _679 from "./ecocredit/basket/v1/tx.registry";
import * as _680 from "./ecocredit/marketplace/v1/tx.registry";
import * as _681 from "./ecocredit/v1/tx.registry";
import * as _682 from "./ecocredit/v1alpha1/tx.registry";
import * as _683 from "./intertx/v1/tx.registry";
import * as _684 from "./intertx/v1/query.rpc.Query";
import * as _685 from "./data/v1/tx.rpc.msg";
import * as _686 from "./data/v2/tx.rpc.msg";
import * as _687 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _688 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _689 from "./ecocredit/v1/tx.rpc.msg";
import * as _690 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _691 from "./intertx/v1/tx.rpc.msg";
import * as _752 from "./rpc.query";
import * as _753 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._670,
      ..._677,
      ..._685
    };
    export const v2 = {
      ..._358,
      ..._359,
      ..._360,
      ..._361,
      ..._671,
      ..._678,
      ..._686
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._362,
        ..._363,
        ..._364,
        ..._365,
        ..._672,
        ..._679,
        ..._687
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._366,
        ..._367,
        ..._368,
        ..._369,
        ..._673,
        ..._680,
        ..._688
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._370
      };
    }
    export const v1 = {
      ..._371,
      ..._372,
      ..._373,
      ..._374,
      ..._674,
      ..._681,
      ..._689
    };
    export const v1alpha1 = {
      ..._375,
      ..._376,
      ..._377,
      ..._378,
      ..._675,
      ..._682,
      ..._690
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._379,
      ..._380,
      ..._676,
      ..._683,
      ..._684,
      ..._691
    };
  }
  export const ClientFactory = {
    ..._752,
    ..._753
  };
}