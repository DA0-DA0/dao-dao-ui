import * as _91 from "./accum/v1beta1/accum";
import * as _92 from "./concentrated-liquidity/params";
import * as _93 from "./cosmwasmpool/v1beta1/genesis";
import * as _94 from "./cosmwasmpool/v1beta1/gov";
import * as _95 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _96 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _97 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _98 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _99 from "./cosmwasmpool/v1beta1/model/pool";
import * as _100 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _101 from "./cosmwasmpool/v1beta1/model/tx";
import * as _102 from "./cosmwasmpool/v1beta1/params";
import * as _103 from "./cosmwasmpool/v1beta1/query";
import * as _104 from "./cosmwasmpool/v1beta1/tx";
import * as _105 from "./gamm/pool-models/balancer/balancerPool";
import * as _106 from "./gamm/v1beta1/genesis";
import * as _107 from "./gamm/v1beta1/gov";
import * as _108 from "./gamm/v1beta1/query";
import * as _109 from "./gamm/v1beta1/shared";
import * as _110 from "./gamm/v1beta1/tx";
import * as _111 from "./gamm/pool-models/balancer/tx/tx";
import * as _112 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _113 from "./gamm/pool-models/stableswap/tx";
import * as _114 from "./incentives/gauge";
import * as _115 from "./incentives/genesis";
import * as _116 from "./incentives/params";
import * as _117 from "./incentives/query";
import * as _118 from "./incentives/tx";
import * as _119 from "./lockup/genesis";
import * as _120 from "./lockup/lock";
import * as _121 from "./lockup/params";
import * as _122 from "./lockup/query";
import * as _123 from "./lockup/tx";
import * as _124 from "./pool-incentives/v1beta1/genesis";
import * as _125 from "./pool-incentives/v1beta1/gov";
import * as _126 from "./pool-incentives/v1beta1/incentives";
import * as _127 from "./pool-incentives/v1beta1/query";
import * as _128 from "./pool-incentives/v1beta1/shared";
import * as _129 from "./poolmanager/v1beta1/genesis";
import * as _130 from "./poolmanager/v1beta1/gov";
import * as _131 from "./poolmanager/v1beta1/module_route";
import * as _132 from "./poolmanager/v1beta1/query";
import * as _133 from "./poolmanager/v1beta1/swap_route";
import * as _134 from "./poolmanager/v1beta1/tx";
import * as _135 from "./protorev/v1beta1/genesis";
import * as _136 from "./protorev/v1beta1/gov";
import * as _137 from "./protorev/v1beta1/params";
import * as _138 from "./protorev/v1beta1/protorev";
import * as _139 from "./protorev/v1beta1/query";
import * as _140 from "./protorev/v1beta1/tx";
import * as _141 from "./superfluid/genesis";
import * as _142 from "./superfluid/params";
import * as _143 from "./superfluid/query";
import * as _144 from "./superfluid/superfluid";
import * as _145 from "./superfluid/tx";
import * as _146 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _147 from "./tokenfactory/v1beta1/genesis";
import * as _148 from "./tokenfactory/v1beta1/params";
import * as _149 from "./tokenfactory/v1beta1/query";
import * as _150 from "./tokenfactory/v1beta1/tx";
import * as _151 from "./txfees/v1beta1/feetoken";
import * as _152 from "./txfees/v1beta1/genesis";
import * as _153 from "./txfees/v1beta1/gov";
import * as _154 from "./txfees/v1beta1/query";
import * as _155 from "./valset-pref/v1beta1/query";
import * as _156 from "./valset-pref/v1beta1/state";
import * as _157 from "./valset-pref/v1beta1/tx";
import * as _231 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _232 from "./concentrated-liquidity/tx.amino";
import * as _233 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _234 from "./gamm/pool-models/stableswap/tx.amino";
import * as _235 from "./gamm/v1beta1/tx.amino";
import * as _236 from "./incentives/tx.amino";
import * as _237 from "./lockup/tx.amino";
import * as _238 from "./poolmanager/v1beta1/tx.amino";
import * as _239 from "./protorev/v1beta1/tx.amino";
import * as _240 from "./superfluid/tx.amino";
import * as _241 from "./tokenfactory/v1beta1/tx.amino";
import * as _242 from "./valset-pref/v1beta1/tx.amino";
import * as _243 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _244 from "./concentrated-liquidity/tx.registry";
import * as _245 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _246 from "./gamm/pool-models/stableswap/tx.registry";
import * as _247 from "./gamm/v1beta1/tx.registry";
import * as _248 from "./incentives/tx.registry";
import * as _249 from "./lockup/tx.registry";
import * as _250 from "./poolmanager/v1beta1/tx.registry";
import * as _251 from "./protorev/v1beta1/tx.registry";
import * as _252 from "./superfluid/tx.registry";
import * as _253 from "./tokenfactory/v1beta1/tx.registry";
import * as _254 from "./valset-pref/v1beta1/tx.registry";
import * as _255 from "./concentrated-liquidity/query.rpc.Query";
import * as _256 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _257 from "./gamm/v1beta1/query.rpc.Query";
import * as _258 from "./incentives/query.rpc.Query";
import * as _259 from "./lockup/query.rpc.Query";
import * as _260 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _261 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _262 from "./protorev/v1beta1/query.rpc.Query";
import * as _263 from "./superfluid/query.rpc.Query";
import * as _264 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _265 from "./txfees/v1beta1/query.rpc.Query";
import * as _266 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _267 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _268 from "./concentrated-liquidity/tx.rpc.msg";
import * as _269 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _270 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _271 from "./gamm/v1beta1/tx.rpc.msg";
import * as _272 from "./incentives/tx.rpc.msg";
import * as _273 from "./lockup/tx.rpc.msg";
import * as _274 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _275 from "./protorev/v1beta1/tx.rpc.msg";
import * as _276 from "./superfluid/tx.rpc.msg";
import * as _277 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _278 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _287 from "./rpc.query";
import * as _288 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._91
    };
  }
  export const concentratedliquidity = {
    ..._92,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._231,
          ..._243,
          ..._267
        }
      }
    },
    v1beta1: {
      ..._232,
      ..._244,
      ..._255,
      ..._268
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._256
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._109,
      ..._110,
      ..._235,
      ..._247,
      ..._257,
      ..._271
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._111,
          ..._233,
          ..._245,
          ..._269
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._112,
          ..._113,
          ..._234,
          ..._246,
          ..._270
        };
      }
    }
  }
  export const incentives = {
    ..._114,
    ..._115,
    ..._116,
    ..._117,
    ..._118,
    ..._236,
    ..._248,
    ..._258,
    ..._272
  };
  export const lockup = {
    ..._119,
    ..._120,
    ..._121,
    ..._122,
    ..._123,
    ..._237,
    ..._249,
    ..._259,
    ..._273
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._260
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._129,
      ..._130,
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._238,
      ..._250,
      ..._261,
      ..._274
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._239,
      ..._251,
      ..._262,
      ..._275
    };
  }
  export const superfluid = {
    ..._141,
    ..._142,
    ..._143,
    ..._144,
    ..._145,
    ..._240,
    ..._252,
    ..._263,
    ..._276
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._146,
      ..._147,
      ..._148,
      ..._149,
      ..._150,
      ..._241,
      ..._253,
      ..._264,
      ..._277
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._151,
      ..._152,
      ..._153,
      ..._154,
      ..._265
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._155,
      ..._156,
      ..._157,
      ..._242,
      ..._254,
      ..._266,
      ..._278
    };
  }
  export const ClientFactory = {
    ..._287,
    ..._288
  };
}