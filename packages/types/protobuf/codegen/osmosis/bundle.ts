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
import * as _251 from "./smartaccount/v1beta1/genesis";
import * as _252 from "./smartaccount/v1beta1/models";
import * as _253 from "./smartaccount/v1beta1/params";
import * as _254 from "./smartaccount/v1beta1/query";
import * as _255 from "./smartaccount/v1beta1/tx";
import * as _256 from "./superfluid/genesis";
import * as _257 from "./superfluid/params";
import * as _258 from "./superfluid/query";
import * as _259 from "./superfluid/superfluid";
import * as _260 from "./superfluid/tx";
import * as _261 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _262 from "./tokenfactory/v1beta1/genesis";
import * as _263 from "./tokenfactory/v1beta1/params";
import * as _264 from "./tokenfactory/v1beta1/query";
import * as _265 from "./tokenfactory/v1beta1/tx";
import * as _266 from "./txfees/v1beta1/feetoken";
import * as _267 from "./txfees/v1beta1/genesis";
import * as _268 from "./txfees/v1beta1/gov";
import * as _269 from "./txfees/v1beta1/params";
import * as _270 from "./txfees/v1beta1/query";
import * as _271 from "./txfees/v1beta1/tx";
import * as _272 from "./valset-pref/v1beta1/query";
import * as _273 from "./valset-pref/v1beta1/state";
import * as _274 from "./valset-pref/v1beta1/tx";
import * as _489 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _490 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _491 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _492 from "./gamm/pool-models/stableswap/tx.amino";
import * as _493 from "./gamm/v1beta1/tx.amino";
import * as _494 from "./incentives/tx.amino";
import * as _495 from "./lockup/tx.amino";
import * as _496 from "./poolmanager/v1beta1/tx.amino";
import * as _497 from "./protorev/v1beta1/tx.amino";
import * as _498 from "./smartaccount/v1beta1/tx.amino";
import * as _499 from "./superfluid/tx.amino";
import * as _500 from "./tokenfactory/v1beta1/tx.amino";
import * as _501 from "./txfees/v1beta1/tx.amino";
import * as _502 from "./valset-pref/v1beta1/tx.amino";
import * as _503 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _504 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _505 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _506 from "./gamm/pool-models/stableswap/tx.registry";
import * as _507 from "./gamm/v1beta1/tx.registry";
import * as _508 from "./incentives/tx.registry";
import * as _509 from "./lockup/tx.registry";
import * as _510 from "./poolmanager/v1beta1/tx.registry";
import * as _511 from "./protorev/v1beta1/tx.registry";
import * as _512 from "./smartaccount/v1beta1/tx.registry";
import * as _513 from "./superfluid/tx.registry";
import * as _514 from "./tokenfactory/v1beta1/tx.registry";
import * as _515 from "./txfees/v1beta1/tx.registry";
import * as _516 from "./valset-pref/v1beta1/tx.registry";
import * as _517 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _518 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _519 from "./gamm/v1beta1/query.rpc.Query";
import * as _520 from "./incentives/query.rpc.Query";
import * as _521 from "./lockup/query.rpc.Query";
import * as _522 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _523 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _524 from "./protorev/v1beta1/query.rpc.Query";
import * as _525 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _526 from "./superfluid/query.rpc.Query";
import * as _527 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _528 from "./txfees/v1beta1/query.rpc.Query";
import * as _529 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _530 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _531 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _532 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _533 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _534 from "./gamm/v1beta1/tx.rpc.msg";
import * as _535 from "./incentives/tx.rpc.msg";
import * as _536 from "./lockup/tx.rpc.msg";
import * as _537 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _538 from "./protorev/v1beta1/tx.rpc.msg";
import * as _539 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _540 from "./superfluid/tx.rpc.msg";
import * as _541 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _542 from "./txfees/v1beta1/tx.rpc.msg";
import * as _543 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _615 from "./rpc.query";
import * as _616 from "./rpc.tx";
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
          ..._489,
          ..._503,
          ..._530
        }
      }
    },
    v1beta1: {
      ..._490,
      ..._504,
      ..._517,
      ..._531
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
      ..._518
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
      ..._493,
      ..._507,
      ..._519,
      ..._534
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._219,
          ..._491,
          ..._505,
          ..._532
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._220,
          ..._221,
          ..._492,
          ..._506,
          ..._533
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
    ..._494,
    ..._508,
    ..._520,
    ..._535
  };
  export const lockup = {
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._495,
    ..._509,
    ..._521,
    ..._536
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._522
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
      ..._496,
      ..._510,
      ..._523,
      ..._537
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
      ..._497,
      ..._511,
      ..._524,
      ..._538
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._498,
      ..._512,
      ..._525,
      ..._539
    };
  }
  export const superfluid = {
    ..._256,
    ..._257,
    ..._258,
    ..._259,
    ..._260,
    ..._499,
    ..._513,
    ..._526,
    ..._540
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._500,
      ..._514,
      ..._527,
      ..._541
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._501,
      ..._515,
      ..._528,
      ..._542
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._272,
      ..._273,
      ..._274,
      ..._502,
      ..._516,
      ..._529,
      ..._543
    };
  }
  export const ClientFactory = {
    ..._615,
    ..._616
  };
}