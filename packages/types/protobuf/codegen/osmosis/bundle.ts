import * as _219 from "./accum/v1beta1/accum";
import * as _220 from "./concentratedliquidity/params";
import * as _221 from "./cosmwasmpool/v1beta1/genesis";
import * as _222 from "./cosmwasmpool/v1beta1/gov";
import * as _223 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _224 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _225 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _226 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _227 from "./cosmwasmpool/v1beta1/model/pool";
import * as _228 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _229 from "./cosmwasmpool/v1beta1/model/tx";
import * as _230 from "./cosmwasmpool/v1beta1/params";
import * as _231 from "./cosmwasmpool/v1beta1/query";
import * as _232 from "./cosmwasmpool/v1beta1/tx";
import * as _233 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _234 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _235 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _236 from "./gamm/v1beta1/balancerPool";
import * as _237 from "./gamm/v1beta1/genesis";
import * as _238 from "./gamm/v1beta1/gov";
import * as _239 from "./gamm/v1beta1/params";
import * as _240 from "./gamm/v1beta1/query";
import * as _241 from "./gamm/v1beta1/shared";
import * as _242 from "./gamm/v1beta1/tx";
import * as _243 from "./incentives/gauge";
import * as _244 from "./incentives/genesis";
import * as _245 from "./incentives/gov";
import * as _246 from "./incentives/group";
import * as _247 from "./incentives/params";
import * as _248 from "./incentives/query";
import * as _249 from "./incentives/tx";
import * as _250 from "./lockup/genesis";
import * as _251 from "./lockup/lock";
import * as _252 from "./lockup/params";
import * as _253 from "./lockup/query";
import * as _254 from "./lockup/tx";
import * as _255 from "./poolincentives/v1beta1/genesis";
import * as _256 from "./poolincentives/v1beta1/gov";
import * as _257 from "./poolincentives/v1beta1/incentives";
import * as _258 from "./poolincentives/v1beta1/query";
import * as _259 from "./poolincentives/v1beta1/shared";
import * as _260 from "./poolmanager/v1beta1/genesis";
import * as _261 from "./poolmanager/v1beta1/gov";
import * as _262 from "./poolmanager/v1beta1/module_route";
import * as _263 from "./poolmanager/v1beta1/query";
import * as _264 from "./poolmanager/v1beta1/swap_route";
import * as _265 from "./poolmanager/v1beta1/taker_fee_share";
import * as _266 from "./poolmanager/v1beta1/tracked_volume";
import * as _267 from "./poolmanager/v1beta1/tx";
import * as _268 from "./protorev/v1beta1/genesis";
import * as _269 from "./protorev/v1beta1/gov";
import * as _270 from "./protorev/v1beta1/params";
import * as _271 from "./protorev/v1beta1/protorev";
import * as _272 from "./protorev/v1beta1/query";
import * as _273 from "./protorev/v1beta1/tx";
import * as _274 from "./smartaccount/v1beta1/genesis";
import * as _275 from "./smartaccount/v1beta1/models";
import * as _276 from "./smartaccount/v1beta1/params";
import * as _277 from "./smartaccount/v1beta1/query";
import * as _278 from "./smartaccount/v1beta1/tx";
import * as _279 from "./superfluid/genesis";
import * as _280 from "./superfluid/params";
import * as _281 from "./superfluid/query";
import * as _282 from "./superfluid/superfluid";
import * as _283 from "./superfluid/tx";
import * as _284 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _285 from "./tokenfactory/v1beta1/genesis";
import * as _286 from "./tokenfactory/v1beta1/params";
import * as _287 from "./tokenfactory/v1beta1/query";
import * as _288 from "./tokenfactory/v1beta1/tx";
import * as _289 from "./txfees/v1beta1/feetoken";
import * as _290 from "./txfees/v1beta1/genesis";
import * as _291 from "./txfees/v1beta1/gov";
import * as _292 from "./txfees/v1beta1/params";
import * as _293 from "./txfees/v1beta1/query";
import * as _294 from "./txfees/v1beta1/tx";
import * as _295 from "./valsetpref/v1beta1/query";
import * as _296 from "./valsetpref/v1beta1/state";
import * as _297 from "./valsetpref/v1beta1/tx";
import * as _539 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _540 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _541 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _542 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _543 from "./gamm/v1beta1/tx.amino";
import * as _544 from "./incentives/tx.amino";
import * as _545 from "./lockup/tx.amino";
import * as _546 from "./poolmanager/v1beta1/tx.amino";
import * as _547 from "./protorev/v1beta1/tx.amino";
import * as _548 from "./smartaccount/v1beta1/tx.amino";
import * as _549 from "./superfluid/tx.amino";
import * as _550 from "./tokenfactory/v1beta1/tx.amino";
import * as _551 from "./txfees/v1beta1/tx.amino";
import * as _552 from "./valsetpref/v1beta1/tx.amino";
import * as _553 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _554 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _555 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _556 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _557 from "./gamm/v1beta1/tx.registry";
import * as _558 from "./incentives/tx.registry";
import * as _559 from "./lockup/tx.registry";
import * as _560 from "./poolmanager/v1beta1/tx.registry";
import * as _561 from "./protorev/v1beta1/tx.registry";
import * as _562 from "./smartaccount/v1beta1/tx.registry";
import * as _563 from "./superfluid/tx.registry";
import * as _564 from "./tokenfactory/v1beta1/tx.registry";
import * as _565 from "./txfees/v1beta1/tx.registry";
import * as _566 from "./valsetpref/v1beta1/tx.registry";
import * as _567 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _568 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _569 from "./gamm/v1beta1/query.rpc.Query";
import * as _570 from "./incentives/query.rpc.Query";
import * as _571 from "./lockup/query.rpc.Query";
import * as _572 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _573 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _574 from "./protorev/v1beta1/query.rpc.Query";
import * as _575 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _576 from "./superfluid/query.rpc.Query";
import * as _577 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _578 from "./txfees/v1beta1/query.rpc.Query";
import * as _579 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _580 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _581 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _582 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _583 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _584 from "./gamm/v1beta1/tx.rpc.msg";
import * as _585 from "./incentives/tx.rpc.msg";
import * as _586 from "./lockup/tx.rpc.msg";
import * as _587 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _588 from "./protorev/v1beta1/tx.rpc.msg";
import * as _589 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _590 from "./superfluid/tx.rpc.msg";
import * as _591 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _592 from "./txfees/v1beta1/tx.rpc.msg";
import * as _593 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _685 from "./rpc.query";
import * as _686 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._219
    };
  }
  export const concentratedliquidity = {
    ..._220,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._539,
          ..._553,
          ..._580
        }
      }
    },
    v1beta1: {
      ..._540,
      ..._554,
      ..._567,
      ..._581
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
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
      ..._232,
      ..._568
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._233,
          ..._541,
          ..._555,
          ..._582
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._234,
          ..._235,
          ..._542,
          ..._556,
          ..._583
        };
      }
    }
    export const v1beta1 = {
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._543,
      ..._557,
      ..._569,
      ..._584
    };
  }
  export const incentives = {
    ..._243,
    ..._244,
    ..._245,
    ..._246,
    ..._247,
    ..._248,
    ..._249,
    ..._544,
    ..._558,
    ..._570,
    ..._585
  };
  export const lockup = {
    ..._250,
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._545,
    ..._559,
    ..._571,
    ..._586
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._259,
      ..._572
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._546,
      ..._560,
      ..._573,
      ..._587
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._547,
      ..._561,
      ..._574,
      ..._588
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._548,
      ..._562,
      ..._575,
      ..._589
    };
  }
  export const superfluid = {
    ..._279,
    ..._280,
    ..._281,
    ..._282,
    ..._283,
    ..._549,
    ..._563,
    ..._576,
    ..._590
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._550,
      ..._564,
      ..._577,
      ..._591
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._289,
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._551,
      ..._565,
      ..._578,
      ..._592
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._295,
      ..._296,
      ..._297,
      ..._552,
      ..._566,
      ..._579,
      ..._593
    };
  }
  export const ClientFactory = {
    ..._685,
    ..._686
  };
}