import * as _100 from "./accum/v1beta1/accum";
import * as _101 from "./concentrated-liquidity/params";
import * as _102 from "./cosmwasmpool/v1beta1/genesis";
import * as _103 from "./cosmwasmpool/v1beta1/gov";
import * as _104 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _105 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _106 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _107 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _108 from "./cosmwasmpool/v1beta1/model/pool";
import * as _109 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _110 from "./cosmwasmpool/v1beta1/model/tx";
import * as _111 from "./cosmwasmpool/v1beta1/params";
import * as _112 from "./cosmwasmpool/v1beta1/query";
import * as _113 from "./cosmwasmpool/v1beta1/tx";
import * as _114 from "./gamm/pool-models/balancer/balancerPool";
import * as _115 from "./gamm/v1beta1/genesis";
import * as _116 from "./gamm/v1beta1/gov";
import * as _117 from "./gamm/v1beta1/query";
import * as _118 from "./gamm/v1beta1/shared";
import * as _119 from "./gamm/v1beta1/tx";
import * as _120 from "./gamm/pool-models/balancer/tx/tx";
import * as _121 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _122 from "./gamm/pool-models/stableswap/tx";
import * as _123 from "./incentives/gauge";
import * as _124 from "./incentives/genesis";
import * as _125 from "./incentives/params";
import * as _126 from "./incentives/query";
import * as _127 from "./incentives/tx";
import * as _128 from "./lockup/genesis";
import * as _129 from "./lockup/lock";
import * as _130 from "./lockup/params";
import * as _131 from "./lockup/query";
import * as _132 from "./lockup/tx";
import * as _133 from "./pool-incentives/v1beta1/genesis";
import * as _134 from "./pool-incentives/v1beta1/gov";
import * as _135 from "./pool-incentives/v1beta1/incentives";
import * as _136 from "./pool-incentives/v1beta1/query";
import * as _137 from "./pool-incentives/v1beta1/shared";
import * as _138 from "./poolmanager/v1beta1/genesis";
import * as _139 from "./poolmanager/v1beta1/gov";
import * as _140 from "./poolmanager/v1beta1/module_route";
import * as _141 from "./poolmanager/v1beta1/query";
import * as _142 from "./poolmanager/v1beta1/swap_route";
import * as _143 from "./poolmanager/v1beta1/tx";
import * as _144 from "./protorev/v1beta1/genesis";
import * as _145 from "./protorev/v1beta1/gov";
import * as _146 from "./protorev/v1beta1/params";
import * as _147 from "./protorev/v1beta1/protorev";
import * as _148 from "./protorev/v1beta1/query";
import * as _149 from "./protorev/v1beta1/tx";
import * as _150 from "./superfluid/genesis";
import * as _151 from "./superfluid/params";
import * as _152 from "./superfluid/query";
import * as _153 from "./superfluid/superfluid";
import * as _154 from "./superfluid/tx";
import * as _155 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _156 from "./tokenfactory/v1beta1/genesis";
import * as _157 from "./tokenfactory/v1beta1/params";
import * as _158 from "./tokenfactory/v1beta1/query";
import * as _159 from "./tokenfactory/v1beta1/tx";
import * as _160 from "./txfees/v1beta1/feetoken";
import * as _161 from "./txfees/v1beta1/genesis";
import * as _162 from "./txfees/v1beta1/gov";
import * as _163 from "./txfees/v1beta1/query";
import * as _164 from "./valset-pref/v1beta1/query";
import * as _165 from "./valset-pref/v1beta1/state";
import * as _166 from "./valset-pref/v1beta1/tx";
import * as _266 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _267 from "./concentrated-liquidity/tx.amino";
import * as _268 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _269 from "./gamm/pool-models/stableswap/tx.amino";
import * as _270 from "./gamm/v1beta1/tx.amino";
import * as _271 from "./incentives/tx.amino";
import * as _272 from "./lockup/tx.amino";
import * as _273 from "./poolmanager/v1beta1/tx.amino";
import * as _274 from "./protorev/v1beta1/tx.amino";
import * as _275 from "./superfluid/tx.amino";
import * as _276 from "./tokenfactory/v1beta1/tx.amino";
import * as _277 from "./valset-pref/v1beta1/tx.amino";
import * as _278 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _279 from "./concentrated-liquidity/tx.registry";
import * as _280 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _281 from "./gamm/pool-models/stableswap/tx.registry";
import * as _282 from "./gamm/v1beta1/tx.registry";
import * as _283 from "./incentives/tx.registry";
import * as _284 from "./lockup/tx.registry";
import * as _285 from "./poolmanager/v1beta1/tx.registry";
import * as _286 from "./protorev/v1beta1/tx.registry";
import * as _287 from "./superfluid/tx.registry";
import * as _288 from "./tokenfactory/v1beta1/tx.registry";
import * as _289 from "./valset-pref/v1beta1/tx.registry";
import * as _290 from "./concentrated-liquidity/query.rpc.Query";
import * as _291 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _292 from "./gamm/v1beta1/query.rpc.Query";
import * as _293 from "./incentives/query.rpc.Query";
import * as _294 from "./lockup/query.rpc.Query";
import * as _295 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _296 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _297 from "./protorev/v1beta1/query.rpc.Query";
import * as _298 from "./superfluid/query.rpc.Query";
import * as _299 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _300 from "./txfees/v1beta1/query.rpc.Query";
import * as _301 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _302 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _303 from "./concentrated-liquidity/tx.rpc.msg";
import * as _304 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _305 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _306 from "./gamm/v1beta1/tx.rpc.msg";
import * as _307 from "./incentives/tx.rpc.msg";
import * as _308 from "./lockup/tx.rpc.msg";
import * as _309 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _310 from "./protorev/v1beta1/tx.rpc.msg";
import * as _311 from "./superfluid/tx.rpc.msg";
import * as _312 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _313 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _337 from "./rpc.query";
import * as _338 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._100
    };
  }
  export const concentratedliquidity = {
    ..._101,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._266,
          ..._278,
          ..._302
        }
      }
    },
    v1beta1: {
      ..._267,
      ..._279,
      ..._290,
      ..._303
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._109,
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._291
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._114,
      ..._115,
      ..._116,
      ..._117,
      ..._118,
      ..._119,
      ..._270,
      ..._282,
      ..._292,
      ..._306
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._120,
          ..._268,
          ..._280,
          ..._304
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._121,
          ..._122,
          ..._269,
          ..._281,
          ..._305
        };
      }
    }
  }
  export const incentives = {
    ..._123,
    ..._124,
    ..._125,
    ..._126,
    ..._127,
    ..._271,
    ..._283,
    ..._293,
    ..._307
  };
  export const lockup = {
    ..._128,
    ..._129,
    ..._130,
    ..._131,
    ..._132,
    ..._272,
    ..._284,
    ..._294,
    ..._308
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._133,
      ..._134,
      ..._135,
      ..._136,
      ..._137,
      ..._295
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._273,
      ..._285,
      ..._296,
      ..._309
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._144,
      ..._145,
      ..._146,
      ..._147,
      ..._148,
      ..._149,
      ..._274,
      ..._286,
      ..._297,
      ..._310
    };
  }
  export const superfluid = {
    ..._150,
    ..._151,
    ..._152,
    ..._153,
    ..._154,
    ..._275,
    ..._287,
    ..._298,
    ..._311
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._155,
      ..._156,
      ..._157,
      ..._158,
      ..._159,
      ..._276,
      ..._288,
      ..._299,
      ..._312
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._300
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._164,
      ..._165,
      ..._166,
      ..._277,
      ..._289,
      ..._301,
      ..._313
    };
  }
  export const ClientFactory = {
    ..._337,
    ..._338
  };
}