import * as _311 from "./data/v1/events";
import * as _312 from "./data/v1/state";
import * as _313 from "./data/v1/tx";
import * as _314 from "./data/v1/types";
import * as _315 from "./data/v2/events";
import * as _316 from "./data/v2/state";
import * as _317 from "./data/v2/tx";
import * as _318 from "./data/v2/types";
import * as _319 from "./ecocredit/basket/v1/events";
import * as _320 from "./ecocredit/basket/v1/state";
import * as _321 from "./ecocredit/basket/v1/tx";
import * as _322 from "./ecocredit/basket/v1/types";
import * as _323 from "./ecocredit/marketplace/v1/events";
import * as _324 from "./ecocredit/marketplace/v1/state";
import * as _325 from "./ecocredit/marketplace/v1/tx";
import * as _326 from "./ecocredit/marketplace/v1/types";
import * as _327 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _328 from "./ecocredit/v1/events";
import * as _329 from "./ecocredit/v1/state";
import * as _330 from "./ecocredit/v1/tx";
import * as _331 from "./ecocredit/v1/types";
import * as _332 from "./ecocredit/v1alpha1/events";
import * as _333 from "./ecocredit/v1alpha1/genesis";
import * as _334 from "./ecocredit/v1alpha1/tx";
import * as _335 from "./ecocredit/v1alpha1/types";
import * as _336 from "./intertx/v1/query";
import * as _337 from "./intertx/v1/tx";
import * as _566 from "./data/v1/tx.amino";
import * as _567 from "./data/v2/tx.amino";
import * as _568 from "./ecocredit/basket/v1/tx.amino";
import * as _569 from "./ecocredit/marketplace/v1/tx.amino";
import * as _570 from "./ecocredit/v1/tx.amino";
import * as _571 from "./ecocredit/v1alpha1/tx.amino";
import * as _572 from "./intertx/v1/tx.amino";
import * as _573 from "./data/v1/tx.registry";
import * as _574 from "./data/v2/tx.registry";
import * as _575 from "./ecocredit/basket/v1/tx.registry";
import * as _576 from "./ecocredit/marketplace/v1/tx.registry";
import * as _577 from "./ecocredit/v1/tx.registry";
import * as _578 from "./ecocredit/v1alpha1/tx.registry";
import * as _579 from "./intertx/v1/tx.registry";
import * as _580 from "./intertx/v1/query.rpc.Query";
import * as _581 from "./data/v1/tx.rpc.msg";
import * as _582 from "./data/v2/tx.rpc.msg";
import * as _583 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _584 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _585 from "./ecocredit/v1/tx.rpc.msg";
import * as _586 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _587 from "./intertx/v1/tx.rpc.msg";
import * as _614 from "./rpc.query";
import * as _615 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._311,
      ..._312,
      ..._313,
      ..._314,
      ..._566,
      ..._573,
      ..._581
    };
    export const v2 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._567,
      ..._574,
      ..._582
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._319,
        ..._320,
        ..._321,
        ..._322,
        ..._568,
        ..._575,
        ..._583
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._323,
        ..._324,
        ..._325,
        ..._326,
        ..._569,
        ..._576,
        ..._584
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._327
      };
    }
    export const v1 = {
      ..._328,
      ..._329,
      ..._330,
      ..._331,
      ..._570,
      ..._577,
      ..._585
    };
    export const v1alpha1 = {
      ..._332,
      ..._333,
      ..._334,
      ..._335,
      ..._571,
      ..._578,
      ..._586
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._336,
      ..._337,
      ..._572,
      ..._579,
      ..._580,
      ..._587
    };
  }
  export const ClientFactory = {
    ..._614,
    ..._615
  };
}