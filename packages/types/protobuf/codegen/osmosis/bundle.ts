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
import * as _232 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _233 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _234 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _235 from "./gamm/v1beta1/balancerPool";
import * as _236 from "./gamm/v1beta1/genesis";
import * as _237 from "./gamm/v1beta1/gov";
import * as _238 from "./gamm/v1beta1/params";
import * as _239 from "./gamm/v1beta1/query";
import * as _240 from "./gamm/v1beta1/shared";
import * as _241 from "./gamm/v1beta1/tx";
import * as _242 from "./incentives/gauge";
import * as _243 from "./incentives/genesis";
import * as _244 from "./incentives/gov";
import * as _245 from "./incentives/group";
import * as _246 from "./incentives/params";
import * as _247 from "./incentives/query";
import * as _248 from "./incentives/tx";
import * as _249 from "./lockup/genesis";
import * as _250 from "./lockup/lock";
import * as _251 from "./lockup/params";
import * as _252 from "./lockup/query";
import * as _253 from "./lockup/tx";
import * as _254 from "./poolincentives/v1beta1/genesis";
import * as _255 from "./poolincentives/v1beta1/gov";
import * as _256 from "./poolincentives/v1beta1/incentives";
import * as _257 from "./poolincentives/v1beta1/query";
import * as _258 from "./poolincentives/v1beta1/shared";
import * as _259 from "./poolmanager/v1beta1/genesis";
import * as _260 from "./poolmanager/v1beta1/gov";
import * as _261 from "./poolmanager/v1beta1/module_route";
import * as _262 from "./poolmanager/v1beta1/query";
import * as _263 from "./poolmanager/v1beta1/swap_route";
import * as _264 from "./poolmanager/v1beta1/taker_fee_share";
import * as _265 from "./poolmanager/v1beta1/tracked_volume";
import * as _266 from "./poolmanager/v1beta1/tx";
import * as _267 from "./protorev/v1beta1/genesis";
import * as _268 from "./protorev/v1beta1/gov";
import * as _269 from "./protorev/v1beta1/params";
import * as _270 from "./protorev/v1beta1/protorev";
import * as _271 from "./protorev/v1beta1/query";
import * as _272 from "./protorev/v1beta1/tx";
import * as _273 from "./smartaccount/v1beta1/genesis";
import * as _274 from "./smartaccount/v1beta1/models";
import * as _275 from "./smartaccount/v1beta1/params";
import * as _276 from "./smartaccount/v1beta1/query";
import * as _277 from "./smartaccount/v1beta1/tx";
import * as _278 from "./superfluid/genesis";
import * as _279 from "./superfluid/params";
import * as _280 from "./superfluid/query";
import * as _281 from "./superfluid/superfluid";
import * as _282 from "./superfluid/tx";
import * as _283 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _284 from "./tokenfactory/v1beta1/genesis";
import * as _285 from "./tokenfactory/v1beta1/params";
import * as _286 from "./tokenfactory/v1beta1/query";
import * as _287 from "./tokenfactory/v1beta1/tx";
import * as _288 from "./txfees/v1beta1/feetoken";
import * as _289 from "./txfees/v1beta1/genesis";
import * as _290 from "./txfees/v1beta1/gov";
import * as _291 from "./txfees/v1beta1/params";
import * as _292 from "./txfees/v1beta1/query";
import * as _293 from "./txfees/v1beta1/tx";
import * as _294 from "./valsetpref/v1beta1/query";
import * as _295 from "./valsetpref/v1beta1/state";
import * as _296 from "./valsetpref/v1beta1/tx";
import * as _538 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _539 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _540 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _541 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _542 from "./gamm/v1beta1/tx.amino";
import * as _543 from "./incentives/tx.amino";
import * as _544 from "./lockup/tx.amino";
import * as _545 from "./poolmanager/v1beta1/tx.amino";
import * as _546 from "./protorev/v1beta1/tx.amino";
import * as _547 from "./smartaccount/v1beta1/tx.amino";
import * as _548 from "./superfluid/tx.amino";
import * as _549 from "./tokenfactory/v1beta1/tx.amino";
import * as _550 from "./txfees/v1beta1/tx.amino";
import * as _551 from "./valsetpref/v1beta1/tx.amino";
import * as _552 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _553 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _554 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _555 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _556 from "./gamm/v1beta1/tx.registry";
import * as _557 from "./incentives/tx.registry";
import * as _558 from "./lockup/tx.registry";
import * as _559 from "./poolmanager/v1beta1/tx.registry";
import * as _560 from "./protorev/v1beta1/tx.registry";
import * as _561 from "./smartaccount/v1beta1/tx.registry";
import * as _562 from "./superfluid/tx.registry";
import * as _563 from "./tokenfactory/v1beta1/tx.registry";
import * as _564 from "./txfees/v1beta1/tx.registry";
import * as _565 from "./valsetpref/v1beta1/tx.registry";
import * as _566 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _567 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _568 from "./gamm/v1beta1/query.rpc.Query";
import * as _569 from "./incentives/query.rpc.Query";
import * as _570 from "./lockup/query.rpc.Query";
import * as _571 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _572 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _573 from "./protorev/v1beta1/query.rpc.Query";
import * as _574 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _575 from "./superfluid/query.rpc.Query";
import * as _576 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _577 from "./txfees/v1beta1/query.rpc.Query";
import * as _578 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _579 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _580 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _581 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _582 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _583 from "./gamm/v1beta1/tx.rpc.msg";
import * as _584 from "./incentives/tx.rpc.msg";
import * as _585 from "./lockup/tx.rpc.msg";
import * as _586 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _587 from "./protorev/v1beta1/tx.rpc.msg";
import * as _588 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _589 from "./superfluid/tx.rpc.msg";
import * as _590 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _591 from "./txfees/v1beta1/tx.rpc.msg";
import * as _592 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _684 from "./rpc.query";
import * as _685 from "./rpc.tx";
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
          ..._538,
          ..._552,
          ..._579
        }
      }
    },
    v1beta1: {
      ..._539,
      ..._553,
      ..._566,
      ..._580
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
      ..._567
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._232,
          ..._540,
          ..._554,
          ..._581
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._233,
          ..._234,
          ..._541,
          ..._555,
          ..._582
        };
      }
    }
    export const v1beta1 = {
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._542,
      ..._556,
      ..._568,
      ..._583
    };
  }
  export const incentives = {
    ..._242,
    ..._243,
    ..._244,
    ..._245,
    ..._246,
    ..._247,
    ..._248,
    ..._543,
    ..._557,
    ..._569,
    ..._584
  };
  export const lockup = {
    ..._249,
    ..._250,
    ..._251,
    ..._252,
    ..._253,
    ..._544,
    ..._558,
    ..._570,
    ..._585
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._254,
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._571
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._545,
      ..._559,
      ..._572,
      ..._586
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._546,
      ..._560,
      ..._573,
      ..._587
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._547,
      ..._561,
      ..._574,
      ..._588
    };
  }
  export const superfluid = {
    ..._278,
    ..._279,
    ..._280,
    ..._281,
    ..._282,
    ..._548,
    ..._562,
    ..._575,
    ..._589
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._283,
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._549,
      ..._563,
      ..._576,
      ..._590
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._288,
      ..._289,
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._550,
      ..._564,
      ..._577,
      ..._591
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._294,
      ..._295,
      ..._296,
      ..._551,
      ..._565,
      ..._578,
      ..._592
    };
  }
  export const ClientFactory = {
    ..._684,
    ..._685
  };
}