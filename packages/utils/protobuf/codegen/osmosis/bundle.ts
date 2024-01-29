import * as _146 from "./accum/v1beta1/accum";
import * as _147 from "./concentratedliquidity/params";
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
import * as _171 from "./incentives/gov";
import * as _172 from "./incentives/group";
import * as _173 from "./incentives/params";
import * as _174 from "./incentives/query";
import * as _175 from "./incentives/tx";
import * as _176 from "./lockup/genesis";
import * as _177 from "./lockup/lock";
import * as _178 from "./lockup/params";
import * as _179 from "./lockup/query";
import * as _180 from "./lockup/tx";
import * as _181 from "./pool-incentives/v1beta1/genesis";
import * as _182 from "./pool-incentives/v1beta1/gov";
import * as _183 from "./pool-incentives/v1beta1/incentives";
import * as _184 from "./pool-incentives/v1beta1/query";
import * as _185 from "./pool-incentives/v1beta1/shared";
import * as _186 from "./poolmanager/v1beta1/genesis";
import * as _187 from "./poolmanager/v1beta1/gov";
import * as _188 from "./poolmanager/v1beta1/module_route";
import * as _189 from "./poolmanager/v1beta1/query";
import * as _190 from "./poolmanager/v1beta1/swap_route";
import * as _191 from "./poolmanager/v1beta1/tx";
import * as _192 from "./protorev/v1beta1/genesis";
import * as _193 from "./protorev/v1beta1/gov";
import * as _194 from "./protorev/v1beta1/params";
import * as _195 from "./protorev/v1beta1/protorev";
import * as _196 from "./protorev/v1beta1/query";
import * as _197 from "./protorev/v1beta1/tx";
import * as _198 from "./superfluid/genesis";
import * as _199 from "./superfluid/params";
import * as _200 from "./superfluid/query";
import * as _201 from "./superfluid/superfluid";
import * as _202 from "./superfluid/tx";
import * as _203 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _204 from "./tokenfactory/v1beta1/genesis";
import * as _205 from "./tokenfactory/v1beta1/params";
import * as _206 from "./tokenfactory/v1beta1/query";
import * as _207 from "./tokenfactory/v1beta1/tx";
import * as _208 from "./txfees/v1beta1/feetoken";
import * as _209 from "./txfees/v1beta1/genesis";
import * as _210 from "./txfees/v1beta1/gov";
import * as _211 from "./txfees/v1beta1/query";
import * as _212 from "./valset-pref/v1beta1/query";
import * as _213 from "./valset-pref/v1beta1/state";
import * as _214 from "./valset-pref/v1beta1/tx";
import * as _349 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _350 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _351 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _352 from "./gamm/pool-models/stableswap/tx.amino";
import * as _353 from "./gamm/v1beta1/tx.amino";
import * as _354 from "./incentives/tx.amino";
import * as _355 from "./lockup/tx.amino";
import * as _356 from "./poolmanager/v1beta1/tx.amino";
import * as _357 from "./protorev/v1beta1/tx.amino";
import * as _358 from "./superfluid/tx.amino";
import * as _359 from "./tokenfactory/v1beta1/tx.amino";
import * as _360 from "./valset-pref/v1beta1/tx.amino";
import * as _361 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _362 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _363 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _364 from "./gamm/pool-models/stableswap/tx.registry";
import * as _365 from "./gamm/v1beta1/tx.registry";
import * as _366 from "./incentives/tx.registry";
import * as _367 from "./lockup/tx.registry";
import * as _368 from "./poolmanager/v1beta1/tx.registry";
import * as _369 from "./protorev/v1beta1/tx.registry";
import * as _370 from "./superfluid/tx.registry";
import * as _371 from "./tokenfactory/v1beta1/tx.registry";
import * as _372 from "./valset-pref/v1beta1/tx.registry";
import * as _373 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _374 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _375 from "./gamm/v1beta1/query.rpc.Query";
import * as _376 from "./incentives/query.rpc.Query";
import * as _377 from "./lockup/query.rpc.Query";
import * as _378 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _379 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _380 from "./protorev/v1beta1/query.rpc.Query";
import * as _381 from "./superfluid/query.rpc.Query";
import * as _382 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _383 from "./txfees/v1beta1/query.rpc.Query";
import * as _384 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _385 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _386 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _387 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _388 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _389 from "./gamm/v1beta1/tx.rpc.msg";
import * as _390 from "./incentives/tx.rpc.msg";
import * as _391 from "./lockup/tx.rpc.msg";
import * as _392 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _393 from "./protorev/v1beta1/tx.rpc.msg";
import * as _394 from "./superfluid/tx.rpc.msg";
import * as _395 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _396 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _423 from "./rpc.query";
import * as _424 from "./rpc.tx";
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
          ..._349,
          ..._361,
          ..._385
        }
      }
    },
    v1beta1: {
      ..._350,
      ..._362,
      ..._373,
      ..._386
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
      ..._374
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
      ..._353,
      ..._365,
      ..._375,
      ..._389
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._166,
          ..._351,
          ..._363,
          ..._387
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._167,
          ..._168,
          ..._352,
          ..._364,
          ..._388
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
    ..._174,
    ..._175,
    ..._354,
    ..._366,
    ..._376,
    ..._390
  };
  export const lockup = {
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._355,
    ..._367,
    ..._377,
    ..._391
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._181,
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._378
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._186,
      ..._187,
      ..._188,
      ..._189,
      ..._190,
      ..._191,
      ..._356,
      ..._368,
      ..._379,
      ..._392
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._192,
      ..._193,
      ..._194,
      ..._195,
      ..._196,
      ..._197,
      ..._357,
      ..._369,
      ..._380,
      ..._393
    };
  }
  export const superfluid = {
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._202,
    ..._358,
    ..._370,
    ..._381,
    ..._394
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._203,
      ..._204,
      ..._205,
      ..._206,
      ..._207,
      ..._359,
      ..._371,
      ..._382,
      ..._395
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._208,
      ..._209,
      ..._210,
      ..._211,
      ..._383
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._212,
      ..._213,
      ..._214,
      ..._360,
      ..._372,
      ..._384,
      ..._396
    };
  }
  export const ClientFactory = {
    ..._423,
    ..._424
  };
}