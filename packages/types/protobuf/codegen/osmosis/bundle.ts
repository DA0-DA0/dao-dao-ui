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
import * as _473 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _474 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _475 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _476 from "./gamm/pool-models/stableswap/tx.amino";
import * as _477 from "./gamm/v1beta1/tx.amino";
import * as _478 from "./incentives/tx.amino";
import * as _479 from "./lockup/tx.amino";
import * as _480 from "./poolmanager/v1beta1/tx.amino";
import * as _481 from "./protorev/v1beta1/tx.amino";
import * as _482 from "./superfluid/tx.amino";
import * as _483 from "./tokenfactory/v1beta1/tx.amino";
import * as _484 from "./txfees/v1beta1/tx.amino";
import * as _485 from "./valset-pref/v1beta1/tx.amino";
import * as _486 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _487 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _488 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _489 from "./gamm/pool-models/stableswap/tx.registry";
import * as _490 from "./gamm/v1beta1/tx.registry";
import * as _491 from "./incentives/tx.registry";
import * as _492 from "./lockup/tx.registry";
import * as _493 from "./poolmanager/v1beta1/tx.registry";
import * as _494 from "./protorev/v1beta1/tx.registry";
import * as _495 from "./superfluid/tx.registry";
import * as _496 from "./tokenfactory/v1beta1/tx.registry";
import * as _497 from "./txfees/v1beta1/tx.registry";
import * as _498 from "./valset-pref/v1beta1/tx.registry";
import * as _499 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _500 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _501 from "./gamm/v1beta1/query.rpc.Query";
import * as _502 from "./incentives/query.rpc.Query";
import * as _503 from "./lockup/query.rpc.Query";
import * as _504 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _505 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _506 from "./protorev/v1beta1/query.rpc.Query";
import * as _507 from "./superfluid/query.rpc.Query";
import * as _508 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _509 from "./txfees/v1beta1/query.rpc.Query";
import * as _510 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _511 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _512 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _513 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _514 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _515 from "./gamm/v1beta1/tx.rpc.msg";
import * as _516 from "./incentives/tx.rpc.msg";
import * as _517 from "./lockup/tx.rpc.msg";
import * as _518 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _519 from "./protorev/v1beta1/tx.rpc.msg";
import * as _520 from "./superfluid/tx.rpc.msg";
import * as _521 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _522 from "./txfees/v1beta1/tx.rpc.msg";
import * as _523 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _594 from "./rpc.query";
import * as _595 from "./rpc.tx";
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
          ..._473,
          ..._486,
          ..._511
        }
      }
    },
    v1beta1: {
      ..._474,
      ..._487,
      ..._499,
      ..._512
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
      ..._500
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
      ..._477,
      ..._490,
      ..._501,
      ..._515
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._215,
          ..._475,
          ..._488,
          ..._513
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._216,
          ..._217,
          ..._476,
          ..._489,
          ..._514
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
    ..._478,
    ..._491,
    ..._502,
    ..._516
  };
  export const lockup = {
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._479,
    ..._492,
    ..._503,
    ..._517
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._230,
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._504
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
      ..._480,
      ..._493,
      ..._505,
      ..._518
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
      ..._481,
      ..._494,
      ..._506,
      ..._519
    };
  }
  export const superfluid = {
    ..._247,
    ..._248,
    ..._249,
    ..._250,
    ..._251,
    ..._482,
    ..._495,
    ..._507,
    ..._520
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._483,
      ..._496,
      ..._508,
      ..._521
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
      ..._484,
      ..._497,
      ..._509,
      ..._522
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._263,
      ..._264,
      ..._265,
      ..._485,
      ..._498,
      ..._510,
      ..._523
    };
  }
  export const ClientFactory = {
    ..._594,
    ..._595
  };
}