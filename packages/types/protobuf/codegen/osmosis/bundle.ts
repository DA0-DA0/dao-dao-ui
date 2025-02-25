import * as _225 from "./accum/v1beta1/accum";
import * as _226 from "./concentratedliquidity/params";
import * as _227 from "./cosmwasmpool/v1beta1/genesis";
import * as _228 from "./cosmwasmpool/v1beta1/gov";
import * as _229 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _230 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _231 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _232 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _233 from "./cosmwasmpool/v1beta1/model/pool";
import * as _234 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _235 from "./cosmwasmpool/v1beta1/model/tx";
import * as _236 from "./cosmwasmpool/v1beta1/params";
import * as _237 from "./cosmwasmpool/v1beta1/query";
import * as _238 from "./cosmwasmpool/v1beta1/tx";
import * as _239 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _240 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _241 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _242 from "./gamm/v1beta1/balancerPool";
import * as _243 from "./gamm/v1beta1/genesis";
import * as _244 from "./gamm/v1beta1/gov";
import * as _245 from "./gamm/v1beta1/params";
import * as _246 from "./gamm/v1beta1/query";
import * as _247 from "./gamm/v1beta1/shared";
import * as _248 from "./gamm/v1beta1/tx";
import * as _249 from "./incentives/gauge";
import * as _250 from "./incentives/genesis";
import * as _251 from "./incentives/gov";
import * as _252 from "./incentives/group";
import * as _253 from "./incentives/params";
import * as _254 from "./incentives/query";
import * as _255 from "./incentives/tx";
import * as _256 from "./lockup/genesis";
import * as _257 from "./lockup/lock";
import * as _258 from "./lockup/params";
import * as _259 from "./lockup/query";
import * as _260 from "./lockup/tx";
import * as _261 from "./poolincentives/v1beta1/genesis";
import * as _262 from "./poolincentives/v1beta1/gov";
import * as _263 from "./poolincentives/v1beta1/incentives";
import * as _264 from "./poolincentives/v1beta1/query";
import * as _265 from "./poolincentives/v1beta1/shared";
import * as _266 from "./poolmanager/v1beta1/genesis";
import * as _267 from "./poolmanager/v1beta1/gov";
import * as _268 from "./poolmanager/v1beta1/module_route";
import * as _269 from "./poolmanager/v1beta1/query";
import * as _270 from "./poolmanager/v1beta1/swap_route";
import * as _271 from "./poolmanager/v1beta1/taker_fee_share";
import * as _272 from "./poolmanager/v1beta1/tracked_volume";
import * as _273 from "./poolmanager/v1beta1/tx";
import * as _274 from "./protorev/v1beta1/genesis";
import * as _275 from "./protorev/v1beta1/gov";
import * as _276 from "./protorev/v1beta1/params";
import * as _277 from "./protorev/v1beta1/protorev";
import * as _278 from "./protorev/v1beta1/query";
import * as _279 from "./protorev/v1beta1/tx";
import * as _280 from "./smartaccount/v1beta1/genesis";
import * as _281 from "./smartaccount/v1beta1/models";
import * as _282 from "./smartaccount/v1beta1/params";
import * as _283 from "./smartaccount/v1beta1/query";
import * as _284 from "./smartaccount/v1beta1/tx";
import * as _285 from "./superfluid/genesis";
import * as _286 from "./superfluid/params";
import * as _287 from "./superfluid/query";
import * as _288 from "./superfluid/superfluid";
import * as _289 from "./superfluid/tx";
import * as _290 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _291 from "./tokenfactory/v1beta1/genesis";
import * as _292 from "./tokenfactory/v1beta1/params";
import * as _293 from "./tokenfactory/v1beta1/query";
import * as _294 from "./tokenfactory/v1beta1/tx";
import * as _295 from "./txfees/v1beta1/feetoken";
import * as _296 from "./txfees/v1beta1/genesis";
import * as _297 from "./txfees/v1beta1/gov";
import * as _298 from "./txfees/v1beta1/params";
import * as _299 from "./txfees/v1beta1/query";
import * as _300 from "./txfees/v1beta1/tx";
import * as _301 from "./valsetpref/v1beta1/query";
import * as _302 from "./valsetpref/v1beta1/state";
import * as _303 from "./valsetpref/v1beta1/tx";
import * as _571 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _572 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _573 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _574 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _575 from "./gamm/v1beta1/tx.amino";
import * as _576 from "./incentives/tx.amino";
import * as _577 from "./lockup/tx.amino";
import * as _578 from "./poolmanager/v1beta1/tx.amino";
import * as _579 from "./protorev/v1beta1/tx.amino";
import * as _580 from "./smartaccount/v1beta1/tx.amino";
import * as _581 from "./superfluid/tx.amino";
import * as _582 from "./tokenfactory/v1beta1/tx.amino";
import * as _583 from "./txfees/v1beta1/tx.amino";
import * as _584 from "./valsetpref/v1beta1/tx.amino";
import * as _585 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _586 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _587 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _588 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _589 from "./gamm/v1beta1/tx.registry";
import * as _590 from "./incentives/tx.registry";
import * as _591 from "./lockup/tx.registry";
import * as _592 from "./poolmanager/v1beta1/tx.registry";
import * as _593 from "./protorev/v1beta1/tx.registry";
import * as _594 from "./smartaccount/v1beta1/tx.registry";
import * as _595 from "./superfluid/tx.registry";
import * as _596 from "./tokenfactory/v1beta1/tx.registry";
import * as _597 from "./txfees/v1beta1/tx.registry";
import * as _598 from "./valsetpref/v1beta1/tx.registry";
import * as _599 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _600 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _601 from "./gamm/v1beta1/query.rpc.Query";
import * as _602 from "./incentives/query.rpc.Query";
import * as _603 from "./lockup/query.rpc.Query";
import * as _604 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _605 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _606 from "./protorev/v1beta1/query.rpc.Query";
import * as _607 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _608 from "./superfluid/query.rpc.Query";
import * as _609 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _610 from "./txfees/v1beta1/query.rpc.Query";
import * as _611 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _612 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _613 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _614 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _615 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _616 from "./gamm/v1beta1/tx.rpc.msg";
import * as _617 from "./incentives/tx.rpc.msg";
import * as _618 from "./lockup/tx.rpc.msg";
import * as _619 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _620 from "./protorev/v1beta1/tx.rpc.msg";
import * as _621 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _622 from "./superfluid/tx.rpc.msg";
import * as _623 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _624 from "./txfees/v1beta1/tx.rpc.msg";
import * as _625 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _729 from "./rpc.query";
import * as _730 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._225
    };
  }
  export const concentratedliquidity = {
    ..._226,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._571,
          ..._585,
          ..._612
        }
      }
    },
    v1beta1: {
      ..._572,
      ..._586,
      ..._599,
      ..._613
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._238,
      ..._600
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._239,
          ..._573,
          ..._587,
          ..._614
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._240,
          ..._241,
          ..._574,
          ..._588,
          ..._615
        };
      }
    }
    export const v1beta1 = {
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._575,
      ..._589,
      ..._601,
      ..._616
    };
  }
  export const incentives = {
    ..._249,
    ..._250,
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._255,
    ..._576,
    ..._590,
    ..._602,
    ..._617
  };
  export const lockup = {
    ..._256,
    ..._257,
    ..._258,
    ..._259,
    ..._260,
    ..._577,
    ..._591,
    ..._603,
    ..._618
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._604
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._273,
      ..._578,
      ..._592,
      ..._605,
      ..._619
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._579,
      ..._593,
      ..._606,
      ..._620
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._580,
      ..._594,
      ..._607,
      ..._621
    };
  }
  export const superfluid = {
    ..._285,
    ..._286,
    ..._287,
    ..._288,
    ..._289,
    ..._581,
    ..._595,
    ..._608,
    ..._622
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._582,
      ..._596,
      ..._609,
      ..._623
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._295,
      ..._296,
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._583,
      ..._597,
      ..._610,
      ..._624
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._301,
      ..._302,
      ..._303,
      ..._584,
      ..._598,
      ..._611,
      ..._625
    };
  }
  export const ClientFactory = {
    ..._729,
    ..._730
  };
}