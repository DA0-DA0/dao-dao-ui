import * as _94 from "./accum/v1beta1/accum";
import * as _95 from "./concentrated-liquidity/params";
import * as _96 from "./cosmwasmpool/v1beta1/genesis";
import * as _97 from "./cosmwasmpool/v1beta1/gov";
import * as _98 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _99 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _100 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _101 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _102 from "./cosmwasmpool/v1beta1/model/pool";
import * as _103 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _104 from "./cosmwasmpool/v1beta1/model/tx";
import * as _105 from "./cosmwasmpool/v1beta1/params";
import * as _106 from "./cosmwasmpool/v1beta1/query";
import * as _107 from "./cosmwasmpool/v1beta1/tx";
import * as _108 from "./gamm/pool-models/balancer/balancerPool";
import * as _109 from "./gamm/v1beta1/genesis";
import * as _110 from "./gamm/v1beta1/gov";
import * as _111 from "./gamm/v1beta1/query";
import * as _112 from "./gamm/v1beta1/shared";
import * as _113 from "./gamm/v1beta1/tx";
import * as _114 from "./gamm/pool-models/balancer/tx/tx";
import * as _115 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _116 from "./gamm/pool-models/stableswap/tx";
import * as _117 from "./incentives/gauge";
import * as _118 from "./incentives/genesis";
import * as _119 from "./incentives/params";
import * as _120 from "./incentives/query";
import * as _121 from "./incentives/tx";
import * as _122 from "./lockup/genesis";
import * as _123 from "./lockup/lock";
import * as _124 from "./lockup/params";
import * as _125 from "./lockup/query";
import * as _126 from "./lockup/tx";
import * as _127 from "./pool-incentives/v1beta1/genesis";
import * as _128 from "./pool-incentives/v1beta1/gov";
import * as _129 from "./pool-incentives/v1beta1/incentives";
import * as _130 from "./pool-incentives/v1beta1/query";
import * as _131 from "./pool-incentives/v1beta1/shared";
import * as _132 from "./poolmanager/v1beta1/genesis";
import * as _133 from "./poolmanager/v1beta1/gov";
import * as _134 from "./poolmanager/v1beta1/module_route";
import * as _135 from "./poolmanager/v1beta1/query";
import * as _136 from "./poolmanager/v1beta1/swap_route";
import * as _137 from "./poolmanager/v1beta1/tx";
import * as _138 from "./protorev/v1beta1/genesis";
import * as _139 from "./protorev/v1beta1/gov";
import * as _140 from "./protorev/v1beta1/params";
import * as _141 from "./protorev/v1beta1/protorev";
import * as _142 from "./protorev/v1beta1/query";
import * as _143 from "./protorev/v1beta1/tx";
import * as _144 from "./superfluid/genesis";
import * as _145 from "./superfluid/params";
import * as _146 from "./superfluid/query";
import * as _147 from "./superfluid/superfluid";
import * as _148 from "./superfluid/tx";
import * as _149 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _150 from "./tokenfactory/v1beta1/genesis";
import * as _151 from "./tokenfactory/v1beta1/params";
import * as _152 from "./tokenfactory/v1beta1/query";
import * as _153 from "./tokenfactory/v1beta1/tx";
import * as _154 from "./txfees/v1beta1/feetoken";
import * as _155 from "./txfees/v1beta1/genesis";
import * as _156 from "./txfees/v1beta1/gov";
import * as _157 from "./txfees/v1beta1/query";
import * as _158 from "./valset-pref/v1beta1/query";
import * as _159 from "./valset-pref/v1beta1/state";
import * as _160 from "./valset-pref/v1beta1/tx";
import * as _256 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _257 from "./concentrated-liquidity/tx.amino";
import * as _258 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _259 from "./gamm/pool-models/stableswap/tx.amino";
import * as _260 from "./gamm/v1beta1/tx.amino";
import * as _261 from "./incentives/tx.amino";
import * as _262 from "./lockup/tx.amino";
import * as _263 from "./poolmanager/v1beta1/tx.amino";
import * as _264 from "./protorev/v1beta1/tx.amino";
import * as _265 from "./superfluid/tx.amino";
import * as _266 from "./tokenfactory/v1beta1/tx.amino";
import * as _267 from "./valset-pref/v1beta1/tx.amino";
import * as _268 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _269 from "./concentrated-liquidity/tx.registry";
import * as _270 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _271 from "./gamm/pool-models/stableswap/tx.registry";
import * as _272 from "./gamm/v1beta1/tx.registry";
import * as _273 from "./incentives/tx.registry";
import * as _274 from "./lockup/tx.registry";
import * as _275 from "./poolmanager/v1beta1/tx.registry";
import * as _276 from "./protorev/v1beta1/tx.registry";
import * as _277 from "./superfluid/tx.registry";
import * as _278 from "./tokenfactory/v1beta1/tx.registry";
import * as _279 from "./valset-pref/v1beta1/tx.registry";
import * as _280 from "./concentrated-liquidity/query.rpc.Query";
import * as _281 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _282 from "./gamm/v1beta1/query.rpc.Query";
import * as _283 from "./incentives/query.rpc.Query";
import * as _284 from "./lockup/query.rpc.Query";
import * as _285 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _286 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _287 from "./protorev/v1beta1/query.rpc.Query";
import * as _288 from "./superfluid/query.rpc.Query";
import * as _289 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _290 from "./txfees/v1beta1/query.rpc.Query";
import * as _291 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _292 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _293 from "./concentrated-liquidity/tx.rpc.msg";
import * as _294 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _295 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _296 from "./gamm/v1beta1/tx.rpc.msg";
import * as _297 from "./incentives/tx.rpc.msg";
import * as _298 from "./lockup/tx.rpc.msg";
import * as _299 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _300 from "./protorev/v1beta1/tx.rpc.msg";
import * as _301 from "./superfluid/tx.rpc.msg";
import * as _302 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _303 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _327 from "./rpc.query";
import * as _328 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._94
    };
  }
  export const concentratedliquidity = {
    ..._95,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._256,
          ..._268,
          ..._292
        }
      }
    },
    v1beta1: {
      ..._257,
      ..._269,
      ..._280,
      ..._293
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._281
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._108,
      ..._109,
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._260,
      ..._272,
      ..._282,
      ..._296
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._114,
          ..._258,
          ..._270,
          ..._294
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._115,
          ..._116,
          ..._259,
          ..._271,
          ..._295
        };
      }
    }
  }
  export const incentives = {
    ..._117,
    ..._118,
    ..._119,
    ..._120,
    ..._121,
    ..._261,
    ..._273,
    ..._283,
    ..._297
  };
  export const lockup = {
    ..._122,
    ..._123,
    ..._124,
    ..._125,
    ..._126,
    ..._262,
    ..._274,
    ..._284,
    ..._298
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._127,
      ..._128,
      ..._129,
      ..._130,
      ..._131,
      ..._285
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._136,
      ..._137,
      ..._263,
      ..._275,
      ..._286,
      ..._299
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._264,
      ..._276,
      ..._287,
      ..._300
    };
  }
  export const superfluid = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._265,
    ..._277,
    ..._288,
    ..._301
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._149,
      ..._150,
      ..._151,
      ..._152,
      ..._153,
      ..._266,
      ..._278,
      ..._289,
      ..._302
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._290
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._158,
      ..._159,
      ..._160,
      ..._267,
      ..._279,
      ..._291,
      ..._303
    };
  }
  export const ClientFactory = {
    ..._327,
    ..._328
  };
}