import * as _337 from "./data/v1/events";
import * as _338 from "./data/v1/state";
import * as _339 from "./data/v1/tx";
import * as _340 from "./data/v1/types";
import * as _341 from "./data/v2/events";
import * as _342 from "./data/v2/state";
import * as _343 from "./data/v2/tx";
import * as _344 from "./data/v2/types";
import * as _345 from "./ecocredit/basket/v1/events";
import * as _346 from "./ecocredit/basket/v1/state";
import * as _347 from "./ecocredit/basket/v1/tx";
import * as _348 from "./ecocredit/basket/v1/types";
import * as _349 from "./ecocredit/marketplace/v1/events";
import * as _350 from "./ecocredit/marketplace/v1/state";
import * as _351 from "./ecocredit/marketplace/v1/tx";
import * as _352 from "./ecocredit/marketplace/v1/types";
import * as _353 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _354 from "./ecocredit/v1/events";
import * as _355 from "./ecocredit/v1/state";
import * as _356 from "./ecocredit/v1/tx";
import * as _357 from "./ecocredit/v1/types";
import * as _358 from "./ecocredit/v1alpha1/events";
import * as _359 from "./ecocredit/v1alpha1/genesis";
import * as _360 from "./ecocredit/v1alpha1/tx";
import * as _361 from "./ecocredit/v1alpha1/types";
import * as _362 from "./intertx/v1/query";
import * as _363 from "./intertx/v1/tx";
import * as _623 from "./data/v1/tx.amino";
import * as _624 from "./data/v2/tx.amino";
import * as _625 from "./ecocredit/basket/v1/tx.amino";
import * as _626 from "./ecocredit/marketplace/v1/tx.amino";
import * as _627 from "./ecocredit/v1/tx.amino";
import * as _628 from "./ecocredit/v1alpha1/tx.amino";
import * as _629 from "./intertx/v1/tx.amino";
import * as _630 from "./data/v1/tx.registry";
import * as _631 from "./data/v2/tx.registry";
import * as _632 from "./ecocredit/basket/v1/tx.registry";
import * as _633 from "./ecocredit/marketplace/v1/tx.registry";
import * as _634 from "./ecocredit/v1/tx.registry";
import * as _635 from "./ecocredit/v1alpha1/tx.registry";
import * as _636 from "./intertx/v1/tx.registry";
import * as _637 from "./intertx/v1/query.rpc.Query";
import * as _638 from "./data/v1/tx.rpc.msg";
import * as _639 from "./data/v2/tx.rpc.msg";
import * as _640 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _641 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _642 from "./ecocredit/v1/tx.rpc.msg";
import * as _643 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _644 from "./intertx/v1/tx.rpc.msg";
import * as _691 from "./rpc.query";
import * as _692 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._337,
      ..._338,
      ..._339,
      ..._340,
      ..._623,
      ..._630,
      ..._638
    };
    export const v2 = {
      ..._341,
      ..._342,
      ..._343,
      ..._344,
      ..._624,
      ..._631,
      ..._639
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._345,
        ..._346,
        ..._347,
        ..._348,
        ..._625,
        ..._632,
        ..._640
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._349,
        ..._350,
        ..._351,
        ..._352,
        ..._626,
        ..._633,
        ..._641
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._353
      };
    }
    export const v1 = {
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._627,
      ..._634,
      ..._642
    };
    export const v1alpha1 = {
      ..._358,
      ..._359,
      ..._360,
      ..._361,
      ..._628,
      ..._635,
      ..._643
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._362,
      ..._363,
      ..._629,
      ..._636,
      ..._637,
      ..._644
    };
  }
  export const ClientFactory = {
    ..._691,
    ..._692
  };
}