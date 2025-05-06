import * as _347 from "./data/v1/events";
import * as _348 from "./data/v1/state";
import * as _349 from "./data/v1/tx";
import * as _350 from "./data/v1/types";
import * as _351 from "./data/v2/events";
import * as _352 from "./data/v2/state";
import * as _353 from "./data/v2/tx";
import * as _354 from "./data/v2/types";
import * as _355 from "./ecocredit/basket/v1/events";
import * as _356 from "./ecocredit/basket/v1/state";
import * as _357 from "./ecocredit/basket/v1/tx";
import * as _358 from "./ecocredit/basket/v1/types";
import * as _359 from "./ecocredit/marketplace/v1/events";
import * as _360 from "./ecocredit/marketplace/v1/state";
import * as _361 from "./ecocredit/marketplace/v1/tx";
import * as _362 from "./ecocredit/marketplace/v1/types";
import * as _363 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _364 from "./ecocredit/v1/events";
import * as _365 from "./ecocredit/v1/state";
import * as _366 from "./ecocredit/v1/tx";
import * as _367 from "./ecocredit/v1/types";
import * as _368 from "./ecocredit/v1alpha1/events";
import * as _369 from "./ecocredit/v1alpha1/genesis";
import * as _370 from "./ecocredit/v1alpha1/tx";
import * as _371 from "./ecocredit/v1alpha1/types";
import * as _372 from "./intertx/v1/query";
import * as _373 from "./intertx/v1/tx";
import * as _659 from "./data/v1/tx.amino";
import * as _660 from "./data/v2/tx.amino";
import * as _661 from "./ecocredit/basket/v1/tx.amino";
import * as _662 from "./ecocredit/marketplace/v1/tx.amino";
import * as _663 from "./ecocredit/v1/tx.amino";
import * as _664 from "./ecocredit/v1alpha1/tx.amino";
import * as _665 from "./intertx/v1/tx.amino";
import * as _666 from "./data/v1/tx.registry";
import * as _667 from "./data/v2/tx.registry";
import * as _668 from "./ecocredit/basket/v1/tx.registry";
import * as _669 from "./ecocredit/marketplace/v1/tx.registry";
import * as _670 from "./ecocredit/v1/tx.registry";
import * as _671 from "./ecocredit/v1alpha1/tx.registry";
import * as _672 from "./intertx/v1/tx.registry";
import * as _673 from "./intertx/v1/query.rpc.Query";
import * as _674 from "./data/v1/tx.rpc.msg";
import * as _675 from "./data/v2/tx.rpc.msg";
import * as _676 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _677 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _678 from "./ecocredit/v1/tx.rpc.msg";
import * as _679 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _680 from "./intertx/v1/tx.rpc.msg";
import * as _739 from "./rpc.query";
import * as _740 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._347,
      ..._348,
      ..._349,
      ..._350,
      ..._659,
      ..._666,
      ..._674
    };
    export const v2 = {
      ..._351,
      ..._352,
      ..._353,
      ..._354,
      ..._660,
      ..._667,
      ..._675
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._355,
        ..._356,
        ..._357,
        ..._358,
        ..._661,
        ..._668,
        ..._676
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._359,
        ..._360,
        ..._361,
        ..._362,
        ..._662,
        ..._669,
        ..._677
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._363
      };
    }
    export const v1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._663,
      ..._670,
      ..._678
    };
    export const v1alpha1 = {
      ..._368,
      ..._369,
      ..._370,
      ..._371,
      ..._664,
      ..._671,
      ..._679
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._372,
      ..._373,
      ..._665,
      ..._672,
      ..._673,
      ..._680
    };
  }
  export const ClientFactory = {
    ..._739,
    ..._740
  };
}