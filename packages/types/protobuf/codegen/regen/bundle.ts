import * as _309 from "./data/v1/events";
import * as _310 from "./data/v1/state";
import * as _311 from "./data/v1/tx";
import * as _312 from "./data/v1/types";
import * as _313 from "./data/v2/events";
import * as _314 from "./data/v2/state";
import * as _315 from "./data/v2/tx";
import * as _316 from "./data/v2/types";
import * as _317 from "./ecocredit/basket/v1/events";
import * as _318 from "./ecocredit/basket/v1/state";
import * as _319 from "./ecocredit/basket/v1/tx";
import * as _320 from "./ecocredit/basket/v1/types";
import * as _321 from "./ecocredit/marketplace/v1/events";
import * as _322 from "./ecocredit/marketplace/v1/state";
import * as _323 from "./ecocredit/marketplace/v1/tx";
import * as _324 from "./ecocredit/marketplace/v1/types";
import * as _325 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _326 from "./ecocredit/v1/events";
import * as _327 from "./ecocredit/v1/state";
import * as _328 from "./ecocredit/v1/tx";
import * as _329 from "./ecocredit/v1/types";
import * as _330 from "./ecocredit/v1alpha1/events";
import * as _331 from "./ecocredit/v1alpha1/genesis";
import * as _332 from "./ecocredit/v1alpha1/tx";
import * as _333 from "./ecocredit/v1alpha1/types";
import * as _334 from "./intertx/v1/query";
import * as _335 from "./intertx/v1/tx";
import * as _564 from "./data/v1/tx.amino";
import * as _565 from "./data/v2/tx.amino";
import * as _566 from "./ecocredit/basket/v1/tx.amino";
import * as _567 from "./ecocredit/marketplace/v1/tx.amino";
import * as _568 from "./ecocredit/v1/tx.amino";
import * as _569 from "./ecocredit/v1alpha1/tx.amino";
import * as _570 from "./intertx/v1/tx.amino";
import * as _571 from "./data/v1/tx.registry";
import * as _572 from "./data/v2/tx.registry";
import * as _573 from "./ecocredit/basket/v1/tx.registry";
import * as _574 from "./ecocredit/marketplace/v1/tx.registry";
import * as _575 from "./ecocredit/v1/tx.registry";
import * as _576 from "./ecocredit/v1alpha1/tx.registry";
import * as _577 from "./intertx/v1/tx.registry";
import * as _578 from "./intertx/v1/query.rpc.Query";
import * as _579 from "./data/v1/tx.rpc.msg";
import * as _580 from "./data/v2/tx.rpc.msg";
import * as _581 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _582 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _583 from "./ecocredit/v1/tx.rpc.msg";
import * as _584 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _585 from "./intertx/v1/tx.rpc.msg";
import * as _612 from "./rpc.query";
import * as _613 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._309,
      ..._310,
      ..._311,
      ..._312,
      ..._564,
      ..._571,
      ..._579
    };
    export const v2 = {
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._565,
      ..._572,
      ..._580
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._317,
        ..._318,
        ..._319,
        ..._320,
        ..._566,
        ..._573,
        ..._581
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._321,
        ..._322,
        ..._323,
        ..._324,
        ..._567,
        ..._574,
        ..._582
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._325
      };
    }
    export const v1 = {
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._568,
      ..._575,
      ..._583
    };
    export const v1alpha1 = {
      ..._330,
      ..._331,
      ..._332,
      ..._333,
      ..._569,
      ..._576,
      ..._584
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._334,
      ..._335,
      ..._570,
      ..._577,
      ..._578,
      ..._585
    };
  }
  export const ClientFactory = {
    ..._612,
    ..._613
  };
}