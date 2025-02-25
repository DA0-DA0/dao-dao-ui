import * as _343 from "./data/v1/events";
import * as _344 from "./data/v1/state";
import * as _345 from "./data/v1/tx";
import * as _346 from "./data/v1/types";
import * as _347 from "./data/v2/events";
import * as _348 from "./data/v2/state";
import * as _349 from "./data/v2/tx";
import * as _350 from "./data/v2/types";
import * as _351 from "./ecocredit/basket/v1/events";
import * as _352 from "./ecocredit/basket/v1/state";
import * as _353 from "./ecocredit/basket/v1/tx";
import * as _354 from "./ecocredit/basket/v1/types";
import * as _355 from "./ecocredit/marketplace/v1/events";
import * as _356 from "./ecocredit/marketplace/v1/state";
import * as _357 from "./ecocredit/marketplace/v1/tx";
import * as _358 from "./ecocredit/marketplace/v1/types";
import * as _359 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _360 from "./ecocredit/v1/events";
import * as _361 from "./ecocredit/v1/state";
import * as _362 from "./ecocredit/v1/tx";
import * as _363 from "./ecocredit/v1/types";
import * as _364 from "./ecocredit/v1alpha1/events";
import * as _365 from "./ecocredit/v1alpha1/genesis";
import * as _366 from "./ecocredit/v1alpha1/tx";
import * as _367 from "./ecocredit/v1alpha1/types";
import * as _368 from "./intertx/v1/query";
import * as _369 from "./intertx/v1/tx";
import * as _655 from "./data/v1/tx.amino";
import * as _656 from "./data/v2/tx.amino";
import * as _657 from "./ecocredit/basket/v1/tx.amino";
import * as _658 from "./ecocredit/marketplace/v1/tx.amino";
import * as _659 from "./ecocredit/v1/tx.amino";
import * as _660 from "./ecocredit/v1alpha1/tx.amino";
import * as _661 from "./intertx/v1/tx.amino";
import * as _662 from "./data/v1/tx.registry";
import * as _663 from "./data/v2/tx.registry";
import * as _664 from "./ecocredit/basket/v1/tx.registry";
import * as _665 from "./ecocredit/marketplace/v1/tx.registry";
import * as _666 from "./ecocredit/v1/tx.registry";
import * as _667 from "./ecocredit/v1alpha1/tx.registry";
import * as _668 from "./intertx/v1/tx.registry";
import * as _669 from "./intertx/v1/query.rpc.Query";
import * as _670 from "./data/v1/tx.rpc.msg";
import * as _671 from "./data/v2/tx.rpc.msg";
import * as _672 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _673 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _674 from "./ecocredit/v1/tx.rpc.msg";
import * as _675 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _676 from "./intertx/v1/tx.rpc.msg";
import * as _735 from "./rpc.query";
import * as _736 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._343,
      ..._344,
      ..._345,
      ..._346,
      ..._655,
      ..._662,
      ..._670
    };
    export const v2 = {
      ..._347,
      ..._348,
      ..._349,
      ..._350,
      ..._656,
      ..._663,
      ..._671
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._351,
        ..._352,
        ..._353,
        ..._354,
        ..._657,
        ..._664,
        ..._672
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._355,
        ..._356,
        ..._357,
        ..._358,
        ..._658,
        ..._665,
        ..._673
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._359
      };
    }
    export const v1 = {
      ..._360,
      ..._361,
      ..._362,
      ..._363,
      ..._659,
      ..._666,
      ..._674
    };
    export const v1alpha1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._660,
      ..._667,
      ..._675
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._368,
      ..._369,
      ..._661,
      ..._668,
      ..._669,
      ..._676
    };
  }
  export const ClientFactory = {
    ..._735,
    ..._736
  };
}