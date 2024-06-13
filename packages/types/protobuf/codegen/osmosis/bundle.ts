import * as _196 from "./accum/v1beta1/accum";
import * as _197 from "./concentratedliquidity/params";
import * as _198 from "./cosmwasmpool/v1beta1/genesis";
import * as _199 from "./cosmwasmpool/v1beta1/gov";
import * as _200 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _201 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _202 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _203 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _204 from "./cosmwasmpool/v1beta1/model/pool";
import * as _205 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _206 from "./cosmwasmpool/v1beta1/model/tx";
import * as _207 from "./cosmwasmpool/v1beta1/params";
import * as _208 from "./cosmwasmpool/v1beta1/query";
import * as _209 from "./cosmwasmpool/v1beta1/tx";
import * as _210 from "./gamm/pool-models/balancer/balancerPool";
import * as _211 from "./gamm/v1beta1/genesis";
import * as _212 from "./gamm/v1beta1/gov";
import * as _213 from "./gamm/v1beta1/query";
import * as _214 from "./gamm/v1beta1/shared";
import * as _215 from "./gamm/v1beta1/tx";
import * as _216 from "./gamm/pool-models/balancer/tx/tx";
import * as _217 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _218 from "./gamm/pool-models/stableswap/tx";
import * as _219 from "./incentives/gauge";
import * as _220 from "./incentives/genesis";
import * as _221 from "./incentives/gov";
import * as _222 from "./incentives/group";
import * as _223 from "./incentives/params";
import * as _224 from "./incentives/query";
import * as _225 from "./incentives/tx";
import * as _226 from "./lockup/genesis";
import * as _227 from "./lockup/lock";
import * as _228 from "./lockup/params";
import * as _229 from "./lockup/query";
import * as _230 from "./lockup/tx";
import * as _231 from "./pool-incentives/v1beta1/genesis";
import * as _232 from "./pool-incentives/v1beta1/gov";
import * as _233 from "./pool-incentives/v1beta1/incentives";
import * as _234 from "./pool-incentives/v1beta1/query";
import * as _235 from "./pool-incentives/v1beta1/shared";
import * as _236 from "./poolmanager/v1beta1/genesis";
import * as _237 from "./poolmanager/v1beta1/gov";
import * as _238 from "./poolmanager/v1beta1/module_route";
import * as _239 from "./poolmanager/v1beta1/query";
import * as _240 from "./poolmanager/v1beta1/swap_route";
import * as _241 from "./poolmanager/v1beta1/tx";
import * as _242 from "./protorev/v1beta1/genesis";
import * as _243 from "./protorev/v1beta1/gov";
import * as _244 from "./protorev/v1beta1/params";
import * as _245 from "./protorev/v1beta1/protorev";
import * as _246 from "./protorev/v1beta1/query";
import * as _247 from "./protorev/v1beta1/tx";
import * as _248 from "./smartaccount/v1beta1/genesis";
import * as _249 from "./smartaccount/v1beta1/models";
import * as _250 from "./smartaccount/v1beta1/params";
import * as _251 from "./smartaccount/v1beta1/query";
import * as _252 from "./smartaccount/v1beta1/tx";
import * as _253 from "./superfluid/genesis";
import * as _254 from "./superfluid/params";
import * as _255 from "./superfluid/query";
import * as _256 from "./superfluid/superfluid";
import * as _257 from "./superfluid/tx";
import * as _258 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _259 from "./tokenfactory/v1beta1/genesis";
import * as _260 from "./tokenfactory/v1beta1/params";
import * as _261 from "./tokenfactory/v1beta1/query";
import * as _262 from "./tokenfactory/v1beta1/tx";
import * as _263 from "./txfees/v1beta1/feetoken";
import * as _264 from "./txfees/v1beta1/genesis";
import * as _265 from "./txfees/v1beta1/gov";
import * as _266 from "./txfees/v1beta1/params";
import * as _267 from "./txfees/v1beta1/query";
import * as _268 from "./txfees/v1beta1/tx";
import * as _269 from "./valset-pref/v1beta1/query";
import * as _270 from "./valset-pref/v1beta1/state";
import * as _271 from "./valset-pref/v1beta1/tx";
import * as _482 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _483 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _484 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _485 from "./gamm/pool-models/stableswap/tx.amino";
import * as _486 from "./gamm/v1beta1/tx.amino";
import * as _487 from "./incentives/tx.amino";
import * as _488 from "./lockup/tx.amino";
import * as _489 from "./poolmanager/v1beta1/tx.amino";
import * as _490 from "./protorev/v1beta1/tx.amino";
import * as _491 from "./smartaccount/v1beta1/tx.amino";
import * as _492 from "./superfluid/tx.amino";
import * as _493 from "./tokenfactory/v1beta1/tx.amino";
import * as _494 from "./txfees/v1beta1/tx.amino";
import * as _495 from "./valset-pref/v1beta1/tx.amino";
import * as _496 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _497 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _498 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _499 from "./gamm/pool-models/stableswap/tx.registry";
import * as _500 from "./gamm/v1beta1/tx.registry";
import * as _501 from "./incentives/tx.registry";
import * as _502 from "./lockup/tx.registry";
import * as _503 from "./poolmanager/v1beta1/tx.registry";
import * as _504 from "./protorev/v1beta1/tx.registry";
import * as _505 from "./smartaccount/v1beta1/tx.registry";
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
import * as _518 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _519 from "./superfluid/query.rpc.Query";
import * as _520 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _521 from "./txfees/v1beta1/query.rpc.Query";
import * as _522 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _523 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _524 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _525 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _526 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _527 from "./gamm/v1beta1/tx.rpc.msg";
import * as _528 from "./incentives/tx.rpc.msg";
import * as _529 from "./lockup/tx.rpc.msg";
import * as _530 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _531 from "./protorev/v1beta1/tx.rpc.msg";
import * as _532 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _533 from "./superfluid/tx.rpc.msg";
import * as _534 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _535 from "./txfees/v1beta1/tx.rpc.msg";
import * as _536 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _608 from "./rpc.query";
import * as _609 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._196
    };
  }
  export const concentratedliquidity = {
    ..._197,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._482,
          ..._496,
          ..._523
        }
      }
    },
    v1beta1: {
      ..._483,
      ..._497,
      ..._510,
      ..._524
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
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
      ..._209,
      ..._511
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._210,
      ..._211,
      ..._212,
      ..._213,
      ..._214,
      ..._215,
      ..._486,
      ..._500,
      ..._512,
      ..._527
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._216,
          ..._484,
          ..._498,
          ..._525
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._217,
          ..._218,
          ..._485,
          ..._499,
          ..._526
        };
      }
    }
  }
  export const incentives = {
    ..._219,
    ..._220,
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._225,
    ..._487,
    ..._501,
    ..._513,
    ..._528
  };
  export const lockup = {
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._230,
    ..._488,
    ..._502,
    ..._514,
    ..._529
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._515
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._489,
      ..._503,
      ..._516,
      ..._530
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._490,
      ..._504,
      ..._517,
      ..._531
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._491,
      ..._505,
      ..._518,
      ..._532
    };
  }
  export const superfluid = {
    ..._253,
    ..._254,
    ..._255,
    ..._256,
    ..._257,
    ..._492,
    ..._506,
    ..._519,
    ..._533
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._493,
      ..._507,
      ..._520,
      ..._534
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._494,
      ..._508,
      ..._521,
      ..._535
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._269,
      ..._270,
      ..._271,
      ..._495,
      ..._509,
      ..._522,
      ..._536
    };
  }
  export const ClientFactory = {
    ..._608,
    ..._609
  };
}