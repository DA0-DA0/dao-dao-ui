import * as _177 from "./accum/v1beta1/accum";
import * as _178 from "./concentratedliquidity/params";
import * as _179 from "./cosmwasmpool/v1beta1/genesis";
import * as _180 from "./cosmwasmpool/v1beta1/gov";
import * as _181 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _182 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _183 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _184 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _185 from "./cosmwasmpool/v1beta1/model/pool";
import * as _186 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _187 from "./cosmwasmpool/v1beta1/model/tx";
import * as _188 from "./cosmwasmpool/v1beta1/params";
import * as _189 from "./cosmwasmpool/v1beta1/query";
import * as _190 from "./cosmwasmpool/v1beta1/tx";
import * as _191 from "./gamm/pool-models/balancer/balancerPool";
import * as _192 from "./gamm/v1beta1/genesis";
import * as _193 from "./gamm/v1beta1/gov";
import * as _194 from "./gamm/v1beta1/query";
import * as _195 from "./gamm/v1beta1/shared";
import * as _196 from "./gamm/v1beta1/tx";
import * as _197 from "./gamm/pool-models/balancer/tx/tx";
import * as _198 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _199 from "./gamm/pool-models/stableswap/tx";
import * as _200 from "./incentives/gauge";
import * as _201 from "./incentives/genesis";
import * as _202 from "./incentives/gov";
import * as _203 from "./incentives/group";
import * as _204 from "./incentives/params";
import * as _205 from "./incentives/query";
import * as _206 from "./incentives/tx";
import * as _207 from "./lockup/genesis";
import * as _208 from "./lockup/lock";
import * as _209 from "./lockup/params";
import * as _210 from "./lockup/query";
import * as _211 from "./lockup/tx";
import * as _212 from "./pool-incentives/v1beta1/genesis";
import * as _213 from "./pool-incentives/v1beta1/gov";
import * as _214 from "./pool-incentives/v1beta1/incentives";
import * as _215 from "./pool-incentives/v1beta1/query";
import * as _216 from "./pool-incentives/v1beta1/shared";
import * as _217 from "./poolmanager/v1beta1/genesis";
import * as _218 from "./poolmanager/v1beta1/gov";
import * as _219 from "./poolmanager/v1beta1/module_route";
import * as _220 from "./poolmanager/v1beta1/query";
import * as _221 from "./poolmanager/v1beta1/swap_route";
import * as _222 from "./poolmanager/v1beta1/tx";
import * as _223 from "./protorev/v1beta1/genesis";
import * as _224 from "./protorev/v1beta1/gov";
import * as _225 from "./protorev/v1beta1/params";
import * as _226 from "./protorev/v1beta1/protorev";
import * as _227 from "./protorev/v1beta1/query";
import * as _228 from "./protorev/v1beta1/tx";
import * as _229 from "./superfluid/genesis";
import * as _230 from "./superfluid/params";
import * as _231 from "./superfluid/query";
import * as _232 from "./superfluid/superfluid";
import * as _233 from "./superfluid/tx";
import * as _234 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _235 from "./tokenfactory/v1beta1/genesis";
import * as _236 from "./tokenfactory/v1beta1/params";
import * as _237 from "./tokenfactory/v1beta1/query";
import * as _238 from "./tokenfactory/v1beta1/tx";
import * as _239 from "./txfees/v1beta1/feetoken";
import * as _240 from "./txfees/v1beta1/genesis";
import * as _241 from "./txfees/v1beta1/gov";
import * as _242 from "./txfees/v1beta1/query";
import * as _243 from "./valset-pref/v1beta1/query";
import * as _244 from "./valset-pref/v1beta1/state";
import * as _245 from "./valset-pref/v1beta1/tx";
import * as _419 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _420 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _421 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _422 from "./gamm/pool-models/stableswap/tx.amino";
import * as _423 from "./gamm/v1beta1/tx.amino";
import * as _424 from "./incentives/tx.amino";
import * as _425 from "./lockup/tx.amino";
import * as _426 from "./poolmanager/v1beta1/tx.amino";
import * as _427 from "./protorev/v1beta1/tx.amino";
import * as _428 from "./superfluid/tx.amino";
import * as _429 from "./tokenfactory/v1beta1/tx.amino";
import * as _430 from "./valset-pref/v1beta1/tx.amino";
import * as _431 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _432 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _433 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _434 from "./gamm/pool-models/stableswap/tx.registry";
import * as _435 from "./gamm/v1beta1/tx.registry";
import * as _436 from "./incentives/tx.registry";
import * as _437 from "./lockup/tx.registry";
import * as _438 from "./poolmanager/v1beta1/tx.registry";
import * as _439 from "./protorev/v1beta1/tx.registry";
import * as _440 from "./superfluid/tx.registry";
import * as _441 from "./tokenfactory/v1beta1/tx.registry";
import * as _442 from "./valset-pref/v1beta1/tx.registry";
import * as _443 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _444 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _445 from "./gamm/v1beta1/query.rpc.Query";
import * as _446 from "./incentives/query.rpc.Query";
import * as _447 from "./lockup/query.rpc.Query";
import * as _448 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _449 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _450 from "./protorev/v1beta1/query.rpc.Query";
import * as _451 from "./superfluid/query.rpc.Query";
import * as _452 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _453 from "./txfees/v1beta1/query.rpc.Query";
import * as _454 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _455 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _456 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _457 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _458 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _459 from "./gamm/v1beta1/tx.rpc.msg";
import * as _460 from "./incentives/tx.rpc.msg";
import * as _461 from "./lockup/tx.rpc.msg";
import * as _462 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _463 from "./protorev/v1beta1/tx.rpc.msg";
import * as _464 from "./superfluid/tx.rpc.msg";
import * as _465 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _466 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _519 from "./rpc.query";
import * as _520 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._177
    };
  }
  export const concentratedliquidity = {
    ..._178,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._419,
          ..._431,
          ..._455
        }
      }
    },
    v1beta1: {
      ..._420,
      ..._432,
      ..._443,
      ..._456
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._179,
      ..._180,
      ..._181,
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._186,
      ..._187,
      ..._188,
      ..._189,
      ..._190,
      ..._444
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._191,
      ..._192,
      ..._193,
      ..._194,
      ..._195,
      ..._196,
      ..._423,
      ..._435,
      ..._445,
      ..._459
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._197,
          ..._421,
          ..._433,
          ..._457
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._198,
          ..._199,
          ..._422,
          ..._434,
          ..._458
        };
      }
    }
  }
  export const incentives = {
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._206,
    ..._424,
    ..._436,
    ..._446,
    ..._460
  };
  export const lockup = {
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._211,
    ..._425,
    ..._437,
    ..._447,
    ..._461
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._212,
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._448
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._217,
      ..._218,
      ..._219,
      ..._220,
      ..._221,
      ..._222,
      ..._426,
      ..._438,
      ..._449,
      ..._462
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._223,
      ..._224,
      ..._225,
      ..._226,
      ..._227,
      ..._228,
      ..._427,
      ..._439,
      ..._450,
      ..._463
    };
  }
  export const superfluid = {
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._428,
    ..._440,
    ..._451,
    ..._464
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._429,
      ..._441,
      ..._452,
      ..._465
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._453
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._243,
      ..._244,
      ..._245,
      ..._430,
      ..._442,
      ..._454,
      ..._466
    };
  }
  export const ClientFactory = {
    ..._519,
    ..._520
  };
}