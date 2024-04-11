import * as _200 from "./accum/v1beta1/accum";
import * as _201 from "./concentratedliquidity/params";
import * as _202 from "./cosmwasmpool/v1beta1/genesis";
import * as _203 from "./cosmwasmpool/v1beta1/gov";
import * as _204 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _205 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _206 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _207 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _208 from "./cosmwasmpool/v1beta1/model/pool";
import * as _209 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _210 from "./cosmwasmpool/v1beta1/model/tx";
import * as _211 from "./cosmwasmpool/v1beta1/params";
import * as _212 from "./cosmwasmpool/v1beta1/query";
import * as _213 from "./cosmwasmpool/v1beta1/tx";
import * as _214 from "./gamm/pool-models/balancer/balancerPool";
import * as _215 from "./gamm/v1beta1/genesis";
import * as _216 from "./gamm/v1beta1/gov";
import * as _217 from "./gamm/v1beta1/query";
import * as _218 from "./gamm/v1beta1/shared";
import * as _219 from "./gamm/v1beta1/tx";
import * as _220 from "./gamm/pool-models/balancer/tx/tx";
import * as _221 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _222 from "./gamm/pool-models/stableswap/tx";
import * as _223 from "./incentives/gauge";
import * as _224 from "./incentives/genesis";
import * as _225 from "./incentives/gov";
import * as _226 from "./incentives/group";
import * as _227 from "./incentives/params";
import * as _228 from "./incentives/query";
import * as _229 from "./incentives/tx";
import * as _230 from "./lockup/genesis";
import * as _231 from "./lockup/lock";
import * as _232 from "./lockup/params";
import * as _233 from "./lockup/query";
import * as _234 from "./lockup/tx";
import * as _235 from "./pool-incentives/v1beta1/genesis";
import * as _236 from "./pool-incentives/v1beta1/gov";
import * as _237 from "./pool-incentives/v1beta1/incentives";
import * as _238 from "./pool-incentives/v1beta1/query";
import * as _239 from "./pool-incentives/v1beta1/shared";
import * as _240 from "./poolmanager/v1beta1/genesis";
import * as _241 from "./poolmanager/v1beta1/gov";
import * as _242 from "./poolmanager/v1beta1/module_route";
import * as _243 from "./poolmanager/v1beta1/query";
import * as _244 from "./poolmanager/v1beta1/swap_route";
import * as _245 from "./poolmanager/v1beta1/tx";
import * as _246 from "./protorev/v1beta1/genesis";
import * as _247 from "./protorev/v1beta1/gov";
import * as _248 from "./protorev/v1beta1/params";
import * as _249 from "./protorev/v1beta1/protorev";
import * as _250 from "./protorev/v1beta1/query";
import * as _251 from "./protorev/v1beta1/tx";
import * as _252 from "./smartaccount/v1beta1/genesis";
import * as _253 from "./smartaccount/v1beta1/models";
import * as _254 from "./smartaccount/v1beta1/params";
import * as _255 from "./smartaccount/v1beta1/query";
import * as _256 from "./smartaccount/v1beta1/tx";
import * as _257 from "./superfluid/genesis";
import * as _258 from "./superfluid/params";
import * as _259 from "./superfluid/query";
import * as _260 from "./superfluid/superfluid";
import * as _261 from "./superfluid/tx";
import * as _262 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _263 from "./tokenfactory/v1beta1/genesis";
import * as _264 from "./tokenfactory/v1beta1/params";
import * as _265 from "./tokenfactory/v1beta1/query";
import * as _266 from "./tokenfactory/v1beta1/tx";
import * as _267 from "./txfees/v1beta1/feetoken";
import * as _268 from "./txfees/v1beta1/genesis";
import * as _269 from "./txfees/v1beta1/gov";
import * as _270 from "./txfees/v1beta1/params";
import * as _271 from "./txfees/v1beta1/query";
import * as _272 from "./txfees/v1beta1/tx";
import * as _273 from "./valset-pref/v1beta1/query";
import * as _274 from "./valset-pref/v1beta1/state";
import * as _275 from "./valset-pref/v1beta1/tx";
import * as _504 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _505 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _506 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _507 from "./gamm/pool-models/stableswap/tx.amino";
import * as _508 from "./gamm/v1beta1/tx.amino";
import * as _509 from "./incentives/tx.amino";
import * as _510 from "./lockup/tx.amino";
import * as _511 from "./poolmanager/v1beta1/tx.amino";
import * as _512 from "./protorev/v1beta1/tx.amino";
import * as _513 from "./smartaccount/v1beta1/tx.amino";
import * as _514 from "./superfluid/tx.amino";
import * as _515 from "./tokenfactory/v1beta1/tx.amino";
import * as _516 from "./txfees/v1beta1/tx.amino";
import * as _517 from "./valset-pref/v1beta1/tx.amino";
import * as _518 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _519 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _520 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _521 from "./gamm/pool-models/stableswap/tx.registry";
import * as _522 from "./gamm/v1beta1/tx.registry";
import * as _523 from "./incentives/tx.registry";
import * as _524 from "./lockup/tx.registry";
import * as _525 from "./poolmanager/v1beta1/tx.registry";
import * as _526 from "./protorev/v1beta1/tx.registry";
import * as _527 from "./smartaccount/v1beta1/tx.registry";
import * as _528 from "./superfluid/tx.registry";
import * as _529 from "./tokenfactory/v1beta1/tx.registry";
import * as _530 from "./txfees/v1beta1/tx.registry";
import * as _531 from "./valset-pref/v1beta1/tx.registry";
import * as _532 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _533 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _534 from "./gamm/v1beta1/query.rpc.Query";
import * as _535 from "./incentives/query.rpc.Query";
import * as _536 from "./lockup/query.rpc.Query";
import * as _537 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _538 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _539 from "./protorev/v1beta1/query.rpc.Query";
import * as _540 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _541 from "./superfluid/query.rpc.Query";
import * as _542 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _543 from "./txfees/v1beta1/query.rpc.Query";
import * as _544 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _545 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _546 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _547 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _548 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _549 from "./gamm/v1beta1/tx.rpc.msg";
import * as _550 from "./incentives/tx.rpc.msg";
import * as _551 from "./lockup/tx.rpc.msg";
import * as _552 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _553 from "./protorev/v1beta1/tx.rpc.msg";
import * as _554 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _555 from "./superfluid/tx.rpc.msg";
import * as _556 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _557 from "./txfees/v1beta1/tx.rpc.msg";
import * as _558 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _645 from "./rpc.query";
import * as _646 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._200
    };
  }
  export const concentratedliquidity = {
    ..._201,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._504,
          ..._518,
          ..._545
        }
      }
    },
    v1beta1: {
      ..._505,
      ..._519,
      ..._532,
      ..._546
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
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
      ..._213,
      ..._533
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._219,
      ..._508,
      ..._522,
      ..._534,
      ..._549
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._220,
          ..._506,
          ..._520,
          ..._547
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._221,
          ..._222,
          ..._507,
          ..._521,
          ..._548
        };
      }
    }
  }
  export const incentives = {
    ..._223,
    ..._224,
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._509,
    ..._523,
    ..._535,
    ..._550
  };
  export const lockup = {
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._234,
    ..._510,
    ..._524,
    ..._536,
    ..._551
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._537
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._511,
      ..._525,
      ..._538,
      ..._552
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._512,
      ..._526,
      ..._539,
      ..._553
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._513,
      ..._527,
      ..._540,
      ..._554
    };
  }
  export const superfluid = {
    ..._257,
    ..._258,
    ..._259,
    ..._260,
    ..._261,
    ..._514,
    ..._528,
    ..._541,
    ..._555
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._515,
      ..._529,
      ..._542,
      ..._556
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._516,
      ..._530,
      ..._543,
      ..._557
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._517,
      ..._531,
      ..._544,
      ..._558
    };
  }
  export const ClientFactory = {
    ..._645,
    ..._646
  };
}