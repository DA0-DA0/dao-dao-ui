import * as _315 from "./data/v1/events";
import * as _316 from "./data/v1/state";
import * as _317 from "./data/v1/tx";
import * as _318 from "./data/v1/types";
import * as _319 from "./data/v2/events";
import * as _320 from "./data/v2/state";
import * as _321 from "./data/v2/tx";
import * as _322 from "./data/v2/types";
import * as _323 from "./ecocredit/basket/v1/events";
import * as _324 from "./ecocredit/basket/v1/state";
import * as _325 from "./ecocredit/basket/v1/tx";
import * as _326 from "./ecocredit/basket/v1/types";
import * as _327 from "./ecocredit/marketplace/v1/events";
import * as _328 from "./ecocredit/marketplace/v1/state";
import * as _329 from "./ecocredit/marketplace/v1/tx";
import * as _330 from "./ecocredit/marketplace/v1/types";
import * as _331 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _332 from "./ecocredit/v1/events";
import * as _333 from "./ecocredit/v1/state";
import * as _334 from "./ecocredit/v1/tx";
import * as _335 from "./ecocredit/v1/types";
import * as _336 from "./ecocredit/v1alpha1/events";
import * as _337 from "./ecocredit/v1alpha1/genesis";
import * as _338 from "./ecocredit/v1alpha1/tx";
import * as _339 from "./ecocredit/v1alpha1/types";
import * as _340 from "./intertx/v1/query";
import * as _341 from "./intertx/v1/tx";
import * as _589 from "./data/v1/tx.amino";
import * as _590 from "./data/v2/tx.amino";
import * as _591 from "./ecocredit/basket/v1/tx.amino";
import * as _592 from "./ecocredit/marketplace/v1/tx.amino";
import * as _593 from "./ecocredit/v1/tx.amino";
import * as _594 from "./ecocredit/v1alpha1/tx.amino";
import * as _595 from "./intertx/v1/tx.amino";
import * as _596 from "./data/v1/tx.registry";
import * as _597 from "./data/v2/tx.registry";
import * as _598 from "./ecocredit/basket/v1/tx.registry";
import * as _599 from "./ecocredit/marketplace/v1/tx.registry";
import * as _600 from "./ecocredit/v1/tx.registry";
import * as _601 from "./ecocredit/v1alpha1/tx.registry";
import * as _602 from "./intertx/v1/tx.registry";
import * as _603 from "./intertx/v1/query.rpc.Query";
import * as _604 from "./data/v1/tx.rpc.msg";
import * as _605 from "./data/v2/tx.rpc.msg";
import * as _606 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _607 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _608 from "./ecocredit/v1/tx.rpc.msg";
import * as _609 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _610 from "./intertx/v1/tx.rpc.msg";
import * as _653 from "./rpc.query";
import * as _654 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._589,
      ..._596,
      ..._604
    };
    export const v2 = {
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._590,
      ..._597,
      ..._605
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._323,
        ..._324,
        ..._325,
        ..._326,
        ..._591,
        ..._598,
        ..._606
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._327,
        ..._328,
        ..._329,
        ..._330,
        ..._592,
        ..._599,
        ..._607
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._331
      };
    }
    export const v1 = {
      ..._332,
      ..._333,
      ..._334,
      ..._335,
      ..._593,
      ..._600,
      ..._608
    };
    export const v1alpha1 = {
      ..._336,
      ..._337,
      ..._338,
      ..._339,
      ..._594,
      ..._601,
      ..._609
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._340,
      ..._341,
      ..._595,
      ..._602,
      ..._603,
      ..._610
    };
  }
  export const ClientFactory = {
    ..._653,
    ..._654
  };
}