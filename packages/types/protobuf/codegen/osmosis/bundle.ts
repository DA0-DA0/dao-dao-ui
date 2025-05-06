import * as _229 from "./accum/v1beta1/accum";
import * as _230 from "./concentratedliquidity/params";
import * as _231 from "./cosmwasmpool/v1beta1/genesis";
import * as _232 from "./cosmwasmpool/v1beta1/gov";
import * as _233 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _234 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _235 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _236 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _237 from "./cosmwasmpool/v1beta1/model/pool";
import * as _238 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _239 from "./cosmwasmpool/v1beta1/model/tx";
import * as _240 from "./cosmwasmpool/v1beta1/params";
import * as _241 from "./cosmwasmpool/v1beta1/query";
import * as _242 from "./cosmwasmpool/v1beta1/tx";
import * as _243 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _244 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _245 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _246 from "./gamm/v1beta1/balancerPool";
import * as _247 from "./gamm/v1beta1/genesis";
import * as _248 from "./gamm/v1beta1/gov";
import * as _249 from "./gamm/v1beta1/params";
import * as _250 from "./gamm/v1beta1/query";
import * as _251 from "./gamm/v1beta1/shared";
import * as _252 from "./gamm/v1beta1/tx";
import * as _253 from "./incentives/gauge";
import * as _254 from "./incentives/genesis";
import * as _255 from "./incentives/gov";
import * as _256 from "./incentives/group";
import * as _257 from "./incentives/params";
import * as _258 from "./incentives/query";
import * as _259 from "./incentives/tx";
import * as _260 from "./lockup/genesis";
import * as _261 from "./lockup/lock";
import * as _262 from "./lockup/params";
import * as _263 from "./lockup/query";
import * as _264 from "./lockup/tx";
import * as _265 from "./poolincentives/v1beta1/genesis";
import * as _266 from "./poolincentives/v1beta1/gov";
import * as _267 from "./poolincentives/v1beta1/incentives";
import * as _268 from "./poolincentives/v1beta1/query";
import * as _269 from "./poolincentives/v1beta1/shared";
import * as _270 from "./poolmanager/v1beta1/genesis";
import * as _271 from "./poolmanager/v1beta1/gov";
import * as _272 from "./poolmanager/v1beta1/module_route";
import * as _273 from "./poolmanager/v1beta1/query";
import * as _274 from "./poolmanager/v1beta1/swap_route";
import * as _275 from "./poolmanager/v1beta1/taker_fee_share";
import * as _276 from "./poolmanager/v1beta1/tracked_volume";
import * as _277 from "./poolmanager/v1beta1/tx";
import * as _278 from "./protorev/v1beta1/genesis";
import * as _279 from "./protorev/v1beta1/gov";
import * as _280 from "./protorev/v1beta1/params";
import * as _281 from "./protorev/v1beta1/protorev";
import * as _282 from "./protorev/v1beta1/query";
import * as _283 from "./protorev/v1beta1/tx";
import * as _284 from "./smartaccount/v1beta1/genesis";
import * as _285 from "./smartaccount/v1beta1/models";
import * as _286 from "./smartaccount/v1beta1/params";
import * as _287 from "./smartaccount/v1beta1/query";
import * as _288 from "./smartaccount/v1beta1/tx";
import * as _289 from "./superfluid/genesis";
import * as _290 from "./superfluid/params";
import * as _291 from "./superfluid/query";
import * as _292 from "./superfluid/superfluid";
import * as _293 from "./superfluid/tx";
import * as _294 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _295 from "./tokenfactory/v1beta1/genesis";
import * as _296 from "./tokenfactory/v1beta1/params";
import * as _297 from "./tokenfactory/v1beta1/query";
import * as _298 from "./tokenfactory/v1beta1/tx";
import * as _299 from "./txfees/v1beta1/feetoken";
import * as _300 from "./txfees/v1beta1/genesis";
import * as _301 from "./txfees/v1beta1/gov";
import * as _302 from "./txfees/v1beta1/params";
import * as _303 from "./txfees/v1beta1/query";
import * as _304 from "./txfees/v1beta1/tx";
import * as _305 from "./valsetpref/v1beta1/query";
import * as _306 from "./valsetpref/v1beta1/state";
import * as _307 from "./valsetpref/v1beta1/tx";
import * as _575 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _576 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _577 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _578 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _579 from "./gamm/v1beta1/tx.amino";
import * as _580 from "./incentives/tx.amino";
import * as _581 from "./lockup/tx.amino";
import * as _582 from "./poolmanager/v1beta1/tx.amino";
import * as _583 from "./protorev/v1beta1/tx.amino";
import * as _584 from "./smartaccount/v1beta1/tx.amino";
import * as _585 from "./superfluid/tx.amino";
import * as _586 from "./tokenfactory/v1beta1/tx.amino";
import * as _587 from "./txfees/v1beta1/tx.amino";
import * as _588 from "./valsetpref/v1beta1/tx.amino";
import * as _589 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _590 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _591 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _592 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _593 from "./gamm/v1beta1/tx.registry";
import * as _594 from "./incentives/tx.registry";
import * as _595 from "./lockup/tx.registry";
import * as _596 from "./poolmanager/v1beta1/tx.registry";
import * as _597 from "./protorev/v1beta1/tx.registry";
import * as _598 from "./smartaccount/v1beta1/tx.registry";
import * as _599 from "./superfluid/tx.registry";
import * as _600 from "./tokenfactory/v1beta1/tx.registry";
import * as _601 from "./txfees/v1beta1/tx.registry";
import * as _602 from "./valsetpref/v1beta1/tx.registry";
import * as _603 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _604 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _605 from "./gamm/v1beta1/query.rpc.Query";
import * as _606 from "./incentives/query.rpc.Query";
import * as _607 from "./lockup/query.rpc.Query";
import * as _608 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _609 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _610 from "./protorev/v1beta1/query.rpc.Query";
import * as _611 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _612 from "./superfluid/query.rpc.Query";
import * as _613 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _614 from "./txfees/v1beta1/query.rpc.Query";
import * as _615 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _616 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _617 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _618 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _619 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _620 from "./gamm/v1beta1/tx.rpc.msg";
import * as _621 from "./incentives/tx.rpc.msg";
import * as _622 from "./lockup/tx.rpc.msg";
import * as _623 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _624 from "./protorev/v1beta1/tx.rpc.msg";
import * as _625 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _626 from "./superfluid/tx.rpc.msg";
import * as _627 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _628 from "./txfees/v1beta1/tx.rpc.msg";
import * as _629 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _733 from "./rpc.query";
import * as _734 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._229
    };
  }
  export const concentratedliquidity = {
    ..._230,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._575,
          ..._589,
          ..._616
        }
      }
    },
    v1beta1: {
      ..._576,
      ..._590,
      ..._603,
      ..._617
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._604
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._243,
          ..._577,
          ..._591,
          ..._618
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._244,
          ..._245,
          ..._578,
          ..._592,
          ..._619
        };
      }
    }
    export const v1beta1 = {
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._579,
      ..._593,
      ..._605,
      ..._620
    };
  }
  export const incentives = {
    ..._253,
    ..._254,
    ..._255,
    ..._256,
    ..._257,
    ..._258,
    ..._259,
    ..._580,
    ..._594,
    ..._606,
    ..._621
  };
  export const lockup = {
    ..._260,
    ..._261,
    ..._262,
    ..._263,
    ..._264,
    ..._581,
    ..._595,
    ..._607,
    ..._622
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._608
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._582,
      ..._596,
      ..._609,
      ..._623
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._583,
      ..._597,
      ..._610,
      ..._624
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._584,
      ..._598,
      ..._611,
      ..._625
    };
  }
  export const superfluid = {
    ..._289,
    ..._290,
    ..._291,
    ..._292,
    ..._293,
    ..._585,
    ..._599,
    ..._612,
    ..._626
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._294,
      ..._295,
      ..._296,
      ..._297,
      ..._298,
      ..._586,
      ..._600,
      ..._613,
      ..._627
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._299,
      ..._300,
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._587,
      ..._601,
      ..._614,
      ..._628
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._305,
      ..._306,
      ..._307,
      ..._588,
      ..._602,
      ..._615,
      ..._629
    };
  }
  export const ClientFactory = {
    ..._733,
    ..._734
  };
}