import * as _87 from "./accum/v1beta1/accum";
import * as _88 from "./concentrated-liquidity/params";
import * as _89 from "./cosmwasmpool/v1beta1/genesis";
import * as _90 from "./cosmwasmpool/v1beta1/gov";
import * as _91 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _92 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _93 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _94 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _95 from "./cosmwasmpool/v1beta1/model/pool";
import * as _96 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _97 from "./cosmwasmpool/v1beta1/model/tx";
import * as _98 from "./cosmwasmpool/v1beta1/params";
import * as _99 from "./cosmwasmpool/v1beta1/query";
import * as _100 from "./cosmwasmpool/v1beta1/tx";
import * as _101 from "./gamm/pool-models/balancer/balancerPool";
import * as _102 from "./gamm/v1beta1/genesis";
import * as _103 from "./gamm/v1beta1/gov";
import * as _104 from "./gamm/v1beta1/query";
import * as _105 from "./gamm/v1beta1/shared";
import * as _106 from "./gamm/v1beta1/tx";
import * as _107 from "./gamm/pool-models/balancer/tx/tx";
import * as _108 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _109 from "./gamm/pool-models/stableswap/tx";
import * as _110 from "./incentives/gauge";
import * as _111 from "./incentives/genesis";
import * as _112 from "./incentives/params";
import * as _113 from "./incentives/query";
import * as _114 from "./incentives/tx";
import * as _115 from "./lockup/genesis";
import * as _116 from "./lockup/lock";
import * as _117 from "./lockup/params";
import * as _118 from "./lockup/query";
import * as _119 from "./lockup/tx";
import * as _120 from "./pool-incentives/v1beta1/genesis";
import * as _121 from "./pool-incentives/v1beta1/gov";
import * as _122 from "./pool-incentives/v1beta1/incentives";
import * as _123 from "./pool-incentives/v1beta1/query";
import * as _124 from "./pool-incentives/v1beta1/shared";
import * as _125 from "./poolmanager/v1beta1/genesis";
import * as _126 from "./poolmanager/v1beta1/module_route";
import * as _127 from "./poolmanager/v1beta1/query";
import * as _128 from "./poolmanager/v1beta1/swap_route";
import * as _129 from "./poolmanager/v1beta1/tx";
import * as _130 from "./protorev/v1beta1/genesis";
import * as _131 from "./protorev/v1beta1/gov";
import * as _132 from "./protorev/v1beta1/params";
import * as _133 from "./protorev/v1beta1/protorev";
import * as _134 from "./protorev/v1beta1/query";
import * as _135 from "./protorev/v1beta1/tx";
import * as _136 from "./superfluid/genesis";
import * as _137 from "./superfluid/params";
import * as _138 from "./superfluid/query";
import * as _139 from "./superfluid/superfluid";
import * as _140 from "./superfluid/tx";
import * as _141 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _142 from "./tokenfactory/v1beta1/genesis";
import * as _143 from "./tokenfactory/v1beta1/params";
import * as _144 from "./tokenfactory/v1beta1/query";
import * as _145 from "./tokenfactory/v1beta1/tx";
import * as _146 from "./txfees/v1beta1/feetoken";
import * as _147 from "./txfees/v1beta1/genesis";
import * as _148 from "./txfees/v1beta1/gov";
import * as _149 from "./txfees/v1beta1/query";
import * as _150 from "./valset-pref/v1beta1/query";
import * as _151 from "./valset-pref/v1beta1/state";
import * as _152 from "./valset-pref/v1beta1/tx";
import * as _222 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _223 from "./concentrated-liquidity/tx.amino";
import * as _224 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _225 from "./gamm/pool-models/stableswap/tx.amino";
import * as _226 from "./gamm/v1beta1/tx.amino";
import * as _227 from "./incentives/tx.amino";
import * as _228 from "./lockup/tx.amino";
import * as _229 from "./poolmanager/v1beta1/tx.amino";
import * as _230 from "./protorev/v1beta1/tx.amino";
import * as _231 from "./superfluid/tx.amino";
import * as _232 from "./tokenfactory/v1beta1/tx.amino";
import * as _233 from "./valset-pref/v1beta1/tx.amino";
import * as _234 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _235 from "./concentrated-liquidity/tx.registry";
import * as _236 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _237 from "./gamm/pool-models/stableswap/tx.registry";
import * as _238 from "./gamm/v1beta1/tx.registry";
import * as _239 from "./incentives/tx.registry";
import * as _240 from "./lockup/tx.registry";
import * as _241 from "./poolmanager/v1beta1/tx.registry";
import * as _242 from "./protorev/v1beta1/tx.registry";
import * as _243 from "./superfluid/tx.registry";
import * as _244 from "./tokenfactory/v1beta1/tx.registry";
import * as _245 from "./valset-pref/v1beta1/tx.registry";
import * as _246 from "./concentrated-liquidity/query.rpc.Query";
import * as _247 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _248 from "./gamm/v1beta1/query.rpc.Query";
import * as _249 from "./incentives/query.rpc.Query";
import * as _250 from "./lockup/query.rpc.Query";
import * as _251 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _252 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _253 from "./protorev/v1beta1/query.rpc.Query";
import * as _254 from "./superfluid/query.rpc.Query";
import * as _255 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _256 from "./txfees/v1beta1/query.rpc.Query";
import * as _257 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _258 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _259 from "./concentrated-liquidity/tx.rpc.msg";
import * as _260 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _261 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _262 from "./gamm/v1beta1/tx.rpc.msg";
import * as _263 from "./incentives/tx.rpc.msg";
import * as _264 from "./lockup/tx.rpc.msg";
import * as _265 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _266 from "./protorev/v1beta1/tx.rpc.msg";
import * as _267 from "./superfluid/tx.rpc.msg";
import * as _268 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _269 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _278 from "./rpc.query";
import * as _279 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._87
    };
  }
  export const concentratedliquidity = {
    ..._88,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._222,
          ..._234,
          ..._258
        }
      }
    },
    v1beta1: {
      ..._223,
      ..._235,
      ..._246,
      ..._259
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._89,
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._247
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._106,
      ..._226,
      ..._238,
      ..._248,
      ..._262
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._107,
          ..._224,
          ..._236,
          ..._260
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._108,
          ..._109,
          ..._225,
          ..._237,
          ..._261
        };
      }
    }
  }
  export const incentives = {
    ..._110,
    ..._111,
    ..._112,
    ..._113,
    ..._114,
    ..._227,
    ..._239,
    ..._249,
    ..._263
  };
  export const lockup = {
    ..._115,
    ..._116,
    ..._117,
    ..._118,
    ..._119,
    ..._228,
    ..._240,
    ..._250,
    ..._264
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._120,
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._251
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._129,
      ..._229,
      ..._241,
      ..._252,
      ..._265
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._130,
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._230,
      ..._242,
      ..._253,
      ..._266
    };
  }
  export const superfluid = {
    ..._136,
    ..._137,
    ..._138,
    ..._139,
    ..._140,
    ..._231,
    ..._243,
    ..._254,
    ..._267
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._141,
      ..._142,
      ..._143,
      ..._144,
      ..._145,
      ..._232,
      ..._244,
      ..._255,
      ..._268
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._146,
      ..._147,
      ..._148,
      ..._149,
      ..._256
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._150,
      ..._151,
      ..._152,
      ..._233,
      ..._245,
      ..._257,
      ..._269
    };
  }
  export const ClientFactory = {
    ..._278,
    ..._279
  };
}