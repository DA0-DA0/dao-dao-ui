import * as _305 from "./data/v1/events";
import * as _306 from "./data/v1/state";
import * as _307 from "./data/v1/tx";
import * as _308 from "./data/v1/types";
import * as _309 from "./data/v2/events";
import * as _310 from "./data/v2/state";
import * as _311 from "./data/v2/tx";
import * as _312 from "./data/v2/types";
import * as _313 from "./ecocredit/basket/v1/events";
import * as _314 from "./ecocredit/basket/v1/state";
import * as _315 from "./ecocredit/basket/v1/tx";
import * as _316 from "./ecocredit/basket/v1/types";
import * as _317 from "./ecocredit/marketplace/v1/events";
import * as _318 from "./ecocredit/marketplace/v1/state";
import * as _319 from "./ecocredit/marketplace/v1/tx";
import * as _320 from "./ecocredit/marketplace/v1/types";
import * as _321 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _322 from "./ecocredit/v1/events";
import * as _323 from "./ecocredit/v1/state";
import * as _324 from "./ecocredit/v1/tx";
import * as _325 from "./ecocredit/v1/types";
import * as _326 from "./ecocredit/v1alpha1/events";
import * as _327 from "./ecocredit/v1alpha1/genesis";
import * as _328 from "./ecocredit/v1alpha1/tx";
import * as _329 from "./ecocredit/v1alpha1/types";
import * as _330 from "./intertx/v1/query";
import * as _331 from "./intertx/v1/tx";
import * as _553 from "./data/v1/tx.amino";
import * as _554 from "./data/v2/tx.amino";
import * as _555 from "./ecocredit/basket/v1/tx.amino";
import * as _556 from "./ecocredit/marketplace/v1/tx.amino";
import * as _557 from "./ecocredit/v1/tx.amino";
import * as _558 from "./ecocredit/v1alpha1/tx.amino";
import * as _559 from "./intertx/v1/tx.amino";
import * as _560 from "./data/v1/tx.registry";
import * as _561 from "./data/v2/tx.registry";
import * as _562 from "./ecocredit/basket/v1/tx.registry";
import * as _563 from "./ecocredit/marketplace/v1/tx.registry";
import * as _564 from "./ecocredit/v1/tx.registry";
import * as _565 from "./ecocredit/v1alpha1/tx.registry";
import * as _566 from "./intertx/v1/tx.registry";
import * as _567 from "./intertx/v1/query.rpc.Query";
import * as _568 from "./data/v1/tx.rpc.msg";
import * as _569 from "./data/v2/tx.rpc.msg";
import * as _570 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _571 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _572 from "./ecocredit/v1/tx.rpc.msg";
import * as _573 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _574 from "./intertx/v1/tx.rpc.msg";
import * as _600 from "./rpc.query";
import * as _601 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._305,
      ..._306,
      ..._307,
      ..._308,
      ..._553,
      ..._560,
      ..._568
    };
    export const v2 = {
      ..._309,
      ..._310,
      ..._311,
      ..._312,
      ..._554,
      ..._561,
      ..._569
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._313,
        ..._314,
        ..._315,
        ..._316,
        ..._555,
        ..._562,
        ..._570
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._317,
        ..._318,
        ..._319,
        ..._320,
        ..._556,
        ..._563,
        ..._571
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._321
      };
    }
    export const v1 = {
      ..._322,
      ..._323,
      ..._324,
      ..._325,
      ..._557,
      ..._564,
      ..._572
    };
    export const v1alpha1 = {
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._558,
      ..._565,
      ..._573
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._330,
      ..._331,
      ..._559,
      ..._566,
      ..._567,
      ..._574
    };
  }
  export const ClientFactory = {
    ..._600,
    ..._601
  };
}