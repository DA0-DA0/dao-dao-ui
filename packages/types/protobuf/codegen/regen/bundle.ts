import * as _326 from "./data/v1/events";
import * as _327 from "./data/v1/state";
import * as _328 from "./data/v1/tx";
import * as _329 from "./data/v1/types";
import * as _330 from "./data/v2/events";
import * as _331 from "./data/v2/state";
import * as _332 from "./data/v2/tx";
import * as _333 from "./data/v2/types";
import * as _334 from "./ecocredit/basket/v1/events";
import * as _335 from "./ecocredit/basket/v1/state";
import * as _336 from "./ecocredit/basket/v1/tx";
import * as _337 from "./ecocredit/basket/v1/types";
import * as _338 from "./ecocredit/marketplace/v1/events";
import * as _339 from "./ecocredit/marketplace/v1/state";
import * as _340 from "./ecocredit/marketplace/v1/tx";
import * as _341 from "./ecocredit/marketplace/v1/types";
import * as _342 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _343 from "./ecocredit/v1/events";
import * as _344 from "./ecocredit/v1/state";
import * as _345 from "./ecocredit/v1/tx";
import * as _346 from "./ecocredit/v1/types";
import * as _347 from "./ecocredit/v1alpha1/events";
import * as _348 from "./ecocredit/v1alpha1/genesis";
import * as _349 from "./ecocredit/v1alpha1/tx";
import * as _350 from "./ecocredit/v1alpha1/types";
import * as _351 from "./intertx/v1/query";
import * as _352 from "./intertx/v1/tx";
import * as _607 from "./data/v1/tx.amino";
import * as _608 from "./data/v2/tx.amino";
import * as _609 from "./ecocredit/basket/v1/tx.amino";
import * as _610 from "./ecocredit/marketplace/v1/tx.amino";
import * as _611 from "./ecocredit/v1/tx.amino";
import * as _612 from "./ecocredit/v1alpha1/tx.amino";
import * as _613 from "./intertx/v1/tx.amino";
import * as _614 from "./data/v1/tx.registry";
import * as _615 from "./data/v2/tx.registry";
import * as _616 from "./ecocredit/basket/v1/tx.registry";
import * as _617 from "./ecocredit/marketplace/v1/tx.registry";
import * as _618 from "./ecocredit/v1/tx.registry";
import * as _619 from "./ecocredit/v1alpha1/tx.registry";
import * as _620 from "./intertx/v1/tx.registry";
import * as _621 from "./intertx/v1/query.rpc.Query";
import * as _622 from "./data/v1/tx.rpc.msg";
import * as _623 from "./data/v2/tx.rpc.msg";
import * as _624 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _625 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _626 from "./ecocredit/v1/tx.rpc.msg";
import * as _627 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _628 from "./intertx/v1/tx.rpc.msg";
import * as _672 from "./rpc.query";
import * as _673 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._607,
      ..._614,
      ..._622
    };
    export const v2 = {
      ..._330,
      ..._331,
      ..._332,
      ..._333,
      ..._608,
      ..._615,
      ..._623
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._334,
        ..._335,
        ..._336,
        ..._337,
        ..._609,
        ..._616,
        ..._624
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._338,
        ..._339,
        ..._340,
        ..._341,
        ..._610,
        ..._617,
        ..._625
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._342
      };
    }
    export const v1 = {
      ..._343,
      ..._344,
      ..._345,
      ..._346,
      ..._611,
      ..._618,
      ..._626
    };
    export const v1alpha1 = {
      ..._347,
      ..._348,
      ..._349,
      ..._350,
      ..._612,
      ..._619,
      ..._627
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._351,
      ..._352,
      ..._613,
      ..._620,
      ..._621,
      ..._628
    };
  }
  export const ClientFactory = {
    ..._672,
    ..._673
  };
}