import * as _211 from "./accum/v1beta1/accum";
import * as _212 from "./concentratedliquidity/params";
import * as _213 from "./cosmwasmpool/v1beta1/genesis";
import * as _214 from "./cosmwasmpool/v1beta1/gov";
import * as _215 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _216 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _217 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _218 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _219 from "./cosmwasmpool/v1beta1/model/pool";
import * as _220 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _221 from "./cosmwasmpool/v1beta1/model/tx";
import * as _222 from "./cosmwasmpool/v1beta1/params";
import * as _223 from "./cosmwasmpool/v1beta1/query";
import * as _224 from "./cosmwasmpool/v1beta1/tx";
import * as _225 from "./gamm/pool-models/balancer/balancerPool";
import * as _226 from "./gamm/v1beta1/genesis";
import * as _227 from "./gamm/v1beta1/gov";
import * as _228 from "./gamm/v1beta1/query";
import * as _229 from "./gamm/v1beta1/shared";
import * as _230 from "./gamm/v1beta1/tx";
import * as _231 from "./gamm/pool-models/balancer/tx/tx";
import * as _232 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _233 from "./gamm/pool-models/stableswap/tx";
import * as _234 from "./incentives/gauge";
import * as _235 from "./incentives/genesis";
import * as _236 from "./incentives/gov";
import * as _237 from "./incentives/group";
import * as _238 from "./incentives/params";
import * as _239 from "./incentives/query";
import * as _240 from "./incentives/tx";
import * as _241 from "./lockup/genesis";
import * as _242 from "./lockup/lock";
import * as _243 from "./lockup/params";
import * as _244 from "./lockup/query";
import * as _245 from "./lockup/tx";
import * as _246 from "./pool-incentives/v1beta1/genesis";
import * as _247 from "./pool-incentives/v1beta1/gov";
import * as _248 from "./pool-incentives/v1beta1/incentives";
import * as _249 from "./pool-incentives/v1beta1/query";
import * as _250 from "./pool-incentives/v1beta1/shared";
import * as _251 from "./poolmanager/v1beta1/genesis";
import * as _252 from "./poolmanager/v1beta1/gov";
import * as _253 from "./poolmanager/v1beta1/module_route";
import * as _254 from "./poolmanager/v1beta1/query";
import * as _255 from "./poolmanager/v1beta1/swap_route";
import * as _256 from "./poolmanager/v1beta1/tx";
import * as _257 from "./protorev/v1beta1/genesis";
import * as _258 from "./protorev/v1beta1/gov";
import * as _259 from "./protorev/v1beta1/params";
import * as _260 from "./protorev/v1beta1/protorev";
import * as _261 from "./protorev/v1beta1/query";
import * as _262 from "./protorev/v1beta1/tx";
import * as _263 from "./smartaccount/v1beta1/genesis";
import * as _264 from "./smartaccount/v1beta1/models";
import * as _265 from "./smartaccount/v1beta1/params";
import * as _266 from "./smartaccount/v1beta1/query";
import * as _267 from "./smartaccount/v1beta1/tx";
import * as _268 from "./superfluid/genesis";
import * as _269 from "./superfluid/params";
import * as _270 from "./superfluid/query";
import * as _271 from "./superfluid/superfluid";
import * as _272 from "./superfluid/tx";
import * as _273 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _274 from "./tokenfactory/v1beta1/genesis";
import * as _275 from "./tokenfactory/v1beta1/params";
import * as _276 from "./tokenfactory/v1beta1/query";
import * as _277 from "./tokenfactory/v1beta1/tx";
import * as _278 from "./txfees/v1beta1/feetoken";
import * as _279 from "./txfees/v1beta1/genesis";
import * as _280 from "./txfees/v1beta1/gov";
import * as _281 from "./txfees/v1beta1/params";
import * as _282 from "./txfees/v1beta1/query";
import * as _283 from "./txfees/v1beta1/tx";
import * as _284 from "./valset-pref/v1beta1/query";
import * as _285 from "./valset-pref/v1beta1/state";
import * as _286 from "./valset-pref/v1beta1/tx";
import * as _523 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _524 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _525 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _526 from "./gamm/pool-models/stableswap/tx.amino";
import * as _527 from "./gamm/v1beta1/tx.amino";
import * as _528 from "./incentives/tx.amino";
import * as _529 from "./lockup/tx.amino";
import * as _530 from "./poolmanager/v1beta1/tx.amino";
import * as _531 from "./protorev/v1beta1/tx.amino";
import * as _532 from "./smartaccount/v1beta1/tx.amino";
import * as _533 from "./superfluid/tx.amino";
import * as _534 from "./tokenfactory/v1beta1/tx.amino";
import * as _535 from "./txfees/v1beta1/tx.amino";
import * as _536 from "./valset-pref/v1beta1/tx.amino";
import * as _537 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _538 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _539 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _540 from "./gamm/pool-models/stableswap/tx.registry";
import * as _541 from "./gamm/v1beta1/tx.registry";
import * as _542 from "./incentives/tx.registry";
import * as _543 from "./lockup/tx.registry";
import * as _544 from "./poolmanager/v1beta1/tx.registry";
import * as _545 from "./protorev/v1beta1/tx.registry";
import * as _546 from "./smartaccount/v1beta1/tx.registry";
import * as _547 from "./superfluid/tx.registry";
import * as _548 from "./tokenfactory/v1beta1/tx.registry";
import * as _549 from "./txfees/v1beta1/tx.registry";
import * as _550 from "./valset-pref/v1beta1/tx.registry";
import * as _551 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _552 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _553 from "./gamm/v1beta1/query.rpc.Query";
import * as _554 from "./incentives/query.rpc.Query";
import * as _555 from "./lockup/query.rpc.Query";
import * as _556 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _557 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _558 from "./protorev/v1beta1/query.rpc.Query";
import * as _559 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _560 from "./superfluid/query.rpc.Query";
import * as _561 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _562 from "./txfees/v1beta1/query.rpc.Query";
import * as _563 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _564 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _565 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _566 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _567 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _568 from "./gamm/v1beta1/tx.rpc.msg";
import * as _569 from "./incentives/tx.rpc.msg";
import * as _570 from "./lockup/tx.rpc.msg";
import * as _571 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _572 from "./protorev/v1beta1/tx.rpc.msg";
import * as _573 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _574 from "./superfluid/tx.rpc.msg";
import * as _575 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _576 from "./txfees/v1beta1/tx.rpc.msg";
import * as _577 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _666 from "./rpc.query";
import * as _667 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._211
    };
  }
  export const concentratedliquidity = {
    ..._212,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._523,
          ..._537,
          ..._564
        }
      }
    },
    v1beta1: {
      ..._524,
      ..._538,
      ..._551,
      ..._565
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._219,
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._552
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._225,
      ..._226,
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._527,
      ..._541,
      ..._553,
      ..._568
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._231,
          ..._525,
          ..._539,
          ..._566
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._232,
          ..._233,
          ..._526,
          ..._540,
          ..._567
        };
      }
    }
  }
  export const incentives = {
    ..._234,
    ..._235,
    ..._236,
    ..._237,
    ..._238,
    ..._239,
    ..._240,
    ..._528,
    ..._542,
    ..._554,
    ..._569
  };
  export const lockup = {
    ..._241,
    ..._242,
    ..._243,
    ..._244,
    ..._245,
    ..._529,
    ..._543,
    ..._555,
    ..._570
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._556
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._530,
      ..._544,
      ..._557,
      ..._571
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._257,
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._531,
      ..._545,
      ..._558,
      ..._572
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._532,
      ..._546,
      ..._559,
      ..._573
    };
  }
  export const superfluid = {
    ..._268,
    ..._269,
    ..._270,
    ..._271,
    ..._272,
    ..._533,
    ..._547,
    ..._560,
    ..._574
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._534,
      ..._548,
      ..._561,
      ..._575
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._535,
      ..._549,
      ..._562,
      ..._576
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._536,
      ..._550,
      ..._563,
      ..._577
    };
  }
  export const ClientFactory = {
    ..._666,
    ..._667
  };
}