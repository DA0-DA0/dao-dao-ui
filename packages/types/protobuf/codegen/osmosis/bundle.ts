import * as _191 from "./accum/v1beta1/accum";
import * as _192 from "./concentratedliquidity/params";
import * as _193 from "./cosmwasmpool/v1beta1/genesis";
import * as _194 from "./cosmwasmpool/v1beta1/gov";
import * as _195 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _196 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _197 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _198 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _199 from "./cosmwasmpool/v1beta1/model/pool";
import * as _200 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _201 from "./cosmwasmpool/v1beta1/model/tx";
import * as _202 from "./cosmwasmpool/v1beta1/params";
import * as _203 from "./cosmwasmpool/v1beta1/query";
import * as _204 from "./cosmwasmpool/v1beta1/tx";
import * as _205 from "./gamm/pool-models/balancer/balancerPool";
import * as _206 from "./gamm/v1beta1/genesis";
import * as _207 from "./gamm/v1beta1/gov";
import * as _208 from "./gamm/v1beta1/query";
import * as _209 from "./gamm/v1beta1/shared";
import * as _210 from "./gamm/v1beta1/tx";
import * as _211 from "./gamm/pool-models/balancer/tx/tx";
import * as _212 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _213 from "./gamm/pool-models/stableswap/tx";
import * as _214 from "./incentives/gauge";
import * as _215 from "./incentives/genesis";
import * as _216 from "./incentives/gov";
import * as _217 from "./incentives/group";
import * as _218 from "./incentives/params";
import * as _219 from "./incentives/query";
import * as _220 from "./incentives/tx";
import * as _221 from "./lockup/genesis";
import * as _222 from "./lockup/lock";
import * as _223 from "./lockup/params";
import * as _224 from "./lockup/query";
import * as _225 from "./lockup/tx";
import * as _226 from "./pool-incentives/v1beta1/genesis";
import * as _227 from "./pool-incentives/v1beta1/gov";
import * as _228 from "./pool-incentives/v1beta1/incentives";
import * as _229 from "./pool-incentives/v1beta1/query";
import * as _230 from "./pool-incentives/v1beta1/shared";
import * as _231 from "./poolmanager/v1beta1/genesis";
import * as _232 from "./poolmanager/v1beta1/gov";
import * as _233 from "./poolmanager/v1beta1/module_route";
import * as _234 from "./poolmanager/v1beta1/query";
import * as _235 from "./poolmanager/v1beta1/swap_route";
import * as _236 from "./poolmanager/v1beta1/tx";
import * as _237 from "./protorev/v1beta1/genesis";
import * as _238 from "./protorev/v1beta1/gov";
import * as _239 from "./protorev/v1beta1/params";
import * as _240 from "./protorev/v1beta1/protorev";
import * as _241 from "./protorev/v1beta1/query";
import * as _242 from "./protorev/v1beta1/tx";
import * as _243 from "./superfluid/genesis";
import * as _244 from "./superfluid/params";
import * as _245 from "./superfluid/query";
import * as _246 from "./superfluid/superfluid";
import * as _247 from "./superfluid/tx";
import * as _248 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _249 from "./tokenfactory/v1beta1/genesis";
import * as _250 from "./tokenfactory/v1beta1/params";
import * as _251 from "./tokenfactory/v1beta1/query";
import * as _252 from "./tokenfactory/v1beta1/tx";
import * as _253 from "./txfees/v1beta1/feetoken";
import * as _254 from "./txfees/v1beta1/genesis";
import * as _255 from "./txfees/v1beta1/gov";
import * as _256 from "./txfees/v1beta1/params";
import * as _257 from "./txfees/v1beta1/query";
import * as _258 from "./txfees/v1beta1/tx";
import * as _259 from "./valset-pref/v1beta1/query";
import * as _260 from "./valset-pref/v1beta1/state";
import * as _261 from "./valset-pref/v1beta1/tx";
import * as _444 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _445 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _446 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _447 from "./gamm/pool-models/stableswap/tx.amino";
import * as _448 from "./gamm/v1beta1/tx.amino";
import * as _449 from "./incentives/tx.amino";
import * as _450 from "./lockup/tx.amino";
import * as _451 from "./poolmanager/v1beta1/tx.amino";
import * as _452 from "./protorev/v1beta1/tx.amino";
import * as _453 from "./superfluid/tx.amino";
import * as _454 from "./tokenfactory/v1beta1/tx.amino";
import * as _455 from "./txfees/v1beta1/tx.amino";
import * as _456 from "./valset-pref/v1beta1/tx.amino";
import * as _457 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _458 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _459 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _460 from "./gamm/pool-models/stableswap/tx.registry";
import * as _461 from "./gamm/v1beta1/tx.registry";
import * as _462 from "./incentives/tx.registry";
import * as _463 from "./lockup/tx.registry";
import * as _464 from "./poolmanager/v1beta1/tx.registry";
import * as _465 from "./protorev/v1beta1/tx.registry";
import * as _466 from "./superfluid/tx.registry";
import * as _467 from "./tokenfactory/v1beta1/tx.registry";
import * as _468 from "./txfees/v1beta1/tx.registry";
import * as _469 from "./valset-pref/v1beta1/tx.registry";
import * as _470 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _471 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _472 from "./gamm/v1beta1/query.rpc.Query";
import * as _473 from "./incentives/query.rpc.Query";
import * as _474 from "./lockup/query.rpc.Query";
import * as _475 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _476 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _477 from "./protorev/v1beta1/query.rpc.Query";
import * as _478 from "./superfluid/query.rpc.Query";
import * as _479 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _480 from "./txfees/v1beta1/query.rpc.Query";
import * as _481 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _482 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _483 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _484 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _485 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _486 from "./gamm/v1beta1/tx.rpc.msg";
import * as _487 from "./incentives/tx.rpc.msg";
import * as _488 from "./lockup/tx.rpc.msg";
import * as _489 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _490 from "./protorev/v1beta1/tx.rpc.msg";
import * as _491 from "./superfluid/tx.rpc.msg";
import * as _492 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _493 from "./txfees/v1beta1/tx.rpc.msg";
import * as _494 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _549 from "./rpc.query";
import * as _550 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._191
    };
  }
  export const concentratedliquidity = {
    ..._192,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._444,
          ..._457,
          ..._482
        }
      }
    },
    v1beta1: {
      ..._445,
      ..._458,
      ..._470,
      ..._483
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._193,
      ..._194,
      ..._195,
      ..._196,
      ..._197,
      ..._198,
      ..._199,
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._471
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._448,
      ..._461,
      ..._472,
      ..._486
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._211,
          ..._446,
          ..._459,
          ..._484
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._212,
          ..._213,
          ..._447,
          ..._460,
          ..._485
        };
      }
    }
  }
  export const incentives = {
    ..._214,
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._219,
    ..._220,
    ..._449,
    ..._462,
    ..._473,
    ..._487
  };
  export const lockup = {
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._225,
    ..._450,
    ..._463,
    ..._474,
    ..._488
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._226,
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._475
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._451,
      ..._464,
      ..._476,
      ..._489
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._452,
      ..._465,
      ..._477,
      ..._490
    };
  }
  export const superfluid = {
    ..._243,
    ..._244,
    ..._245,
    ..._246,
    ..._247,
    ..._453,
    ..._466,
    ..._478,
    ..._491
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._454,
      ..._467,
      ..._479,
      ..._492
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._455,
      ..._468,
      ..._480,
      ..._493
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._259,
      ..._260,
      ..._261,
      ..._456,
      ..._469,
      ..._481,
      ..._494
    };
  }
  export const ClientFactory = {
    ..._549,
    ..._550
  };
}