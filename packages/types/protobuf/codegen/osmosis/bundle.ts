import * as _199 from "./accum/v1beta1/accum";
import * as _200 from "./concentratedliquidity/params";
import * as _201 from "./cosmwasmpool/v1beta1/genesis";
import * as _202 from "./cosmwasmpool/v1beta1/gov";
import * as _203 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _204 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _205 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _206 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _207 from "./cosmwasmpool/v1beta1/model/pool";
import * as _208 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _209 from "./cosmwasmpool/v1beta1/model/tx";
import * as _210 from "./cosmwasmpool/v1beta1/params";
import * as _211 from "./cosmwasmpool/v1beta1/query";
import * as _212 from "./cosmwasmpool/v1beta1/tx";
import * as _213 from "./gamm/pool-models/balancer/balancerPool";
import * as _214 from "./gamm/v1beta1/genesis";
import * as _215 from "./gamm/v1beta1/gov";
import * as _216 from "./gamm/v1beta1/query";
import * as _217 from "./gamm/v1beta1/shared";
import * as _218 from "./gamm/v1beta1/tx";
import * as _219 from "./gamm/pool-models/balancer/tx/tx";
import * as _220 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _221 from "./gamm/pool-models/stableswap/tx";
import * as _222 from "./incentives/gauge";
import * as _223 from "./incentives/genesis";
import * as _224 from "./incentives/gov";
import * as _225 from "./incentives/group";
import * as _226 from "./incentives/params";
import * as _227 from "./incentives/query";
import * as _228 from "./incentives/tx";
import * as _229 from "./lockup/genesis";
import * as _230 from "./lockup/lock";
import * as _231 from "./lockup/params";
import * as _232 from "./lockup/query";
import * as _233 from "./lockup/tx";
import * as _234 from "./pool-incentives/v1beta1/genesis";
import * as _235 from "./pool-incentives/v1beta1/gov";
import * as _236 from "./pool-incentives/v1beta1/incentives";
import * as _237 from "./pool-incentives/v1beta1/query";
import * as _238 from "./pool-incentives/v1beta1/shared";
import * as _239 from "./poolmanager/v1beta1/genesis";
import * as _240 from "./poolmanager/v1beta1/gov";
import * as _241 from "./poolmanager/v1beta1/module_route";
import * as _242 from "./poolmanager/v1beta1/query";
import * as _243 from "./poolmanager/v1beta1/swap_route";
import * as _244 from "./poolmanager/v1beta1/tx";
import * as _245 from "./protorev/v1beta1/genesis";
import * as _246 from "./protorev/v1beta1/gov";
import * as _247 from "./protorev/v1beta1/params";
import * as _248 from "./protorev/v1beta1/protorev";
import * as _249 from "./protorev/v1beta1/query";
import * as _250 from "./protorev/v1beta1/tx";
import * as _251 from "./superfluid/genesis";
import * as _252 from "./superfluid/params";
import * as _253 from "./superfluid/query";
import * as _254 from "./superfluid/superfluid";
import * as _255 from "./superfluid/tx";
import * as _256 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _257 from "./tokenfactory/v1beta1/genesis";
import * as _258 from "./tokenfactory/v1beta1/params";
import * as _259 from "./tokenfactory/v1beta1/query";
import * as _260 from "./tokenfactory/v1beta1/tx";
import * as _261 from "./txfees/v1beta1/feetoken";
import * as _262 from "./txfees/v1beta1/genesis";
import * as _263 from "./txfees/v1beta1/gov";
import * as _264 from "./txfees/v1beta1/params";
import * as _265 from "./txfees/v1beta1/query";
import * as _266 from "./txfees/v1beta1/tx";
import * as _267 from "./valset-pref/v1beta1/query";
import * as _268 from "./valset-pref/v1beta1/state";
import * as _269 from "./valset-pref/v1beta1/tx";
import * as _484 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _485 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _486 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _487 from "./gamm/pool-models/stableswap/tx.amino";
import * as _488 from "./gamm/v1beta1/tx.amino";
import * as _489 from "./incentives/tx.amino";
import * as _490 from "./lockup/tx.amino";
import * as _491 from "./poolmanager/v1beta1/tx.amino";
import * as _492 from "./protorev/v1beta1/tx.amino";
import * as _493 from "./superfluid/tx.amino";
import * as _494 from "./tokenfactory/v1beta1/tx.amino";
import * as _495 from "./txfees/v1beta1/tx.amino";
import * as _496 from "./valset-pref/v1beta1/tx.amino";
import * as _497 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _498 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _499 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _500 from "./gamm/pool-models/stableswap/tx.registry";
import * as _501 from "./gamm/v1beta1/tx.registry";
import * as _502 from "./incentives/tx.registry";
import * as _503 from "./lockup/tx.registry";
import * as _504 from "./poolmanager/v1beta1/tx.registry";
import * as _505 from "./protorev/v1beta1/tx.registry";
import * as _506 from "./superfluid/tx.registry";
import * as _507 from "./tokenfactory/v1beta1/tx.registry";
import * as _508 from "./txfees/v1beta1/tx.registry";
import * as _509 from "./valset-pref/v1beta1/tx.registry";
import * as _510 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _511 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _512 from "./gamm/v1beta1/query.rpc.Query";
import * as _513 from "./incentives/query.rpc.Query";
import * as _514 from "./lockup/query.rpc.Query";
import * as _515 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _516 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _517 from "./protorev/v1beta1/query.rpc.Query";
import * as _518 from "./superfluid/query.rpc.Query";
import * as _519 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _520 from "./txfees/v1beta1/query.rpc.Query";
import * as _521 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _522 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _523 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _524 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _525 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _526 from "./gamm/v1beta1/tx.rpc.msg";
import * as _527 from "./incentives/tx.rpc.msg";
import * as _528 from "./lockup/tx.rpc.msg";
import * as _529 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _530 from "./protorev/v1beta1/tx.rpc.msg";
import * as _531 from "./superfluid/tx.rpc.msg";
import * as _532 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _533 from "./txfees/v1beta1/tx.rpc.msg";
import * as _534 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _606 from "./rpc.query";
import * as _607 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._199
    };
  }
  export const concentratedliquidity = {
    ..._200,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._484,
          ..._497,
          ..._522
        }
      }
    },
    v1beta1: {
      ..._485,
      ..._498,
      ..._510,
      ..._523
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._511
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._488,
      ..._501,
      ..._512,
      ..._526
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._219,
          ..._486,
          ..._499,
          ..._524
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._220,
          ..._221,
          ..._487,
          ..._500,
          ..._525
        };
      }
    }
  }
  export const incentives = {
    ..._222,
    ..._223,
    ..._224,
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._489,
    ..._502,
    ..._513,
    ..._527
  };
  export const lockup = {
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._490,
    ..._503,
    ..._514,
    ..._528
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._515
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._491,
      ..._504,
      ..._516,
      ..._529
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._492,
      ..._505,
      ..._517,
      ..._530
    };
  }
  export const superfluid = {
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._255,
    ..._493,
    ..._506,
    ..._518,
    ..._531
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._256,
      ..._257,
      ..._258,
      ..._259,
      ..._260,
      ..._494,
      ..._507,
      ..._519,
      ..._532
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._495,
      ..._508,
      ..._520,
      ..._533
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._267,
      ..._268,
      ..._269,
      ..._496,
      ..._509,
      ..._521,
      ..._534
    };
  }
  export const ClientFactory = {
    ..._606,
    ..._607
  };
}