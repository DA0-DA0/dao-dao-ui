import * as _336 from "./data/v1/events";
import * as _337 from "./data/v1/state";
import * as _338 from "./data/v1/tx";
import * as _339 from "./data/v1/types";
import * as _340 from "./data/v2/events";
import * as _341 from "./data/v2/state";
import * as _342 from "./data/v2/tx";
import * as _343 from "./data/v2/types";
import * as _344 from "./ecocredit/basket/v1/events";
import * as _345 from "./ecocredit/basket/v1/state";
import * as _346 from "./ecocredit/basket/v1/tx";
import * as _347 from "./ecocredit/basket/v1/types";
import * as _348 from "./ecocredit/marketplace/v1/events";
import * as _349 from "./ecocredit/marketplace/v1/state";
import * as _350 from "./ecocredit/marketplace/v1/tx";
import * as _351 from "./ecocredit/marketplace/v1/types";
import * as _352 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _353 from "./ecocredit/v1/events";
import * as _354 from "./ecocredit/v1/state";
import * as _355 from "./ecocredit/v1/tx";
import * as _356 from "./ecocredit/v1/types";
import * as _357 from "./ecocredit/v1alpha1/events";
import * as _358 from "./ecocredit/v1alpha1/genesis";
import * as _359 from "./ecocredit/v1alpha1/tx";
import * as _360 from "./ecocredit/v1alpha1/types";
import * as _361 from "./intertx/v1/query";
import * as _362 from "./intertx/v1/tx";
import * as _622 from "./data/v1/tx.amino";
import * as _623 from "./data/v2/tx.amino";
import * as _624 from "./ecocredit/basket/v1/tx.amino";
import * as _625 from "./ecocredit/marketplace/v1/tx.amino";
import * as _626 from "./ecocredit/v1/tx.amino";
import * as _627 from "./ecocredit/v1alpha1/tx.amino";
import * as _628 from "./intertx/v1/tx.amino";
import * as _629 from "./data/v1/tx.registry";
import * as _630 from "./data/v2/tx.registry";
import * as _631 from "./ecocredit/basket/v1/tx.registry";
import * as _632 from "./ecocredit/marketplace/v1/tx.registry";
import * as _633 from "./ecocredit/v1/tx.registry";
import * as _634 from "./ecocredit/v1alpha1/tx.registry";
import * as _635 from "./intertx/v1/tx.registry";
import * as _636 from "./intertx/v1/query.rpc.Query";
import * as _637 from "./data/v1/tx.rpc.msg";
import * as _638 from "./data/v2/tx.rpc.msg";
import * as _639 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _640 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _641 from "./ecocredit/v1/tx.rpc.msg";
import * as _642 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _643 from "./intertx/v1/tx.rpc.msg";
import * as _690 from "./rpc.query";
import * as _691 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._336,
      ..._337,
      ..._338,
      ..._339,
      ..._622,
      ..._629,
      ..._637
    };
    export const v2 = {
      ..._340,
      ..._341,
      ..._342,
      ..._343,
      ..._623,
      ..._630,
      ..._638
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._344,
        ..._345,
        ..._346,
        ..._347,
        ..._624,
        ..._631,
        ..._639
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._348,
        ..._349,
        ..._350,
        ..._351,
        ..._625,
        ..._632,
        ..._640
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._352
      };
    }
    export const v1 = {
      ..._353,
      ..._354,
      ..._355,
      ..._356,
      ..._626,
      ..._633,
      ..._641
    };
    export const v1alpha1 = {
      ..._357,
      ..._358,
      ..._359,
      ..._360,
      ..._627,
      ..._634,
      ..._642
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._361,
      ..._362,
      ..._628,
      ..._635,
      ..._636,
      ..._643
    };
  }
  export const ClientFactory = {
    ..._690,
    ..._691
  };
}