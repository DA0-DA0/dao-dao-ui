import * as _333 from "./data/v1/events";
import * as _334 from "./data/v1/state";
import * as _335 from "./data/v1/tx";
import * as _336 from "./data/v1/types";
import * as _337 from "./data/v2/events";
import * as _338 from "./data/v2/state";
import * as _339 from "./data/v2/tx";
import * as _340 from "./data/v2/types";
import * as _341 from "./ecocredit/basket/v1/events";
import * as _342 from "./ecocredit/basket/v1/state";
import * as _343 from "./ecocredit/basket/v1/tx";
import * as _344 from "./ecocredit/basket/v1/types";
import * as _345 from "./ecocredit/marketplace/v1/events";
import * as _346 from "./ecocredit/marketplace/v1/state";
import * as _347 from "./ecocredit/marketplace/v1/tx";
import * as _348 from "./ecocredit/marketplace/v1/types";
import * as _349 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _350 from "./ecocredit/v1/events";
import * as _351 from "./ecocredit/v1/state";
import * as _352 from "./ecocredit/v1/tx";
import * as _353 from "./ecocredit/v1/types";
import * as _354 from "./ecocredit/v1alpha1/events";
import * as _355 from "./ecocredit/v1alpha1/genesis";
import * as _356 from "./ecocredit/v1alpha1/tx";
import * as _357 from "./ecocredit/v1alpha1/types";
import * as _358 from "./intertx/v1/query";
import * as _359 from "./intertx/v1/tx";
import * as _619 from "./data/v1/tx.amino";
import * as _620 from "./data/v2/tx.amino";
import * as _621 from "./ecocredit/basket/v1/tx.amino";
import * as _622 from "./ecocredit/marketplace/v1/tx.amino";
import * as _623 from "./ecocredit/v1/tx.amino";
import * as _624 from "./ecocredit/v1alpha1/tx.amino";
import * as _625 from "./intertx/v1/tx.amino";
import * as _626 from "./data/v1/tx.registry";
import * as _627 from "./data/v2/tx.registry";
import * as _628 from "./ecocredit/basket/v1/tx.registry";
import * as _629 from "./ecocredit/marketplace/v1/tx.registry";
import * as _630 from "./ecocredit/v1/tx.registry";
import * as _631 from "./ecocredit/v1alpha1/tx.registry";
import * as _632 from "./intertx/v1/tx.registry";
import * as _633 from "./intertx/v1/query.rpc.Query";
import * as _634 from "./data/v1/tx.rpc.msg";
import * as _635 from "./data/v2/tx.rpc.msg";
import * as _636 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _637 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _638 from "./ecocredit/v1/tx.rpc.msg";
import * as _639 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _640 from "./intertx/v1/tx.rpc.msg";
import * as _687 from "./rpc.query";
import * as _688 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._333,
      ..._334,
      ..._335,
      ..._336,
      ..._619,
      ..._626,
      ..._634
    };
    export const v2 = {
      ..._337,
      ..._338,
      ..._339,
      ..._340,
      ..._620,
      ..._627,
      ..._635
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._341,
        ..._342,
        ..._343,
        ..._344,
        ..._621,
        ..._628,
        ..._636
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._345,
        ..._346,
        ..._347,
        ..._348,
        ..._622,
        ..._629,
        ..._637
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._349
      };
    }
    export const v1 = {
      ..._350,
      ..._351,
      ..._352,
      ..._353,
      ..._623,
      ..._630,
      ..._638
    };
    export const v1alpha1 = {
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._624,
      ..._631,
      ..._639
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._358,
      ..._359,
      ..._625,
      ..._632,
      ..._633,
      ..._640
    };
  }
  export const ClientFactory = {
    ..._687,
    ..._688
  };
}