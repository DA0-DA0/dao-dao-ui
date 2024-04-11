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
import * as _496 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _497 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _498 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _499 from "./gamm/pool-models/stableswap/tx.amino";
import * as _500 from "./gamm/v1beta1/tx.amino";
import * as _501 from "./incentives/tx.amino";
import * as _502 from "./lockup/tx.amino";
import * as _503 from "./poolmanager/v1beta1/tx.amino";
import * as _504 from "./protorev/v1beta1/tx.amino";
import * as _505 from "./smartaccount/v1beta1/tx.amino";
import * as _506 from "./superfluid/tx.amino";
import * as _507 from "./tokenfactory/v1beta1/tx.amino";
import * as _508 from "./txfees/v1beta1/tx.amino";
import * as _509 from "./valset-pref/v1beta1/tx.amino";
import * as _510 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _511 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _512 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _513 from "./gamm/pool-models/stableswap/tx.registry";
import * as _514 from "./gamm/v1beta1/tx.registry";
import * as _515 from "./incentives/tx.registry";
import * as _516 from "./lockup/tx.registry";
import * as _517 from "./poolmanager/v1beta1/tx.registry";
import * as _518 from "./protorev/v1beta1/tx.registry";
import * as _519 from "./smartaccount/v1beta1/tx.registry";
import * as _520 from "./superfluid/tx.registry";
import * as _521 from "./tokenfactory/v1beta1/tx.registry";
import * as _522 from "./txfees/v1beta1/tx.registry";
import * as _523 from "./valset-pref/v1beta1/tx.registry";
import * as _524 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _525 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _526 from "./gamm/v1beta1/query.rpc.Query";
import * as _527 from "./incentives/query.rpc.Query";
import * as _528 from "./lockup/query.rpc.Query";
import * as _529 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _530 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _531 from "./protorev/v1beta1/query.rpc.Query";
import * as _532 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _533 from "./superfluid/query.rpc.Query";
import * as _534 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _535 from "./txfees/v1beta1/query.rpc.Query";
import * as _536 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _537 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _538 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _539 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _540 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _541 from "./gamm/v1beta1/tx.rpc.msg";
import * as _542 from "./incentives/tx.rpc.msg";
import * as _543 from "./lockup/tx.rpc.msg";
import * as _544 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _545 from "./protorev/v1beta1/tx.rpc.msg";
import * as _546 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _547 from "./superfluid/tx.rpc.msg";
import * as _548 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _549 from "./txfees/v1beta1/tx.rpc.msg";
import * as _550 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _635 from "./rpc.query";
import * as _636 from "./rpc.tx";
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
          ..._496,
          ..._510,
          ..._537
        }
      }
    },
    v1beta1: {
      ..._497,
      ..._511,
      ..._524,
      ..._538
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
      ..._525
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
      ..._500,
      ..._514,
      ..._526,
      ..._541
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._216,
          ..._498,
          ..._512,
          ..._539
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._217,
          ..._218,
          ..._499,
          ..._513,
          ..._540
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
    ..._501,
    ..._515,
    ..._527,
    ..._542
  };
  export const lockup = {
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._230,
    ..._502,
    ..._516,
    ..._528,
    ..._543
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._529
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
      ..._503,
      ..._517,
      ..._530,
      ..._544
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
      ..._504,
      ..._518,
      ..._531,
      ..._545
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._505,
      ..._519,
      ..._532,
      ..._546
    };
  }
  export const superfluid = {
    ..._253,
    ..._254,
    ..._255,
    ..._256,
    ..._257,
    ..._506,
    ..._520,
    ..._533,
    ..._547
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._507,
      ..._521,
      ..._534,
      ..._548
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
      ..._508,
      ..._522,
      ..._535,
      ..._549
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._269,
      ..._270,
      ..._271,
      ..._509,
      ..._523,
      ..._536,
      ..._550
    };
  }
  export const ClientFactory = {
    ..._635,
    ..._636
  };
}