import * as _218 from "./accum/v1beta1/accum";
import * as _219 from "./concentratedliquidity/params";
import * as _220 from "./cosmwasmpool/v1beta1/genesis";
import * as _221 from "./cosmwasmpool/v1beta1/gov";
import * as _222 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _223 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _224 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _225 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _226 from "./cosmwasmpool/v1beta1/model/pool";
import * as _227 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _228 from "./cosmwasmpool/v1beta1/model/tx";
import * as _229 from "./cosmwasmpool/v1beta1/params";
import * as _230 from "./cosmwasmpool/v1beta1/query";
import * as _231 from "./cosmwasmpool/v1beta1/tx";
import * as _232 from "./gamm/pool-models/balancer/balancerPool";
import * as _233 from "./gamm/v1beta1/genesis";
import * as _234 from "./gamm/v1beta1/gov";
import * as _235 from "./gamm/v1beta1/query";
import * as _236 from "./gamm/v1beta1/shared";
import * as _237 from "./gamm/v1beta1/tx";
import * as _238 from "./gamm/pool-models/balancer/tx/tx";
import * as _239 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _240 from "./gamm/pool-models/stableswap/tx";
import * as _241 from "./incentives/gauge";
import * as _242 from "./incentives/genesis";
import * as _243 from "./incentives/gov";
import * as _244 from "./incentives/group";
import * as _245 from "./incentives/params";
import * as _246 from "./incentives/query";
import * as _247 from "./incentives/tx";
import * as _248 from "./lockup/genesis";
import * as _249 from "./lockup/lock";
import * as _250 from "./lockup/params";
import * as _251 from "./lockup/query";
import * as _252 from "./lockup/tx";
import * as _253 from "./pool-incentives/v1beta1/genesis";
import * as _254 from "./pool-incentives/v1beta1/gov";
import * as _255 from "./pool-incentives/v1beta1/incentives";
import * as _256 from "./pool-incentives/v1beta1/query";
import * as _257 from "./pool-incentives/v1beta1/shared";
import * as _258 from "./poolmanager/v1beta1/genesis";
import * as _259 from "./poolmanager/v1beta1/gov";
import * as _260 from "./poolmanager/v1beta1/module_route";
import * as _261 from "./poolmanager/v1beta1/query";
import * as _262 from "./poolmanager/v1beta1/swap_route";
import * as _263 from "./poolmanager/v1beta1/tx";
import * as _264 from "./protorev/v1beta1/genesis";
import * as _265 from "./protorev/v1beta1/gov";
import * as _266 from "./protorev/v1beta1/params";
import * as _267 from "./protorev/v1beta1/protorev";
import * as _268 from "./protorev/v1beta1/query";
import * as _269 from "./protorev/v1beta1/tx";
import * as _270 from "./smartaccount/v1beta1/genesis";
import * as _271 from "./smartaccount/v1beta1/models";
import * as _272 from "./smartaccount/v1beta1/params";
import * as _273 from "./smartaccount/v1beta1/query";
import * as _274 from "./smartaccount/v1beta1/tx";
import * as _275 from "./superfluid/genesis";
import * as _276 from "./superfluid/params";
import * as _277 from "./superfluid/query";
import * as _278 from "./superfluid/superfluid";
import * as _279 from "./superfluid/tx";
import * as _280 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _281 from "./tokenfactory/v1beta1/genesis";
import * as _282 from "./tokenfactory/v1beta1/params";
import * as _283 from "./tokenfactory/v1beta1/query";
import * as _284 from "./tokenfactory/v1beta1/tx";
import * as _285 from "./txfees/v1beta1/feetoken";
import * as _286 from "./txfees/v1beta1/genesis";
import * as _287 from "./txfees/v1beta1/gov";
import * as _288 from "./txfees/v1beta1/params";
import * as _289 from "./txfees/v1beta1/query";
import * as _290 from "./txfees/v1beta1/tx";
import * as _291 from "./valset-pref/v1beta1/query";
import * as _292 from "./valset-pref/v1beta1/state";
import * as _293 from "./valset-pref/v1beta1/tx";
import * as _534 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _535 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _536 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _537 from "./gamm/pool-models/stableswap/tx.amino";
import * as _538 from "./gamm/v1beta1/tx.amino";
import * as _539 from "./incentives/tx.amino";
import * as _540 from "./lockup/tx.amino";
import * as _541 from "./poolmanager/v1beta1/tx.amino";
import * as _542 from "./protorev/v1beta1/tx.amino";
import * as _543 from "./smartaccount/v1beta1/tx.amino";
import * as _544 from "./superfluid/tx.amino";
import * as _545 from "./tokenfactory/v1beta1/tx.amino";
import * as _546 from "./txfees/v1beta1/tx.amino";
import * as _547 from "./valset-pref/v1beta1/tx.amino";
import * as _548 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _549 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _550 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _551 from "./gamm/pool-models/stableswap/tx.registry";
import * as _552 from "./gamm/v1beta1/tx.registry";
import * as _553 from "./incentives/tx.registry";
import * as _554 from "./lockup/tx.registry";
import * as _555 from "./poolmanager/v1beta1/tx.registry";
import * as _556 from "./protorev/v1beta1/tx.registry";
import * as _557 from "./smartaccount/v1beta1/tx.registry";
import * as _558 from "./superfluid/tx.registry";
import * as _559 from "./tokenfactory/v1beta1/tx.registry";
import * as _560 from "./txfees/v1beta1/tx.registry";
import * as _561 from "./valset-pref/v1beta1/tx.registry";
import * as _562 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _563 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _564 from "./gamm/v1beta1/query.rpc.Query";
import * as _565 from "./incentives/query.rpc.Query";
import * as _566 from "./lockup/query.rpc.Query";
import * as _567 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _568 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _569 from "./protorev/v1beta1/query.rpc.Query";
import * as _570 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _571 from "./superfluid/query.rpc.Query";
import * as _572 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _573 from "./txfees/v1beta1/query.rpc.Query";
import * as _574 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _575 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _576 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _577 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _578 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _579 from "./gamm/v1beta1/tx.rpc.msg";
import * as _580 from "./incentives/tx.rpc.msg";
import * as _581 from "./lockup/tx.rpc.msg";
import * as _582 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _583 from "./protorev/v1beta1/tx.rpc.msg";
import * as _584 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _585 from "./superfluid/tx.rpc.msg";
import * as _586 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _587 from "./txfees/v1beta1/tx.rpc.msg";
import * as _588 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _679 from "./rpc.query";
import * as _680 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._218
    };
  }
  export const concentratedliquidity = {
    ..._219,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._534,
          ..._548,
          ..._575
        }
      }
    },
    v1beta1: {
      ..._535,
      ..._549,
      ..._562,
      ..._576
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._225,
      ..._226,
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._231,
      ..._563
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._538,
      ..._552,
      ..._564,
      ..._579
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._238,
          ..._536,
          ..._550,
          ..._577
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._239,
          ..._240,
          ..._537,
          ..._551,
          ..._578
        };
      }
    }
  }
  export const incentives = {
    ..._241,
    ..._242,
    ..._243,
    ..._244,
    ..._245,
    ..._246,
    ..._247,
    ..._539,
    ..._553,
    ..._565,
    ..._580
  };
  export const lockup = {
    ..._248,
    ..._249,
    ..._250,
    ..._251,
    ..._252,
    ..._540,
    ..._554,
    ..._566,
    ..._581
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._257,
      ..._567
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._541,
      ..._555,
      ..._568,
      ..._582
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._542,
      ..._556,
      ..._569,
      ..._583
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._274,
      ..._543,
      ..._557,
      ..._570,
      ..._584
    };
  }
  export const superfluid = {
    ..._275,
    ..._276,
    ..._277,
    ..._278,
    ..._279,
    ..._544,
    ..._558,
    ..._571,
    ..._585
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._545,
      ..._559,
      ..._572,
      ..._586
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._546,
      ..._560,
      ..._573,
      ..._587
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._291,
      ..._292,
      ..._293,
      ..._547,
      ..._561,
      ..._574,
      ..._588
    };
  }
  export const ClientFactory = {
    ..._679,
    ..._680
  };
}