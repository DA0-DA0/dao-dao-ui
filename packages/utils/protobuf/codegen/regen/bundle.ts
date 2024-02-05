import * as _234 from "./data/v1/events";
import * as _235 from "./data/v1/state";
import * as _236 from "./data/v1/tx";
import * as _237 from "./data/v1/types";
import * as _238 from "./data/v2/events";
import * as _239 from "./data/v2/state";
import * as _240 from "./data/v2/tx";
import * as _241 from "./data/v2/types";
import * as _242 from "./ecocredit/basket/v1/events";
import * as _243 from "./ecocredit/basket/v1/state";
import * as _244 from "./ecocredit/basket/v1/tx";
import * as _245 from "./ecocredit/basket/v1/types";
import * as _246 from "./ecocredit/marketplace/v1/events";
import * as _247 from "./ecocredit/marketplace/v1/state";
import * as _248 from "./ecocredit/marketplace/v1/tx";
import * as _249 from "./ecocredit/marketplace/v1/types";
import * as _250 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _251 from "./ecocredit/v1/events";
import * as _252 from "./ecocredit/v1/state";
import * as _253 from "./ecocredit/v1/tx";
import * as _254 from "./ecocredit/v1/types";
import * as _255 from "./ecocredit/v1alpha1/events";
import * as _256 from "./ecocredit/v1alpha1/genesis";
import * as _257 from "./ecocredit/v1alpha1/tx";
import * as _258 from "./ecocredit/v1alpha1/types";
import * as _259 from "./intertx/v1/query";
import * as _260 from "./intertx/v1/tx";
import * as _438 from "./data/v1/tx.amino";
import * as _439 from "./data/v2/tx.amino";
import * as _440 from "./ecocredit/basket/v1/tx.amino";
import * as _441 from "./ecocredit/marketplace/v1/tx.amino";
import * as _442 from "./ecocredit/v1/tx.amino";
import * as _443 from "./ecocredit/v1alpha1/tx.amino";
import * as _444 from "./intertx/v1/tx.amino";
import * as _445 from "./data/v1/tx.registry";
import * as _446 from "./data/v2/tx.registry";
import * as _447 from "./ecocredit/basket/v1/tx.registry";
import * as _448 from "./ecocredit/marketplace/v1/tx.registry";
import * as _449 from "./ecocredit/v1/tx.registry";
import * as _450 from "./ecocredit/v1alpha1/tx.registry";
import * as _451 from "./intertx/v1/tx.registry";
import * as _452 from "./intertx/v1/query.rpc.Query";
import * as _453 from "./data/v1/tx.rpc.msg";
import * as _454 from "./data/v2/tx.rpc.msg";
import * as _455 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _456 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _457 from "./ecocredit/v1/tx.rpc.msg";
import * as _458 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _459 from "./intertx/v1/tx.rpc.msg";
import * as _477 from "./rpc.query";
import * as _478 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._438,
      ..._445,
      ..._453
    };
    export const v2 = {
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._439,
      ..._446,
      ..._454
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._242,
        ..._243,
        ..._244,
        ..._245,
        ..._440,
        ..._447,
        ..._455
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._246,
        ..._247,
        ..._248,
        ..._249,
        ..._441,
        ..._448,
        ..._456
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._250
      };
    }
    export const v1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._442,
      ..._449,
      ..._457
    };
    export const v1alpha1 = {
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._443,
      ..._450,
      ..._458
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._259,
      ..._260,
      ..._444,
      ..._451,
      ..._452,
      ..._459
    };
  }
  export const ClientFactory = {
    ..._477,
    ..._478
  };
}