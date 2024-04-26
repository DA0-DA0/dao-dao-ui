import * as _195 from "./accum/v1beta1/accum";
import * as _196 from "./concentratedliquidity/params";
import * as _197 from "./cosmwasmpool/v1beta1/genesis";
import * as _198 from "./cosmwasmpool/v1beta1/gov";
import * as _199 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _200 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _201 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _202 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _203 from "./cosmwasmpool/v1beta1/model/pool";
import * as _204 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _205 from "./cosmwasmpool/v1beta1/model/tx";
import * as _206 from "./cosmwasmpool/v1beta1/params";
import * as _207 from "./cosmwasmpool/v1beta1/query";
import * as _208 from "./cosmwasmpool/v1beta1/tx";
import * as _209 from "./gamm/pool-models/balancer/balancerPool";
import * as _210 from "./gamm/v1beta1/genesis";
import * as _211 from "./gamm/v1beta1/gov";
import * as _212 from "./gamm/v1beta1/query";
import * as _213 from "./gamm/v1beta1/shared";
import * as _214 from "./gamm/v1beta1/tx";
import * as _215 from "./gamm/pool-models/balancer/tx/tx";
import * as _216 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _217 from "./gamm/pool-models/stableswap/tx";
import * as _218 from "./incentives/gauge";
import * as _219 from "./incentives/genesis";
import * as _220 from "./incentives/gov";
import * as _221 from "./incentives/group";
import * as _222 from "./incentives/params";
import * as _223 from "./incentives/query";
import * as _224 from "./incentives/tx";
import * as _225 from "./lockup/genesis";
import * as _226 from "./lockup/lock";
import * as _227 from "./lockup/params";
import * as _228 from "./lockup/query";
import * as _229 from "./lockup/tx";
import * as _230 from "./pool-incentives/v1beta1/genesis";
import * as _231 from "./pool-incentives/v1beta1/gov";
import * as _232 from "./pool-incentives/v1beta1/incentives";
import * as _233 from "./pool-incentives/v1beta1/query";
import * as _234 from "./pool-incentives/v1beta1/shared";
import * as _235 from "./poolmanager/v1beta1/genesis";
import * as _236 from "./poolmanager/v1beta1/gov";
import * as _237 from "./poolmanager/v1beta1/module_route";
import * as _238 from "./poolmanager/v1beta1/query";
import * as _239 from "./poolmanager/v1beta1/swap_route";
import * as _240 from "./poolmanager/v1beta1/tx";
import * as _241 from "./protorev/v1beta1/genesis";
import * as _242 from "./protorev/v1beta1/gov";
import * as _243 from "./protorev/v1beta1/params";
import * as _244 from "./protorev/v1beta1/protorev";
import * as _245 from "./protorev/v1beta1/query";
import * as _246 from "./protorev/v1beta1/tx";
import * as _247 from "./superfluid/genesis";
import * as _248 from "./superfluid/params";
import * as _249 from "./superfluid/query";
import * as _250 from "./superfluid/superfluid";
import * as _251 from "./superfluid/tx";
import * as _252 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _253 from "./tokenfactory/v1beta1/genesis";
import * as _254 from "./tokenfactory/v1beta1/params";
import * as _255 from "./tokenfactory/v1beta1/query";
import * as _256 from "./tokenfactory/v1beta1/tx";
import * as _257 from "./txfees/v1beta1/feetoken";
import * as _258 from "./txfees/v1beta1/genesis";
import * as _259 from "./txfees/v1beta1/gov";
import * as _260 from "./txfees/v1beta1/params";
import * as _261 from "./txfees/v1beta1/query";
import * as _262 from "./txfees/v1beta1/tx";
import * as _263 from "./valset-pref/v1beta1/query";
import * as _264 from "./valset-pref/v1beta1/state";
import * as _265 from "./valset-pref/v1beta1/tx";
import * as _452 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _453 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _454 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _455 from "./gamm/pool-models/stableswap/tx.amino";
import * as _456 from "./gamm/v1beta1/tx.amino";
import * as _457 from "./incentives/tx.amino";
import * as _458 from "./lockup/tx.amino";
import * as _459 from "./poolmanager/v1beta1/tx.amino";
import * as _460 from "./protorev/v1beta1/tx.amino";
import * as _461 from "./superfluid/tx.amino";
import * as _462 from "./tokenfactory/v1beta1/tx.amino";
import * as _463 from "./txfees/v1beta1/tx.amino";
import * as _464 from "./valset-pref/v1beta1/tx.amino";
import * as _465 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _466 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _467 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _468 from "./gamm/pool-models/stableswap/tx.registry";
import * as _469 from "./gamm/v1beta1/tx.registry";
import * as _470 from "./incentives/tx.registry";
import * as _471 from "./lockup/tx.registry";
import * as _472 from "./poolmanager/v1beta1/tx.registry";
import * as _473 from "./protorev/v1beta1/tx.registry";
import * as _474 from "./superfluid/tx.registry";
import * as _475 from "./tokenfactory/v1beta1/tx.registry";
import * as _476 from "./txfees/v1beta1/tx.registry";
import * as _477 from "./valset-pref/v1beta1/tx.registry";
import * as _478 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _479 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _480 from "./gamm/v1beta1/query.rpc.Query";
import * as _481 from "./incentives/query.rpc.Query";
import * as _482 from "./lockup/query.rpc.Query";
import * as _483 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _484 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _485 from "./protorev/v1beta1/query.rpc.Query";
import * as _486 from "./superfluid/query.rpc.Query";
import * as _487 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _488 from "./txfees/v1beta1/query.rpc.Query";
import * as _489 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _490 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _491 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _492 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _493 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _494 from "./gamm/v1beta1/tx.rpc.msg";
import * as _495 from "./incentives/tx.rpc.msg";
import * as _496 from "./lockup/tx.rpc.msg";
import * as _497 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _498 from "./protorev/v1beta1/tx.rpc.msg";
import * as _499 from "./superfluid/tx.rpc.msg";
import * as _500 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _501 from "./txfees/v1beta1/tx.rpc.msg";
import * as _502 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _557 from "./rpc.query";
import * as _558 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._195
    };
  }
  export const concentratedliquidity = {
    ..._196,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._452,
          ..._465,
          ..._490
        }
      }
    },
    v1beta1: {
      ..._453,
      ..._466,
      ..._478,
      ..._491
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._197,
      ..._198,
      ..._199,
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._479
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._213,
      ..._214,
      ..._456,
      ..._469,
      ..._480,
      ..._494
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._215,
          ..._454,
          ..._467,
          ..._492
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._216,
          ..._217,
          ..._455,
          ..._468,
          ..._493
        };
      }
    }
  }
  export const incentives = {
    ..._218,
    ..._219,
    ..._220,
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._457,
    ..._470,
    ..._481,
    ..._495
  };
  export const lockup = {
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._458,
    ..._471,
    ..._482,
    ..._496
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._230,
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._483
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._459,
      ..._472,
      ..._484,
      ..._497
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._460,
      ..._473,
      ..._485,
      ..._498
    };
  }
  export const superfluid = {
    ..._247,
    ..._248,
    ..._249,
    ..._250,
    ..._251,
    ..._461,
    ..._474,
    ..._486,
    ..._499
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._462,
      ..._475,
      ..._487,
      ..._500
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._257,
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._463,
      ..._476,
      ..._488,
      ..._501
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._263,
      ..._264,
      ..._265,
      ..._464,
      ..._477,
      ..._489,
      ..._502
    };
  }
  export const ClientFactory = {
    ..._557,
    ..._558
  };
}