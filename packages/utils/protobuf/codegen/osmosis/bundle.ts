import * as _108 from "./accum/v1beta1/accum";
import * as _109 from "./concentrated-liquidity/params";
import * as _110 from "./cosmwasmpool/v1beta1/genesis";
import * as _111 from "./cosmwasmpool/v1beta1/gov";
import * as _112 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _113 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _114 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _115 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _116 from "./cosmwasmpool/v1beta1/model/pool";
import * as _117 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _118 from "./cosmwasmpool/v1beta1/model/tx";
import * as _119 from "./cosmwasmpool/v1beta1/params";
import * as _120 from "./cosmwasmpool/v1beta1/query";
import * as _121 from "./cosmwasmpool/v1beta1/tx";
import * as _122 from "./gamm/pool-models/balancer/balancerPool";
import * as _123 from "./gamm/v1beta1/genesis";
import * as _124 from "./gamm/v1beta1/gov";
import * as _125 from "./gamm/v1beta1/query";
import * as _126 from "./gamm/v1beta1/shared";
import * as _127 from "./gamm/v1beta1/tx";
import * as _128 from "./gamm/pool-models/balancer/tx/tx";
import * as _129 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _130 from "./gamm/pool-models/stableswap/tx";
import * as _131 from "./incentives/gauge";
import * as _132 from "./incentives/genesis";
import * as _133 from "./incentives/params";
import * as _134 from "./incentives/query";
import * as _135 from "./incentives/tx";
import * as _136 from "./lockup/genesis";
import * as _137 from "./lockup/lock";
import * as _138 from "./lockup/params";
import * as _139 from "./lockup/query";
import * as _140 from "./lockup/tx";
import * as _141 from "./pool-incentives/v1beta1/genesis";
import * as _142 from "./pool-incentives/v1beta1/gov";
import * as _143 from "./pool-incentives/v1beta1/incentives";
import * as _144 from "./pool-incentives/v1beta1/query";
import * as _145 from "./pool-incentives/v1beta1/shared";
import * as _146 from "./poolmanager/v1beta1/genesis";
import * as _147 from "./poolmanager/v1beta1/gov";
import * as _148 from "./poolmanager/v1beta1/module_route";
import * as _149 from "./poolmanager/v1beta1/query";
import * as _150 from "./poolmanager/v1beta1/swap_route";
import * as _151 from "./poolmanager/v1beta1/tx";
import * as _152 from "./protorev/v1beta1/genesis";
import * as _153 from "./protorev/v1beta1/gov";
import * as _154 from "./protorev/v1beta1/params";
import * as _155 from "./protorev/v1beta1/protorev";
import * as _156 from "./protorev/v1beta1/query";
import * as _157 from "./protorev/v1beta1/tx";
import * as _158 from "./superfluid/genesis";
import * as _159 from "./superfluid/params";
import * as _160 from "./superfluid/query";
import * as _161 from "./superfluid/superfluid";
import * as _162 from "./superfluid/tx";
import * as _163 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _164 from "./tokenfactory/v1beta1/genesis";
import * as _165 from "./tokenfactory/v1beta1/params";
import * as _166 from "./tokenfactory/v1beta1/query";
import * as _167 from "./tokenfactory/v1beta1/tx";
import * as _168 from "./txfees/v1beta1/feetoken";
import * as _169 from "./txfees/v1beta1/genesis";
import * as _170 from "./txfees/v1beta1/gov";
import * as _171 from "./txfees/v1beta1/query";
import * as _172 from "./valset-pref/v1beta1/query";
import * as _173 from "./valset-pref/v1beta1/state";
import * as _174 from "./valset-pref/v1beta1/tx";
import * as _285 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _286 from "./concentrated-liquidity/tx.amino";
import * as _287 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _288 from "./gamm/pool-models/stableswap/tx.amino";
import * as _289 from "./gamm/v1beta1/tx.amino";
import * as _290 from "./incentives/tx.amino";
import * as _291 from "./lockup/tx.amino";
import * as _292 from "./poolmanager/v1beta1/tx.amino";
import * as _293 from "./protorev/v1beta1/tx.amino";
import * as _294 from "./superfluid/tx.amino";
import * as _295 from "./tokenfactory/v1beta1/tx.amino";
import * as _296 from "./valset-pref/v1beta1/tx.amino";
import * as _297 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _298 from "./concentrated-liquidity/tx.registry";
import * as _299 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _300 from "./gamm/pool-models/stableswap/tx.registry";
import * as _301 from "./gamm/v1beta1/tx.registry";
import * as _302 from "./incentives/tx.registry";
import * as _303 from "./lockup/tx.registry";
import * as _304 from "./poolmanager/v1beta1/tx.registry";
import * as _305 from "./protorev/v1beta1/tx.registry";
import * as _306 from "./superfluid/tx.registry";
import * as _307 from "./tokenfactory/v1beta1/tx.registry";
import * as _308 from "./valset-pref/v1beta1/tx.registry";
import * as _309 from "./concentrated-liquidity/query.rpc.Query";
import * as _310 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _311 from "./gamm/v1beta1/query.rpc.Query";
import * as _312 from "./incentives/query.rpc.Query";
import * as _313 from "./lockup/query.rpc.Query";
import * as _314 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _315 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _316 from "./protorev/v1beta1/query.rpc.Query";
import * as _317 from "./superfluid/query.rpc.Query";
import * as _318 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _319 from "./txfees/v1beta1/query.rpc.Query";
import * as _320 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _321 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _322 from "./concentrated-liquidity/tx.rpc.msg";
import * as _323 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _324 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _325 from "./gamm/v1beta1/tx.rpc.msg";
import * as _326 from "./incentives/tx.rpc.msg";
import * as _327 from "./lockup/tx.rpc.msg";
import * as _328 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _329 from "./protorev/v1beta1/tx.rpc.msg";
import * as _330 from "./superfluid/tx.rpc.msg";
import * as _331 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _332 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _357 from "./rpc.query";
import * as _358 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._108
    };
  }
  export const concentratedliquidity = {
    ..._109,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._285,
          ..._297,
          ..._321
        }
      }
    },
    v1beta1: {
      ..._286,
      ..._298,
      ..._309,
      ..._322
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._116,
      ..._117,
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._310
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._289,
      ..._301,
      ..._311,
      ..._325
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._128,
          ..._287,
          ..._299,
          ..._323
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._129,
          ..._130,
          ..._288,
          ..._300,
          ..._324
        };
      }
    }
  }
  export const incentives = {
    ..._131,
    ..._132,
    ..._133,
    ..._134,
    ..._135,
    ..._290,
    ..._302,
    ..._312,
    ..._326
  };
  export const lockup = {
    ..._136,
    ..._137,
    ..._138,
    ..._139,
    ..._140,
    ..._291,
    ..._303,
    ..._313,
    ..._327
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._141,
      ..._142,
      ..._143,
      ..._144,
      ..._145,
      ..._314
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._146,
      ..._147,
      ..._148,
      ..._149,
      ..._150,
      ..._151,
      ..._292,
      ..._304,
      ..._315,
      ..._328
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._152,
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._293,
      ..._305,
      ..._316,
      ..._329
    };
  }
  export const superfluid = {
    ..._158,
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._294,
    ..._306,
    ..._317,
    ..._330
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._163,
      ..._164,
      ..._165,
      ..._166,
      ..._167,
      ..._295,
      ..._307,
      ..._318,
      ..._331
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._168,
      ..._169,
      ..._170,
      ..._171,
      ..._319
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._172,
      ..._173,
      ..._174,
      ..._296,
      ..._308,
      ..._320,
      ..._332
    };
  }
  export const ClientFactory = {
    ..._357,
    ..._358
  };
}