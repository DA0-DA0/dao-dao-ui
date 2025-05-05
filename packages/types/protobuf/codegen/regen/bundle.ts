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
import * as _651 from "./data/v1/tx.amino";
import * as _652 from "./data/v2/tx.amino";
import * as _653 from "./ecocredit/basket/v1/tx.amino";
import * as _654 from "./ecocredit/marketplace/v1/tx.amino";
import * as _655 from "./ecocredit/v1/tx.amino";
import * as _656 from "./ecocredit/v1alpha1/tx.amino";
import * as _657 from "./intertx/v1/tx.amino";
import * as _658 from "./data/v1/tx.registry";
import * as _659 from "./data/v2/tx.registry";
import * as _660 from "./ecocredit/basket/v1/tx.registry";
import * as _661 from "./ecocredit/marketplace/v1/tx.registry";
import * as _662 from "./ecocredit/v1/tx.registry";
import * as _663 from "./ecocredit/v1alpha1/tx.registry";
import * as _664 from "./intertx/v1/tx.registry";
import * as _665 from "./intertx/v1/query.rpc.Query";
import * as _666 from "./data/v1/tx.rpc.msg";
import * as _667 from "./data/v2/tx.rpc.msg";
import * as _668 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _669 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _670 from "./ecocredit/v1/tx.rpc.msg";
import * as _671 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _672 from "./intertx/v1/tx.rpc.msg";
import * as _731 from "./rpc.query";
import * as _732 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._343,
      ..._344,
      ..._345,
      ..._346,
      ..._651,
      ..._658,
      ..._666
    };
    export const v2 = {
      ..._347,
      ..._348,
      ..._349,
      ..._350,
      ..._652,
      ..._659,
      ..._667
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._351,
        ..._352,
        ..._353,
        ..._354,
        ..._653,
        ..._660,
        ..._668
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._355,
        ..._356,
        ..._357,
        ..._358,
        ..._654,
        ..._661,
        ..._669
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
      ..._655,
      ..._662,
      ..._670
    };
    export const v1alpha1 = {
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._656,
      ..._663,
      ..._671
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._368,
      ..._369,
      ..._657,
      ..._664,
      ..._665,
      ..._672
    };
  }
  export const ClientFactory = {
    ..._731,
    ..._732
  };
}