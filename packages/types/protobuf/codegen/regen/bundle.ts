import * as _314 from "./data/v1/events";
import * as _315 from "./data/v1/state";
import * as _316 from "./data/v1/tx";
import * as _317 from "./data/v1/types";
import * as _318 from "./data/v2/events";
import * as _319 from "./data/v2/state";
import * as _320 from "./data/v2/tx";
import * as _321 from "./data/v2/types";
import * as _322 from "./ecocredit/basket/v1/events";
import * as _323 from "./ecocredit/basket/v1/state";
import * as _324 from "./ecocredit/basket/v1/tx";
import * as _325 from "./ecocredit/basket/v1/types";
import * as _326 from "./ecocredit/marketplace/v1/events";
import * as _327 from "./ecocredit/marketplace/v1/state";
import * as _328 from "./ecocredit/marketplace/v1/tx";
import * as _329 from "./ecocredit/marketplace/v1/types";
import * as _330 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _331 from "./ecocredit/v1/events";
import * as _332 from "./ecocredit/v1/state";
import * as _333 from "./ecocredit/v1/tx";
import * as _334 from "./ecocredit/v1/types";
import * as _335 from "./ecocredit/v1alpha1/events";
import * as _336 from "./ecocredit/v1alpha1/genesis";
import * as _337 from "./ecocredit/v1alpha1/tx";
import * as _338 from "./ecocredit/v1alpha1/types";
import * as _339 from "./intertx/v1/query";
import * as _340 from "./intertx/v1/tx";
import * as _573 from "./data/v1/tx.amino";
import * as _574 from "./data/v2/tx.amino";
import * as _575 from "./ecocredit/basket/v1/tx.amino";
import * as _576 from "./ecocredit/marketplace/v1/tx.amino";
import * as _577 from "./ecocredit/v1/tx.amino";
import * as _578 from "./ecocredit/v1alpha1/tx.amino";
import * as _579 from "./intertx/v1/tx.amino";
import * as _580 from "./data/v1/tx.registry";
import * as _581 from "./data/v2/tx.registry";
import * as _582 from "./ecocredit/basket/v1/tx.registry";
import * as _583 from "./ecocredit/marketplace/v1/tx.registry";
import * as _584 from "./ecocredit/v1/tx.registry";
import * as _585 from "./ecocredit/v1alpha1/tx.registry";
import * as _586 from "./intertx/v1/tx.registry";
import * as _587 from "./intertx/v1/query.rpc.Query";
import * as _588 from "./data/v1/tx.rpc.msg";
import * as _589 from "./data/v2/tx.rpc.msg";
import * as _590 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _591 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _592 from "./ecocredit/v1/tx.rpc.msg";
import * as _593 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _594 from "./intertx/v1/tx.rpc.msg";
import * as _621 from "./rpc.query";
import * as _622 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._314,
      ..._315,
      ..._316,
      ..._317,
      ..._573,
      ..._580,
      ..._588
    };
    export const v2 = {
      ..._318,
      ..._319,
      ..._320,
      ..._321,
      ..._574,
      ..._581,
      ..._589
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._322,
        ..._323,
        ..._324,
        ..._325,
        ..._575,
        ..._582,
        ..._590
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._326,
        ..._327,
        ..._328,
        ..._329,
        ..._576,
        ..._583,
        ..._591
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._330
      };
    }
    export const v1 = {
      ..._331,
      ..._332,
      ..._333,
      ..._334,
      ..._577,
      ..._584,
      ..._592
    };
    export const v1alpha1 = {
      ..._335,
      ..._336,
      ..._337,
      ..._338,
      ..._578,
      ..._585,
      ..._593
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._339,
      ..._340,
      ..._579,
      ..._586,
      ..._587,
      ..._594
    };
  }
  export const ClientFactory = {
    ..._621,
    ..._622
  };
}