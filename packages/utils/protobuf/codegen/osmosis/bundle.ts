import * as _174 from "./accum/v1beta1/accum";
import * as _175 from "./concentratedliquidity/params";
import * as _176 from "./cosmwasmpool/v1beta1/genesis";
import * as _177 from "./cosmwasmpool/v1beta1/gov";
import * as _178 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _179 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _180 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _181 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _182 from "./cosmwasmpool/v1beta1/model/pool";
import * as _183 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _184 from "./cosmwasmpool/v1beta1/model/tx";
import * as _185 from "./cosmwasmpool/v1beta1/params";
import * as _186 from "./cosmwasmpool/v1beta1/query";
import * as _187 from "./cosmwasmpool/v1beta1/tx";
import * as _188 from "./gamm/pool-models/balancer/balancerPool";
import * as _189 from "./gamm/v1beta1/genesis";
import * as _190 from "./gamm/v1beta1/gov";
import * as _191 from "./gamm/v1beta1/query";
import * as _192 from "./gamm/v1beta1/shared";
import * as _193 from "./gamm/v1beta1/tx";
import * as _194 from "./gamm/pool-models/balancer/tx/tx";
import * as _195 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _196 from "./gamm/pool-models/stableswap/tx";
import * as _197 from "./incentives/gauge";
import * as _198 from "./incentives/genesis";
import * as _199 from "./incentives/gov";
import * as _200 from "./incentives/group";
import * as _201 from "./incentives/params";
import * as _202 from "./incentives/query";
import * as _203 from "./incentives/tx";
import * as _204 from "./lockup/genesis";
import * as _205 from "./lockup/lock";
import * as _206 from "./lockup/params";
import * as _207 from "./lockup/query";
import * as _208 from "./lockup/tx";
import * as _209 from "./pool-incentives/v1beta1/genesis";
import * as _210 from "./pool-incentives/v1beta1/gov";
import * as _211 from "./pool-incentives/v1beta1/incentives";
import * as _212 from "./pool-incentives/v1beta1/query";
import * as _213 from "./pool-incentives/v1beta1/shared";
import * as _214 from "./poolmanager/v1beta1/genesis";
import * as _215 from "./poolmanager/v1beta1/gov";
import * as _216 from "./poolmanager/v1beta1/module_route";
import * as _217 from "./poolmanager/v1beta1/query";
import * as _218 from "./poolmanager/v1beta1/swap_route";
import * as _219 from "./poolmanager/v1beta1/tx";
import * as _220 from "./protorev/v1beta1/genesis";
import * as _221 from "./protorev/v1beta1/gov";
import * as _222 from "./protorev/v1beta1/params";
import * as _223 from "./protorev/v1beta1/protorev";
import * as _224 from "./protorev/v1beta1/query";
import * as _225 from "./protorev/v1beta1/tx";
import * as _226 from "./superfluid/genesis";
import * as _227 from "./superfluid/params";
import * as _228 from "./superfluid/query";
import * as _229 from "./superfluid/superfluid";
import * as _230 from "./superfluid/tx";
import * as _231 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _232 from "./tokenfactory/v1beta1/genesis";
import * as _233 from "./tokenfactory/v1beta1/params";
import * as _234 from "./tokenfactory/v1beta1/query";
import * as _235 from "./tokenfactory/v1beta1/tx";
import * as _236 from "./txfees/v1beta1/feetoken";
import * as _237 from "./txfees/v1beta1/genesis";
import * as _238 from "./txfees/v1beta1/gov";
import * as _239 from "./txfees/v1beta1/query";
import * as _240 from "./valset-pref/v1beta1/query";
import * as _241 from "./valset-pref/v1beta1/state";
import * as _242 from "./valset-pref/v1beta1/tx";
import * as _412 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _413 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _414 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _415 from "./gamm/pool-models/stableswap/tx.amino";
import * as _416 from "./gamm/v1beta1/tx.amino";
import * as _417 from "./incentives/tx.amino";
import * as _418 from "./lockup/tx.amino";
import * as _419 from "./poolmanager/v1beta1/tx.amino";
import * as _420 from "./protorev/v1beta1/tx.amino";
import * as _421 from "./superfluid/tx.amino";
import * as _422 from "./tokenfactory/v1beta1/tx.amino";
import * as _423 from "./valset-pref/v1beta1/tx.amino";
import * as _424 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _425 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _426 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _427 from "./gamm/pool-models/stableswap/tx.registry";
import * as _428 from "./gamm/v1beta1/tx.registry";
import * as _429 from "./incentives/tx.registry";
import * as _430 from "./lockup/tx.registry";
import * as _431 from "./poolmanager/v1beta1/tx.registry";
import * as _432 from "./protorev/v1beta1/tx.registry";
import * as _433 from "./superfluid/tx.registry";
import * as _434 from "./tokenfactory/v1beta1/tx.registry";
import * as _435 from "./valset-pref/v1beta1/tx.registry";
import * as _436 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _437 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _438 from "./gamm/v1beta1/query.rpc.Query";
import * as _439 from "./incentives/query.rpc.Query";
import * as _440 from "./lockup/query.rpc.Query";
import * as _441 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _442 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _443 from "./protorev/v1beta1/query.rpc.Query";
import * as _444 from "./superfluid/query.rpc.Query";
import * as _445 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _446 from "./txfees/v1beta1/query.rpc.Query";
import * as _447 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _448 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _449 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _450 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _451 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _452 from "./gamm/v1beta1/tx.rpc.msg";
import * as _453 from "./incentives/tx.rpc.msg";
import * as _454 from "./lockup/tx.rpc.msg";
import * as _455 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _456 from "./protorev/v1beta1/tx.rpc.msg";
import * as _457 from "./superfluid/tx.rpc.msg";
import * as _458 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _459 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _512 from "./rpc.query";
import * as _513 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._174
    };
  }
  export const concentratedliquidity = {
    ..._175,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._412,
          ..._424,
          ..._448
        }
      }
    },
    v1beta1: {
      ..._413,
      ..._425,
      ..._436,
      ..._449
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._176,
      ..._177,
      ..._178,
      ..._179,
      ..._180,
      ..._181,
      ..._182,
      ..._183,
      ..._184,
      ..._185,
      ..._186,
      ..._187,
      ..._437
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._188,
      ..._189,
      ..._190,
      ..._191,
      ..._192,
      ..._193,
      ..._416,
      ..._428,
      ..._438,
      ..._452
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._194,
          ..._414,
          ..._426,
          ..._450
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._195,
          ..._196,
          ..._415,
          ..._427,
          ..._451
        };
      }
    }
  }
  export const incentives = {
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._417,
    ..._429,
    ..._439,
    ..._453
  };
  export const lockup = {
    ..._204,
    ..._205,
    ..._206,
    ..._207,
    ..._208,
    ..._418,
    ..._430,
    ..._440,
    ..._454
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._209,
      ..._210,
      ..._211,
      ..._212,
      ..._213,
      ..._441
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._219,
      ..._419,
      ..._431,
      ..._442,
      ..._455
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._225,
      ..._420,
      ..._432,
      ..._443,
      ..._456
    };
  }
  export const superfluid = {
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._230,
    ..._421,
    ..._433,
    ..._444,
    ..._457
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._422,
      ..._434,
      ..._445,
      ..._458
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._446
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._240,
      ..._241,
      ..._242,
      ..._423,
      ..._435,
      ..._447,
      ..._459
    };
  }
  export const ClientFactory = {
    ..._512,
    ..._513
  };
}