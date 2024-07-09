import * as _320 from "./data/v1/events";
import * as _321 from "./data/v1/state";
import * as _322 from "./data/v1/tx";
import * as _323 from "./data/v1/types";
import * as _324 from "./data/v2/events";
import * as _325 from "./data/v2/state";
import * as _326 from "./data/v2/tx";
import * as _327 from "./data/v2/types";
import * as _328 from "./ecocredit/basket/v1/events";
import * as _329 from "./ecocredit/basket/v1/state";
import * as _330 from "./ecocredit/basket/v1/tx";
import * as _331 from "./ecocredit/basket/v1/types";
import * as _332 from "./ecocredit/marketplace/v1/events";
import * as _333 from "./ecocredit/marketplace/v1/state";
import * as _334 from "./ecocredit/marketplace/v1/tx";
import * as _335 from "./ecocredit/marketplace/v1/types";
import * as _336 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _337 from "./ecocredit/v1/events";
import * as _338 from "./ecocredit/v1/state";
import * as _339 from "./ecocredit/v1/tx";
import * as _340 from "./ecocredit/v1/types";
import * as _341 from "./ecocredit/v1alpha1/events";
import * as _342 from "./ecocredit/v1alpha1/genesis";
import * as _343 from "./ecocredit/v1alpha1/tx";
import * as _344 from "./ecocredit/v1alpha1/types";
import * as _345 from "./intertx/v1/query";
import * as _346 from "./intertx/v1/tx";
import * as _597 from "./data/v1/tx.amino";
import * as _598 from "./data/v2/tx.amino";
import * as _599 from "./ecocredit/basket/v1/tx.amino";
import * as _600 from "./ecocredit/marketplace/v1/tx.amino";
import * as _601 from "./ecocredit/v1/tx.amino";
import * as _602 from "./ecocredit/v1alpha1/tx.amino";
import * as _603 from "./intertx/v1/tx.amino";
import * as _604 from "./data/v1/tx.registry";
import * as _605 from "./data/v2/tx.registry";
import * as _606 from "./ecocredit/basket/v1/tx.registry";
import * as _607 from "./ecocredit/marketplace/v1/tx.registry";
import * as _608 from "./ecocredit/v1/tx.registry";
import * as _609 from "./ecocredit/v1alpha1/tx.registry";
import * as _610 from "./intertx/v1/tx.registry";
import * as _611 from "./intertx/v1/query.rpc.Query";
import * as _612 from "./data/v1/tx.rpc.msg";
import * as _613 from "./data/v2/tx.rpc.msg";
import * as _614 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _615 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _616 from "./ecocredit/v1/tx.rpc.msg";
import * as _617 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _618 from "./intertx/v1/tx.rpc.msg";
import * as _662 from "./rpc.query";
import * as _663 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._320,
      ..._321,
      ..._322,
      ..._323,
      ..._597,
      ..._604,
      ..._612
    };
    export const v2 = {
      ..._324,
      ..._325,
      ..._326,
      ..._327,
      ..._598,
      ..._605,
      ..._613
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._328,
        ..._329,
        ..._330,
        ..._331,
        ..._599,
        ..._606,
        ..._614
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._332,
        ..._333,
        ..._334,
        ..._335,
        ..._600,
        ..._607,
        ..._615
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._336
      };
    }
    export const v1 = {
      ..._337,
      ..._338,
      ..._339,
      ..._340,
      ..._601,
      ..._608,
      ..._616
    };
    export const v1alpha1 = {
      ..._341,
      ..._342,
      ..._343,
      ..._344,
      ..._602,
      ..._609,
      ..._617
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._345,
      ..._346,
      ..._603,
      ..._610,
      ..._611,
      ..._618
    };
  }
  export const ClientFactory = {
    ..._662,
    ..._663
  };
}