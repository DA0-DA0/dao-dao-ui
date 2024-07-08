import * as _205 from "./accum/v1beta1/accum";
import * as _206 from "./concentratedliquidity/params";
import * as _207 from "./cosmwasmpool/v1beta1/genesis";
import * as _208 from "./cosmwasmpool/v1beta1/gov";
import * as _209 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _210 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _211 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _212 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _213 from "./cosmwasmpool/v1beta1/model/pool";
import * as _214 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _215 from "./cosmwasmpool/v1beta1/model/tx";
import * as _216 from "./cosmwasmpool/v1beta1/params";
import * as _217 from "./cosmwasmpool/v1beta1/query";
import * as _218 from "./cosmwasmpool/v1beta1/tx";
import * as _219 from "./gamm/pool-models/balancer/balancerPool";
import * as _220 from "./gamm/v1beta1/genesis";
import * as _221 from "./gamm/v1beta1/gov";
import * as _222 from "./gamm/v1beta1/query";
import * as _223 from "./gamm/v1beta1/shared";
import * as _224 from "./gamm/v1beta1/tx";
import * as _225 from "./gamm/pool-models/balancer/tx/tx";
import * as _226 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _227 from "./gamm/pool-models/stableswap/tx";
import * as _228 from "./incentives/gauge";
import * as _229 from "./incentives/genesis";
import * as _230 from "./incentives/gov";
import * as _231 from "./incentives/group";
import * as _232 from "./incentives/params";
import * as _233 from "./incentives/query";
import * as _234 from "./incentives/tx";
import * as _235 from "./lockup/genesis";
import * as _236 from "./lockup/lock";
import * as _237 from "./lockup/params";
import * as _238 from "./lockup/query";
import * as _239 from "./lockup/tx";
import * as _240 from "./pool-incentives/v1beta1/genesis";
import * as _241 from "./pool-incentives/v1beta1/gov";
import * as _242 from "./pool-incentives/v1beta1/incentives";
import * as _243 from "./pool-incentives/v1beta1/query";
import * as _244 from "./pool-incentives/v1beta1/shared";
import * as _245 from "./poolmanager/v1beta1/genesis";
import * as _246 from "./poolmanager/v1beta1/gov";
import * as _247 from "./poolmanager/v1beta1/module_route";
import * as _248 from "./poolmanager/v1beta1/query";
import * as _249 from "./poolmanager/v1beta1/swap_route";
import * as _250 from "./poolmanager/v1beta1/tx";
import * as _251 from "./protorev/v1beta1/genesis";
import * as _252 from "./protorev/v1beta1/gov";
import * as _253 from "./protorev/v1beta1/params";
import * as _254 from "./protorev/v1beta1/protorev";
import * as _255 from "./protorev/v1beta1/query";
import * as _256 from "./protorev/v1beta1/tx";
import * as _257 from "./smartaccount/v1beta1/genesis";
import * as _258 from "./smartaccount/v1beta1/models";
import * as _259 from "./smartaccount/v1beta1/params";
import * as _260 from "./smartaccount/v1beta1/query";
import * as _261 from "./smartaccount/v1beta1/tx";
import * as _262 from "./superfluid/genesis";
import * as _263 from "./superfluid/params";
import * as _264 from "./superfluid/query";
import * as _265 from "./superfluid/superfluid";
import * as _266 from "./superfluid/tx";
import * as _267 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _268 from "./tokenfactory/v1beta1/genesis";
import * as _269 from "./tokenfactory/v1beta1/params";
import * as _270 from "./tokenfactory/v1beta1/query";
import * as _271 from "./tokenfactory/v1beta1/tx";
import * as _272 from "./txfees/v1beta1/feetoken";
import * as _273 from "./txfees/v1beta1/genesis";
import * as _274 from "./txfees/v1beta1/gov";
import * as _275 from "./txfees/v1beta1/params";
import * as _276 from "./txfees/v1beta1/query";
import * as _277 from "./txfees/v1beta1/tx";
import * as _278 from "./valset-pref/v1beta1/query";
import * as _279 from "./valset-pref/v1beta1/state";
import * as _280 from "./valset-pref/v1beta1/tx";
import * as _513 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _514 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _515 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _516 from "./gamm/pool-models/stableswap/tx.amino";
import * as _517 from "./gamm/v1beta1/tx.amino";
import * as _518 from "./incentives/tx.amino";
import * as _519 from "./lockup/tx.amino";
import * as _520 from "./poolmanager/v1beta1/tx.amino";
import * as _521 from "./protorev/v1beta1/tx.amino";
import * as _522 from "./smartaccount/v1beta1/tx.amino";
import * as _523 from "./superfluid/tx.amino";
import * as _524 from "./tokenfactory/v1beta1/tx.amino";
import * as _525 from "./txfees/v1beta1/tx.amino";
import * as _526 from "./valset-pref/v1beta1/tx.amino";
import * as _527 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _528 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _529 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _530 from "./gamm/pool-models/stableswap/tx.registry";
import * as _531 from "./gamm/v1beta1/tx.registry";
import * as _532 from "./incentives/tx.registry";
import * as _533 from "./lockup/tx.registry";
import * as _534 from "./poolmanager/v1beta1/tx.registry";
import * as _535 from "./protorev/v1beta1/tx.registry";
import * as _536 from "./smartaccount/v1beta1/tx.registry";
import * as _537 from "./superfluid/tx.registry";
import * as _538 from "./tokenfactory/v1beta1/tx.registry";
import * as _539 from "./txfees/v1beta1/tx.registry";
import * as _540 from "./valset-pref/v1beta1/tx.registry";
import * as _541 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _542 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _543 from "./gamm/v1beta1/query.rpc.Query";
import * as _544 from "./incentives/query.rpc.Query";
import * as _545 from "./lockup/query.rpc.Query";
import * as _546 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _547 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _548 from "./protorev/v1beta1/query.rpc.Query";
import * as _549 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _550 from "./superfluid/query.rpc.Query";
import * as _551 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _552 from "./txfees/v1beta1/query.rpc.Query";
import * as _553 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _554 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _555 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _556 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _557 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _558 from "./gamm/v1beta1/tx.rpc.msg";
import * as _559 from "./incentives/tx.rpc.msg";
import * as _560 from "./lockup/tx.rpc.msg";
import * as _561 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _562 from "./protorev/v1beta1/tx.rpc.msg";
import * as _563 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _564 from "./superfluid/tx.rpc.msg";
import * as _565 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _566 from "./txfees/v1beta1/tx.rpc.msg";
import * as _567 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _656 from "./rpc.query";
import * as _657 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._205
    };
  }
  export const concentratedliquidity = {
    ..._206,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._513,
          ..._527,
          ..._554
        }
      }
    },
    v1beta1: {
      ..._514,
      ..._528,
      ..._541,
      ..._555
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._542
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._219,
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._517,
      ..._531,
      ..._543,
      ..._558
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._225,
          ..._515,
          ..._529,
          ..._556
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._226,
          ..._227,
          ..._516,
          ..._530,
          ..._557
        };
      }
    }
  }
  export const incentives = {
    ..._228,
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._234,
    ..._518,
    ..._532,
    ..._544,
    ..._559
  };
  export const lockup = {
    ..._235,
    ..._236,
    ..._237,
    ..._238,
    ..._239,
    ..._519,
    ..._533,
    ..._545,
    ..._560
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._546
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._520,
      ..._534,
      ..._547,
      ..._561
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._521,
      ..._535,
      ..._548,
      ..._562
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._257,
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._522,
      ..._536,
      ..._549,
      ..._563
    };
  }
  export const superfluid = {
    ..._262,
    ..._263,
    ..._264,
    ..._265,
    ..._266,
    ..._523,
    ..._537,
    ..._550,
    ..._564
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._524,
      ..._538,
      ..._551,
      ..._565
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._272,
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._525,
      ..._539,
      ..._552,
      ..._566
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._526,
      ..._540,
      ..._553,
      ..._567
    };
  }
  export const ClientFactory = {
    ..._656,
    ..._657
  };
}