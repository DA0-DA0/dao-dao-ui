import * as _146 from "./accum/v1beta1/accum";
import * as _147 from "./concentrated-liquidity/params";
import * as _148 from "./cosmwasmpool/v1beta1/genesis";
import * as _149 from "./cosmwasmpool/v1beta1/gov";
import * as _150 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _151 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _152 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _153 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _154 from "./cosmwasmpool/v1beta1/model/pool";
import * as _155 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _156 from "./cosmwasmpool/v1beta1/model/tx";
import * as _157 from "./cosmwasmpool/v1beta1/params";
import * as _158 from "./cosmwasmpool/v1beta1/query";
import * as _159 from "./cosmwasmpool/v1beta1/tx";
import * as _160 from "./gamm/pool-models/balancer/balancerPool";
import * as _161 from "./gamm/v1beta1/genesis";
import * as _162 from "./gamm/v1beta1/gov";
import * as _163 from "./gamm/v1beta1/query";
import * as _164 from "./gamm/v1beta1/shared";
import * as _165 from "./gamm/v1beta1/tx";
import * as _166 from "./gamm/pool-models/balancer/tx/tx";
import * as _167 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _168 from "./gamm/pool-models/stableswap/tx";
import * as _169 from "./incentives/gauge";
import * as _170 from "./incentives/genesis";
import * as _171 from "./incentives/params";
import * as _172 from "./incentives/query";
import * as _173 from "./incentives/tx";
import * as _174 from "./lockup/genesis";
import * as _175 from "./lockup/lock";
import * as _176 from "./lockup/params";
import * as _177 from "./lockup/query";
import * as _178 from "./lockup/tx";
import * as _179 from "./pool-incentives/v1beta1/genesis";
import * as _180 from "./pool-incentives/v1beta1/gov";
import * as _181 from "./pool-incentives/v1beta1/incentives";
import * as _182 from "./pool-incentives/v1beta1/query";
import * as _183 from "./pool-incentives/v1beta1/shared";
import * as _184 from "./poolmanager/v1beta1/genesis";
import * as _185 from "./poolmanager/v1beta1/gov";
import * as _186 from "./poolmanager/v1beta1/module_route";
import * as _187 from "./poolmanager/v1beta1/query";
import * as _188 from "./poolmanager/v1beta1/swap_route";
import * as _189 from "./poolmanager/v1beta1/tx";
import * as _190 from "./protorev/v1beta1/genesis";
import * as _191 from "./protorev/v1beta1/gov";
import * as _192 from "./protorev/v1beta1/params";
import * as _193 from "./protorev/v1beta1/protorev";
import * as _194 from "./protorev/v1beta1/query";
import * as _195 from "./protorev/v1beta1/tx";
import * as _196 from "./superfluid/genesis";
import * as _197 from "./superfluid/params";
import * as _198 from "./superfluid/query";
import * as _199 from "./superfluid/superfluid";
import * as _200 from "./superfluid/tx";
import * as _201 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _202 from "./tokenfactory/v1beta1/genesis";
import * as _203 from "./tokenfactory/v1beta1/params";
import * as _204 from "./tokenfactory/v1beta1/query";
import * as _205 from "./tokenfactory/v1beta1/tx";
import * as _206 from "./txfees/v1beta1/feetoken";
import * as _207 from "./txfees/v1beta1/genesis";
import * as _208 from "./txfees/v1beta1/gov";
import * as _209 from "./txfees/v1beta1/query";
import * as _210 from "./valset-pref/v1beta1/query";
import * as _211 from "./valset-pref/v1beta1/state";
import * as _212 from "./valset-pref/v1beta1/tx";
import * as _347 from "./concentrated-liquidity/pool-model/concentrated/tx.amino";
import * as _348 from "./concentrated-liquidity/tx.amino";
import * as _349 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _350 from "./gamm/pool-models/stableswap/tx.amino";
import * as _351 from "./gamm/v1beta1/tx.amino";
import * as _352 from "./incentives/tx.amino";
import * as _353 from "./lockup/tx.amino";
import * as _354 from "./poolmanager/v1beta1/tx.amino";
import * as _355 from "./protorev/v1beta1/tx.amino";
import * as _356 from "./superfluid/tx.amino";
import * as _357 from "./tokenfactory/v1beta1/tx.amino";
import * as _358 from "./valset-pref/v1beta1/tx.amino";
import * as _359 from "./concentrated-liquidity/pool-model/concentrated/tx.registry";
import * as _360 from "./concentrated-liquidity/tx.registry";
import * as _361 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _362 from "./gamm/pool-models/stableswap/tx.registry";
import * as _363 from "./gamm/v1beta1/tx.registry";
import * as _364 from "./incentives/tx.registry";
import * as _365 from "./lockup/tx.registry";
import * as _366 from "./poolmanager/v1beta1/tx.registry";
import * as _367 from "./protorev/v1beta1/tx.registry";
import * as _368 from "./superfluid/tx.registry";
import * as _369 from "./tokenfactory/v1beta1/tx.registry";
import * as _370 from "./valset-pref/v1beta1/tx.registry";
import * as _371 from "./concentrated-liquidity/query.rpc.Query";
import * as _372 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _373 from "./gamm/v1beta1/query.rpc.Query";
import * as _374 from "./incentives/query.rpc.Query";
import * as _375 from "./lockup/query.rpc.Query";
import * as _376 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _377 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _378 from "./protorev/v1beta1/query.rpc.Query";
import * as _379 from "./superfluid/query.rpc.Query";
import * as _380 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _381 from "./txfees/v1beta1/query.rpc.Query";
import * as _382 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _383 from "./concentrated-liquidity/pool-model/concentrated/tx.rpc.msg";
import * as _384 from "./concentrated-liquidity/tx.rpc.msg";
import * as _385 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _386 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _387 from "./gamm/v1beta1/tx.rpc.msg";
import * as _388 from "./incentives/tx.rpc.msg";
import * as _389 from "./lockup/tx.rpc.msg";
import * as _390 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _391 from "./protorev/v1beta1/tx.rpc.msg";
import * as _392 from "./superfluid/tx.rpc.msg";
import * as _393 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _394 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _421 from "./rpc.query";
import * as _422 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._146
    };
  }
  export const concentratedliquidity = {
    ..._147,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._347,
          ..._359,
          ..._383
        }
      }
    },
    v1beta1: {
      ..._348,
      ..._360,
      ..._371,
      ..._384
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._148,
      ..._149,
      ..._150,
      ..._151,
      ..._152,
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._158,
      ..._159,
      ..._372
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._164,
      ..._165,
      ..._351,
      ..._363,
      ..._373,
      ..._387
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._166,
          ..._349,
          ..._361,
          ..._385
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._167,
          ..._168,
          ..._350,
          ..._362,
          ..._386
        };
      }
    }
  }
  export const incentives = {
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._352,
    ..._364,
    ..._374,
    ..._388
  };
  export const lockup = {
    ..._174,
    ..._175,
    ..._176,
    ..._177,
    ..._178,
    ..._353,
    ..._365,
    ..._375,
    ..._389
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._179,
      ..._180,
      ..._181,
      ..._182,
      ..._183,
      ..._376
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._184,
      ..._185,
      ..._186,
      ..._187,
      ..._188,
      ..._189,
      ..._354,
      ..._366,
      ..._377,
      ..._390
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._190,
      ..._191,
      ..._192,
      ..._193,
      ..._194,
      ..._195,
      ..._355,
      ..._367,
      ..._378,
      ..._391
    };
  }
  export const superfluid = {
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._356,
    ..._368,
    ..._379,
    ..._392
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._357,
      ..._369,
      ..._380,
      ..._393
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._381
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._210,
      ..._211,
      ..._212,
      ..._358,
      ..._370,
      ..._382,
      ..._394
    };
  }
  export const ClientFactory = {
    ..._421,
    ..._422
  };
}