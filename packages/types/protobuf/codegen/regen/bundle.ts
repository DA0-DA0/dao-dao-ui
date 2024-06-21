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
import * as _574 from "./data/v1/tx.amino";
import * as _575 from "./data/v2/tx.amino";
import * as _576 from "./ecocredit/basket/v1/tx.amino";
import * as _577 from "./ecocredit/marketplace/v1/tx.amino";
import * as _578 from "./ecocredit/v1/tx.amino";
import * as _579 from "./ecocredit/v1alpha1/tx.amino";
import * as _580 from "./intertx/v1/tx.amino";
import * as _581 from "./data/v1/tx.registry";
import * as _582 from "./data/v2/tx.registry";
import * as _583 from "./ecocredit/basket/v1/tx.registry";
import * as _584 from "./ecocredit/marketplace/v1/tx.registry";
import * as _585 from "./ecocredit/v1/tx.registry";
import * as _586 from "./ecocredit/v1alpha1/tx.registry";
import * as _587 from "./intertx/v1/tx.registry";
import * as _588 from "./intertx/v1/query.rpc.Query";
import * as _589 from "./data/v1/tx.rpc.msg";
import * as _590 from "./data/v2/tx.rpc.msg";
import * as _591 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _592 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _593 from "./ecocredit/v1/tx.rpc.msg";
import * as _594 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _595 from "./intertx/v1/tx.rpc.msg";
import * as _624 from "./rpc.query";
import * as _625 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._574,
      ..._581,
      ..._589
    };
    export const v2 = {
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._575,
      ..._582,
      ..._590
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._323,
        ..._324,
        ..._325,
        ..._326,
        ..._576,
        ..._583,
        ..._591
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._327,
        ..._328,
        ..._329,
        ..._330,
        ..._577,
        ..._584,
        ..._592
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
      ..._578,
      ..._585,
      ..._593
    };
    export const v1alpha1 = {
      ..._336,
      ..._337,
      ..._338,
      ..._339,
      ..._579,
      ..._586,
      ..._594
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._340,
      ..._341,
      ..._580,
      ..._587,
      ..._588,
      ..._595
    };
  }
  export const ClientFactory = {
    ..._624,
    ..._625
  };
}