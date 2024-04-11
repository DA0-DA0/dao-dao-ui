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
import * as _580 from "./data/v1/tx.amino";
import * as _581 from "./data/v2/tx.amino";
import * as _582 from "./ecocredit/basket/v1/tx.amino";
import * as _583 from "./ecocredit/marketplace/v1/tx.amino";
import * as _584 from "./ecocredit/v1/tx.amino";
import * as _585 from "./ecocredit/v1alpha1/tx.amino";
import * as _586 from "./intertx/v1/tx.amino";
import * as _587 from "./data/v1/tx.registry";
import * as _588 from "./data/v2/tx.registry";
import * as _589 from "./ecocredit/basket/v1/tx.registry";
import * as _590 from "./ecocredit/marketplace/v1/tx.registry";
import * as _591 from "./ecocredit/v1/tx.registry";
import * as _592 from "./ecocredit/v1alpha1/tx.registry";
import * as _593 from "./intertx/v1/tx.registry";
import * as _594 from "./intertx/v1/query.rpc.Query";
import * as _595 from "./data/v1/tx.rpc.msg";
import * as _596 from "./data/v2/tx.rpc.msg";
import * as _597 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _598 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _599 from "./ecocredit/v1/tx.rpc.msg";
import * as _600 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _601 from "./intertx/v1/tx.rpc.msg";
import * as _641 from "./rpc.query";
import * as _642 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._311,
      ..._312,
      ..._313,
      ..._314,
      ..._580,
      ..._587,
      ..._595
    };
    export const v2 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._581,
      ..._588,
      ..._596
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._319,
        ..._320,
        ..._321,
        ..._322,
        ..._582,
        ..._589,
        ..._597
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._323,
        ..._324,
        ..._325,
        ..._326,
        ..._583,
        ..._590,
        ..._598
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
      ..._584,
      ..._591,
      ..._599
    };
    export const v1alpha1 = {
      ..._332,
      ..._333,
      ..._334,
      ..._335,
      ..._585,
      ..._592,
      ..._600
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._336,
      ..._337,
      ..._586,
      ..._593,
      ..._594,
      ..._601
    };
  }
  export const ClientFactory = {
    ..._641,
    ..._642
  };
}