import * as _103 from "./accum/v1beta1/accum";
import * as _104 from "./concentrated-liquidity/params";
import * as _105 from "./cosmwasmpool/v1beta1/genesis";
import * as _106 from "./cosmwasmpool/v1beta1/gov";
import * as _107 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _108 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _109 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _110 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _111 from "./cosmwasmpool/v1beta1/model/pool";
import * as _112 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _113 from "./cosmwasmpool/v1beta1/model/tx";
import * as _114 from "./cosmwasmpool/v1beta1/params";
import * as _115 from "./cosmwasmpool/v1beta1/query";
import * as _116 from "./cosmwasmpool/v1beta1/tx";
import * as _117 from "./gamm/pool-models/balancer/balancerPool";
import * as _118 from "./gamm/v1beta1/genesis";
import * as _119 from "./gamm/v1beta1/gov";
import * as _120 from "./gamm/v1beta1/query";
import * as _121 from "./gamm/v1beta1/shared";
import * as _122 from "./gamm/v1beta1/tx";
import * as _123 from "./gamm/pool-models/balancer/tx/tx";
import * as _124 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _125 from "./gamm/pool-models/stableswap/tx";
import * as _126 from "./incentives/gauge";
import * as _127 from "./incentives/genesis";
import * as _128 from "./incentives/params";
import * as _129 from "./incentives/query";
import * as _130 from "./incentives/tx";
import * as _131 from "./lockup/genesis";
import * as _132 from "./lockup/lock";
import * as _133 from "./lockup/params";
import * as _134 from "./lockup/query";
import * as _135 from "./lockup/tx";
import * as _136 from "./pool-incentives/v1beta1/genesis";
import * as _137 from "./pool-incentives/v1beta1/gov";
import * as _138 from "./pool-incentives/v1beta1/incentives";
import * as _139 from "./pool-incentives/v1beta1/query";
import * as _140 from "./pool-incentives/v1beta1/shared";
import * as _141 from "./poolmanager/v1beta1/genesis";
import * as _142 from "./poolmanager/v1beta1/gov";
import * as _143 from "./poolmanager/v1beta1/module_route";
import * as _144 from "./poolmanager/v1beta1/query";
import * as _145 from "./poolmanager/v1beta1/swap_route";
import * as _146 from "./poolmanager/v1beta1/tx";
import * as _147 from "./protorev/v1beta1/genesis";
import * as _148 from "./protorev/v1beta1/gov";
import * as _149 from "./protorev/v1beta1/params";
import * as _150 from "./protorev/v1beta1/protorev";
import * as _151 from "./protorev/v1beta1/query";
import * as _152 from "./protorev/v1beta1/tx";
import * as _153 from "./superfluid/genesis";
import * as _154 from "./superfluid/params";
import * as _155 from "./superfluid/query";
import * as _156 from "./superfluid/superfluid";
import * as _157 from "./superfluid/tx";
import * as _158 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _159 from "./tokenfactory/v1beta1/genesis";
import * as _160 from "./tokenfactory/v1beta1/params";
import * as _161 from "./tokenfactory/v1beta1/query";
import * as _162 from "./tokenfactory/v1beta1/tx";
import * as _163 from "./txfees/v1beta1/feetoken";
import * as _164 from "./txfees/v1beta1/genesis";
import * as _165 from "./txfees/v1beta1/gov";
import * as _166 from "./txfees/v1beta1/query";
import * as _167 from "./valset-pref/v1beta1/query";
import * as _168 from "./valset-pref/v1beta1/state";
import * as _169 from "./valset-pref/v1beta1/tx";
import * as _273 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _274 from "./concentrated-liquidity/tx.amino";
import * as _275 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _276 from "./gamm/pool-models/stableswap/tx.amino";
import * as _277 from "./gamm/v1beta1/tx.amino";
import * as _278 from "./incentives/tx.amino";
import * as _279 from "./lockup/tx.amino";
import * as _280 from "./poolmanager/v1beta1/tx.amino";
import * as _281 from "./protorev/v1beta1/tx.amino";
import * as _282 from "./superfluid/tx.amino";
import * as _283 from "./tokenfactory/v1beta1/tx.amino";
import * as _284 from "./valset-pref/v1beta1/tx.amino";
import * as _285 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _286 from "./concentrated-liquidity/tx.registry";
import * as _287 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _288 from "./gamm/pool-models/stableswap/tx.registry";
import * as _289 from "./gamm/v1beta1/tx.registry";
import * as _290 from "./incentives/tx.registry";
import * as _291 from "./lockup/tx.registry";
import * as _292 from "./poolmanager/v1beta1/tx.registry";
import * as _293 from "./protorev/v1beta1/tx.registry";
import * as _294 from "./superfluid/tx.registry";
import * as _295 from "./tokenfactory/v1beta1/tx.registry";
import * as _296 from "./valset-pref/v1beta1/tx.registry";
import * as _297 from "./concentrated-liquidity/query.rpc.Query";
import * as _298 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _299 from "./gamm/v1beta1/query.rpc.Query";
import * as _300 from "./incentives/query.rpc.Query";
import * as _301 from "./lockup/query.rpc.Query";
import * as _302 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _303 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _304 from "./protorev/v1beta1/query.rpc.Query";
import * as _305 from "./superfluid/query.rpc.Query";
import * as _306 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _307 from "./txfees/v1beta1/query.rpc.Query";
import * as _308 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _309 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _310 from "./concentrated-liquidity/tx.rpc.msg";
import * as _311 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _312 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _313 from "./gamm/v1beta1/tx.rpc.msg";
import * as _314 from "./incentives/tx.rpc.msg";
import * as _315 from "./lockup/tx.rpc.msg";
import * as _316 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _317 from "./protorev/v1beta1/tx.rpc.msg";
import * as _318 from "./superfluid/tx.rpc.msg";
import * as _319 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _320 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _344 from "./rpc.query";
import * as _345 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._103
    };
  }
  export const concentratedliquidity = {
    ..._104,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._273,
          ..._285,
          ..._309
        }
      }
    },
    v1beta1: {
      ..._274,
      ..._286,
      ..._297,
      ..._310
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._109,
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._116,
      ..._298
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._117,
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._277,
      ..._289,
      ..._299,
      ..._313
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._123,
          ..._275,
          ..._287,
          ..._311
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._124,
          ..._125,
          ..._276,
          ..._288,
          ..._312
        };
      }
    }
  }
  export const incentives = {
    ..._126,
    ..._127,
    ..._128,
    ..._129,
    ..._130,
    ..._278,
    ..._290,
    ..._300,
    ..._314
  };
  export const lockup = {
    ..._131,
    ..._132,
    ..._133,
    ..._134,
    ..._135,
    ..._279,
    ..._291,
    ..._301,
    ..._315
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._302
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._141,
      ..._142,
      ..._143,
      ..._144,
      ..._145,
      ..._146,
      ..._280,
      ..._292,
      ..._303,
      ..._316
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._147,
      ..._148,
      ..._149,
      ..._150,
      ..._151,
      ..._152,
      ..._281,
      ..._293,
      ..._304,
      ..._317
    };
  }
  export const superfluid = {
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._157,
    ..._282,
    ..._294,
    ..._305,
    ..._318
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._158,
      ..._159,
      ..._160,
      ..._161,
      ..._162,
      ..._283,
      ..._295,
      ..._306,
      ..._319
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._163,
      ..._164,
      ..._165,
      ..._166,
      ..._307
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._167,
      ..._168,
      ..._169,
      ..._284,
      ..._296,
      ..._308,
      ..._320
    };
  }
  export const ClientFactory = {
    ..._344,
    ..._345
  };
}