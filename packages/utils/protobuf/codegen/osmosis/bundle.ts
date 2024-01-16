import * as _115 from "./accum/v1beta1/accum";
import * as _116 from "./concentrated-liquidity/params";
import * as _117 from "./cosmwasmpool/v1beta1/genesis";
import * as _118 from "./cosmwasmpool/v1beta1/gov";
import * as _119 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _120 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _121 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _122 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _123 from "./cosmwasmpool/v1beta1/model/pool";
import * as _124 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _125 from "./cosmwasmpool/v1beta1/model/tx";
import * as _126 from "./cosmwasmpool/v1beta1/params";
import * as _127 from "./cosmwasmpool/v1beta1/query";
import * as _128 from "./cosmwasmpool/v1beta1/tx";
import * as _129 from "./gamm/pool-models/balancer/balancerPool";
import * as _130 from "./gamm/v1beta1/genesis";
import * as _131 from "./gamm/v1beta1/gov";
import * as _132 from "./gamm/v1beta1/query";
import * as _133 from "./gamm/v1beta1/shared";
import * as _134 from "./gamm/v1beta1/tx";
import * as _135 from "./gamm/pool-models/balancer/tx/tx";
import * as _136 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _137 from "./gamm/pool-models/stableswap/tx";
import * as _138 from "./incentives/gauge";
import * as _139 from "./incentives/genesis";
import * as _140 from "./incentives/params";
import * as _141 from "./incentives/query";
import * as _142 from "./incentives/tx";
import * as _143 from "./lockup/genesis";
import * as _144 from "./lockup/lock";
import * as _145 from "./lockup/params";
import * as _146 from "./lockup/query";
import * as _147 from "./lockup/tx";
import * as _148 from "./pool-incentives/v1beta1/genesis";
import * as _149 from "./pool-incentives/v1beta1/gov";
import * as _150 from "./pool-incentives/v1beta1/incentives";
import * as _151 from "./pool-incentives/v1beta1/query";
import * as _152 from "./pool-incentives/v1beta1/shared";
import * as _153 from "./poolmanager/v1beta1/genesis";
import * as _154 from "./poolmanager/v1beta1/gov";
import * as _155 from "./poolmanager/v1beta1/module_route";
import * as _156 from "./poolmanager/v1beta1/query";
import * as _157 from "./poolmanager/v1beta1/swap_route";
import * as _158 from "./poolmanager/v1beta1/tx";
import * as _159 from "./protorev/v1beta1/genesis";
import * as _160 from "./protorev/v1beta1/gov";
import * as _161 from "./protorev/v1beta1/params";
import * as _162 from "./protorev/v1beta1/protorev";
import * as _163 from "./protorev/v1beta1/query";
import * as _164 from "./protorev/v1beta1/tx";
import * as _165 from "./superfluid/genesis";
import * as _166 from "./superfluid/params";
import * as _167 from "./superfluid/query";
import * as _168 from "./superfluid/superfluid";
import * as _169 from "./superfluid/tx";
import * as _170 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _171 from "./tokenfactory/v1beta1/genesis";
import * as _172 from "./tokenfactory/v1beta1/params";
import * as _173 from "./tokenfactory/v1beta1/query";
import * as _174 from "./tokenfactory/v1beta1/tx";
import * as _175 from "./txfees/v1beta1/feetoken";
import * as _176 from "./txfees/v1beta1/genesis";
import * as _177 from "./txfees/v1beta1/gov";
import * as _178 from "./txfees/v1beta1/query";
import * as _179 from "./valset-pref/v1beta1/query";
import * as _180 from "./valset-pref/v1beta1/state";
import * as _181 from "./valset-pref/v1beta1/tx";
import * as _300 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _301 from "./concentrated-liquidity/tx.amino";
import * as _302 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _303 from "./gamm/pool-models/stableswap/tx.amino";
import * as _304 from "./gamm/v1beta1/tx.amino";
import * as _305 from "./incentives/tx.amino";
import * as _306 from "./lockup/tx.amino";
import * as _307 from "./poolmanager/v1beta1/tx.amino";
import * as _308 from "./protorev/v1beta1/tx.amino";
import * as _309 from "./superfluid/tx.amino";
import * as _310 from "./tokenfactory/v1beta1/tx.amino";
import * as _311 from "./valset-pref/v1beta1/tx.amino";
import * as _312 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _313 from "./concentrated-liquidity/tx.registry";
import * as _314 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _315 from "./gamm/pool-models/stableswap/tx.registry";
import * as _316 from "./gamm/v1beta1/tx.registry";
import * as _317 from "./incentives/tx.registry";
import * as _318 from "./lockup/tx.registry";
import * as _319 from "./poolmanager/v1beta1/tx.registry";
import * as _320 from "./protorev/v1beta1/tx.registry";
import * as _321 from "./superfluid/tx.registry";
import * as _322 from "./tokenfactory/v1beta1/tx.registry";
import * as _323 from "./valset-pref/v1beta1/tx.registry";
import * as _324 from "./concentrated-liquidity/query.rpc.Query";
import * as _325 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _326 from "./gamm/v1beta1/query.rpc.Query";
import * as _327 from "./incentives/query.rpc.Query";
import * as _328 from "./lockup/query.rpc.Query";
import * as _329 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _330 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _331 from "./protorev/v1beta1/query.rpc.Query";
import * as _332 from "./superfluid/query.rpc.Query";
import * as _333 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _334 from "./txfees/v1beta1/query.rpc.Query";
import * as _335 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _336 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _337 from "./concentrated-liquidity/tx.rpc.msg";
import * as _338 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _339 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _340 from "./gamm/v1beta1/tx.rpc.msg";
import * as _341 from "./incentives/tx.rpc.msg";
import * as _342 from "./lockup/tx.rpc.msg";
import * as _343 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _344 from "./protorev/v1beta1/tx.rpc.msg";
import * as _345 from "./superfluid/tx.rpc.msg";
import * as _346 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _347 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _374 from "./rpc.query";
import * as _375 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._115
    };
  }
  export const concentratedliquidity = {
    ..._116,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._300,
          ..._312,
          ..._336
        }
      }
    },
    v1beta1: {
      ..._301,
      ..._313,
      ..._324,
      ..._337
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._117,
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._325
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._129,
      ..._130,
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._304,
      ..._316,
      ..._326,
      ..._340
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._135,
          ..._302,
          ..._314,
          ..._338
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._136,
          ..._137,
          ..._303,
          ..._315,
          ..._339
        };
      }
    }
  }
  export const incentives = {
    ..._138,
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._305,
    ..._317,
    ..._327,
    ..._341
  };
  export const lockup = {
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._306,
    ..._318,
    ..._328,
    ..._342
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._148,
      ..._149,
      ..._150,
      ..._151,
      ..._152,
      ..._329
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._158,
      ..._307,
      ..._319,
      ..._330,
      ..._343
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._159,
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._164,
      ..._308,
      ..._320,
      ..._331,
      ..._344
    };
  }
  export const superfluid = {
    ..._165,
    ..._166,
    ..._167,
    ..._168,
    ..._169,
    ..._309,
    ..._321,
    ..._332,
    ..._345
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._170,
      ..._171,
      ..._172,
      ..._173,
      ..._174,
      ..._310,
      ..._322,
      ..._333,
      ..._346
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._175,
      ..._176,
      ..._177,
      ..._178,
      ..._334
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._179,
      ..._180,
      ..._181,
      ..._311,
      ..._323,
      ..._335,
      ..._347
    };
  }
  export const ClientFactory = {
    ..._374,
    ..._375
  };
}