import * as _147 from "./accum/v1beta1/accum";
import * as _148 from "./concentratedliquidity/params";
import * as _149 from "./cosmwasmpool/v1beta1/genesis";
import * as _150 from "./cosmwasmpool/v1beta1/gov";
import * as _151 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _152 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _153 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _154 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _155 from "./cosmwasmpool/v1beta1/model/pool";
import * as _156 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _157 from "./cosmwasmpool/v1beta1/model/tx";
import * as _158 from "./cosmwasmpool/v1beta1/params";
import * as _159 from "./cosmwasmpool/v1beta1/query";
import * as _160 from "./cosmwasmpool/v1beta1/tx";
import * as _161 from "./gamm/pool-models/balancer/balancerPool";
import * as _162 from "./gamm/v1beta1/genesis";
import * as _163 from "./gamm/v1beta1/gov";
import * as _164 from "./gamm/v1beta1/query";
import * as _165 from "./gamm/v1beta1/shared";
import * as _166 from "./gamm/v1beta1/tx";
import * as _167 from "./gamm/pool-models/balancer/tx/tx";
import * as _168 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _169 from "./gamm/pool-models/stableswap/tx";
import * as _170 from "./incentives/gauge";
import * as _171 from "./incentives/genesis";
import * as _172 from "./incentives/gov";
import * as _173 from "./incentives/group";
import * as _174 from "./incentives/params";
import * as _175 from "./incentives/query";
import * as _176 from "./incentives/tx";
import * as _177 from "./lockup/genesis";
import * as _178 from "./lockup/lock";
import * as _179 from "./lockup/params";
import * as _180 from "./lockup/query";
import * as _181 from "./lockup/tx";
import * as _182 from "./pool-incentives/v1beta1/genesis";
import * as _183 from "./pool-incentives/v1beta1/gov";
import * as _184 from "./pool-incentives/v1beta1/incentives";
import * as _185 from "./pool-incentives/v1beta1/query";
import * as _186 from "./pool-incentives/v1beta1/shared";
import * as _187 from "./poolmanager/v1beta1/genesis";
import * as _188 from "./poolmanager/v1beta1/gov";
import * as _189 from "./poolmanager/v1beta1/module_route";
import * as _190 from "./poolmanager/v1beta1/query";
import * as _191 from "./poolmanager/v1beta1/swap_route";
import * as _192 from "./poolmanager/v1beta1/tx";
import * as _193 from "./protorev/v1beta1/genesis";
import * as _194 from "./protorev/v1beta1/gov";
import * as _195 from "./protorev/v1beta1/params";
import * as _196 from "./protorev/v1beta1/protorev";
import * as _197 from "./protorev/v1beta1/query";
import * as _198 from "./protorev/v1beta1/tx";
import * as _199 from "./superfluid/genesis";
import * as _200 from "./superfluid/params";
import * as _201 from "./superfluid/query";
import * as _202 from "./superfluid/superfluid";
import * as _203 from "./superfluid/tx";
import * as _204 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _205 from "./tokenfactory/v1beta1/genesis";
import * as _206 from "./tokenfactory/v1beta1/params";
import * as _207 from "./tokenfactory/v1beta1/query";
import * as _208 from "./tokenfactory/v1beta1/tx";
import * as _209 from "./txfees/v1beta1/feetoken";
import * as _210 from "./txfees/v1beta1/genesis";
import * as _211 from "./txfees/v1beta1/gov";
import * as _212 from "./txfees/v1beta1/query";
import * as _213 from "./valset-pref/v1beta1/query";
import * as _214 from "./valset-pref/v1beta1/state";
import * as _215 from "./valset-pref/v1beta1/tx";
import * as _377 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _378 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _379 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _380 from "./gamm/pool-models/stableswap/tx.amino";
import * as _381 from "./gamm/v1beta1/tx.amino";
import * as _382 from "./incentives/tx.amino";
import * as _383 from "./lockup/tx.amino";
import * as _384 from "./poolmanager/v1beta1/tx.amino";
import * as _385 from "./protorev/v1beta1/tx.amino";
import * as _386 from "./superfluid/tx.amino";
import * as _387 from "./tokenfactory/v1beta1/tx.amino";
import * as _388 from "./valset-pref/v1beta1/tx.amino";
import * as _389 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _390 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _391 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _392 from "./gamm/pool-models/stableswap/tx.registry";
import * as _393 from "./gamm/v1beta1/tx.registry";
import * as _394 from "./incentives/tx.registry";
import * as _395 from "./lockup/tx.registry";
import * as _396 from "./poolmanager/v1beta1/tx.registry";
import * as _397 from "./protorev/v1beta1/tx.registry";
import * as _398 from "./superfluid/tx.registry";
import * as _399 from "./tokenfactory/v1beta1/tx.registry";
import * as _400 from "./valset-pref/v1beta1/tx.registry";
import * as _401 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _402 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _403 from "./gamm/v1beta1/query.rpc.Query";
import * as _404 from "./incentives/query.rpc.Query";
import * as _405 from "./lockup/query.rpc.Query";
import * as _406 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _407 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _408 from "./protorev/v1beta1/query.rpc.Query";
import * as _409 from "./superfluid/query.rpc.Query";
import * as _410 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _411 from "./txfees/v1beta1/query.rpc.Query";
import * as _412 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _413 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _414 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _415 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _416 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _417 from "./gamm/v1beta1/tx.rpc.msg";
import * as _418 from "./incentives/tx.rpc.msg";
import * as _419 from "./lockup/tx.rpc.msg";
import * as _420 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _421 from "./protorev/v1beta1/tx.rpc.msg";
import * as _422 from "./superfluid/tx.rpc.msg";
import * as _423 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _424 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _473 from "./rpc.query";
import * as _474 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._147
    };
  }
  export const concentratedliquidity = {
    ..._148,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._377,
          ..._389,
          ..._413
        }
      }
    },
    v1beta1: {
      ..._378,
      ..._390,
      ..._401,
      ..._414
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
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
      ..._160,
      ..._402
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._161,
      ..._162,
      ..._163,
      ..._164,
      ..._165,
      ..._166,
      ..._381,
      ..._393,
      ..._403,
      ..._417
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._167,
          ..._379,
          ..._391,
          ..._415
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._168,
          ..._169,
          ..._380,
          ..._392,
          ..._416
        };
      }
    }
  }
  export const incentives = {
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._382,
    ..._394,
    ..._404,
    ..._418
  };
  export const lockup = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._383,
    ..._395,
    ..._405,
    ..._419
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._186,
      ..._406
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._187,
      ..._188,
      ..._189,
      ..._190,
      ..._191,
      ..._192,
      ..._384,
      ..._396,
      ..._407,
      ..._420
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._193,
      ..._194,
      ..._195,
      ..._196,
      ..._197,
      ..._198,
      ..._385,
      ..._397,
      ..._408,
      ..._421
    };
  }
  export const superfluid = {
    ..._199,
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._386,
    ..._398,
    ..._409,
    ..._422
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._204,
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._387,
      ..._399,
      ..._410,
      ..._423
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._411
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._213,
      ..._214,
      ..._215,
      ..._388,
      ..._400,
      ..._412,
      ..._424
    };
  }
  export const ClientFactory = {
    ..._473,
    ..._474
  };
}