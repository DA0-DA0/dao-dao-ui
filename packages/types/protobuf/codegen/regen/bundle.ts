import * as _308 from "./data/v1/events";
import * as _309 from "./data/v1/state";
import * as _310 from "./data/v1/tx";
import * as _311 from "./data/v1/types";
import * as _312 from "./data/v2/events";
import * as _313 from "./data/v2/state";
import * as _314 from "./data/v2/tx";
import * as _315 from "./data/v2/types";
import * as _316 from "./ecocredit/basket/v1/events";
import * as _317 from "./ecocredit/basket/v1/state";
import * as _318 from "./ecocredit/basket/v1/tx";
import * as _319 from "./ecocredit/basket/v1/types";
import * as _320 from "./ecocredit/marketplace/v1/events";
import * as _321 from "./ecocredit/marketplace/v1/state";
import * as _322 from "./ecocredit/marketplace/v1/tx";
import * as _323 from "./ecocredit/marketplace/v1/types";
import * as _324 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _325 from "./ecocredit/v1/events";
import * as _326 from "./ecocredit/v1/state";
import * as _327 from "./ecocredit/v1/tx";
import * as _328 from "./ecocredit/v1/types";
import * as _329 from "./ecocredit/v1alpha1/events";
import * as _330 from "./ecocredit/v1alpha1/genesis";
import * as _331 from "./ecocredit/v1alpha1/tx";
import * as _332 from "./ecocredit/v1alpha1/types";
import * as _333 from "./intertx/v1/query";
import * as _334 from "./intertx/v1/tx";
import * as _560 from "./data/v1/tx.amino";
import * as _561 from "./data/v2/tx.amino";
import * as _562 from "./ecocredit/basket/v1/tx.amino";
import * as _563 from "./ecocredit/marketplace/v1/tx.amino";
import * as _564 from "./ecocredit/v1/tx.amino";
import * as _565 from "./ecocredit/v1alpha1/tx.amino";
import * as _566 from "./intertx/v1/tx.amino";
import * as _567 from "./data/v1/tx.registry";
import * as _568 from "./data/v2/tx.registry";
import * as _569 from "./ecocredit/basket/v1/tx.registry";
import * as _570 from "./ecocredit/marketplace/v1/tx.registry";
import * as _571 from "./ecocredit/v1/tx.registry";
import * as _572 from "./ecocredit/v1alpha1/tx.registry";
import * as _573 from "./intertx/v1/tx.registry";
import * as _574 from "./intertx/v1/query.rpc.Query";
import * as _575 from "./data/v1/tx.rpc.msg";
import * as _576 from "./data/v2/tx.rpc.msg";
import * as _577 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _578 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _579 from "./ecocredit/v1/tx.rpc.msg";
import * as _580 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _581 from "./intertx/v1/tx.rpc.msg";
import * as _607 from "./rpc.query";
import * as _608 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._560,
      ..._567,
      ..._575
    };
    export const v2 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._561,
      ..._568,
      ..._576
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._316,
        ..._317,
        ..._318,
        ..._319,
        ..._562,
        ..._569,
        ..._577
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._320,
        ..._321,
        ..._322,
        ..._323,
        ..._563,
        ..._570,
        ..._578
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._324
      };
    }
    export const v1 = {
      ..._325,
      ..._326,
      ..._327,
      ..._328,
      ..._564,
      ..._571,
      ..._579
    };
    export const v1alpha1 = {
      ..._329,
      ..._330,
      ..._331,
      ..._332,
      ..._565,
      ..._572,
      ..._580
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._333,
      ..._334,
      ..._566,
      ..._573,
      ..._574,
      ..._581
    };
  }
  export const ClientFactory = {
    ..._607,
    ..._608
  };
}