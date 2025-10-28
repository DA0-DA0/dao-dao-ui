import * as _256 from "./accum/v1beta1/accum";
import * as _257 from "./concentratedliquidity/params";
import * as _258 from "./cosmwasmpool/v1beta1/genesis";
import * as _259 from "./cosmwasmpool/v1beta1/gov";
import * as _260 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _261 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _262 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _263 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _264 from "./cosmwasmpool/v1beta1/model/pool";
import * as _265 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _266 from "./cosmwasmpool/v1beta1/model/tx";
import * as _267 from "./cosmwasmpool/v1beta1/params";
import * as _268 from "./cosmwasmpool/v1beta1/query";
import * as _269 from "./cosmwasmpool/v1beta1/tx";
import * as _270 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _271 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _272 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _273 from "./gamm/v1beta1/balancerPool";
import * as _274 from "./gamm/v1beta1/genesis";
import * as _275 from "./gamm/v1beta1/gov";
import * as _276 from "./gamm/v1beta1/params";
import * as _277 from "./gamm/v1beta1/query";
import * as _278 from "./gamm/v1beta1/shared";
import * as _279 from "./gamm/v1beta1/tx";
import * as _280 from "./incentives/gauge";
import * as _281 from "./incentives/genesis";
import * as _282 from "./incentives/gov";
import * as _283 from "./incentives/group";
import * as _284 from "./incentives/params";
import * as _285 from "./incentives/query";
import * as _286 from "./incentives/tx";
import * as _287 from "./lockup/genesis";
import * as _288 from "./lockup/lock";
import * as _289 from "./lockup/params";
import * as _290 from "./lockup/query";
import * as _291 from "./lockup/tx";
import * as _292 from "./poolincentives/v1beta1/genesis";
import * as _293 from "./poolincentives/v1beta1/gov";
import * as _294 from "./poolincentives/v1beta1/incentives";
import * as _295 from "./poolincentives/v1beta1/query";
import * as _296 from "./poolincentives/v1beta1/shared";
import * as _297 from "./poolmanager/v1beta1/genesis";
import * as _298 from "./poolmanager/v1beta1/gov";
import * as _299 from "./poolmanager/v1beta1/module_route";
import * as _300 from "./poolmanager/v1beta1/query";
import * as _301 from "./poolmanager/v1beta1/swap_route";
import * as _302 from "./poolmanager/v1beta1/taker_fee_share";
import * as _303 from "./poolmanager/v1beta1/tracked_volume";
import * as _304 from "./poolmanager/v1beta1/tx";
import * as _305 from "./protorev/v1beta1/genesis";
import * as _306 from "./protorev/v1beta1/gov";
import * as _307 from "./protorev/v1beta1/params";
import * as _308 from "./protorev/v1beta1/protorev";
import * as _309 from "./protorev/v1beta1/query";
import * as _310 from "./protorev/v1beta1/tx";
import * as _311 from "./smartaccount/v1beta1/genesis";
import * as _312 from "./smartaccount/v1beta1/models";
import * as _313 from "./smartaccount/v1beta1/params";
import * as _314 from "./smartaccount/v1beta1/query";
import * as _315 from "./smartaccount/v1beta1/tx";
import * as _316 from "./superfluid/genesis";
import * as _317 from "./superfluid/params";
import * as _318 from "./superfluid/query";
import * as _319 from "./superfluid/superfluid";
import * as _320 from "./superfluid/tx";
import * as _321 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _322 from "./tokenfactory/v1beta1/genesis";
import * as _323 from "./tokenfactory/v1beta1/params";
import * as _324 from "./tokenfactory/v1beta1/query";
import * as _325 from "./tokenfactory/v1beta1/tx";
import * as _326 from "./txfees/v1beta1/feetoken";
import * as _327 from "./txfees/v1beta1/genesis";
import * as _328 from "./txfees/v1beta1/gov";
import * as _329 from "./txfees/v1beta1/params";
import * as _330 from "./txfees/v1beta1/query";
import * as _331 from "./txfees/v1beta1/tx";
import * as _332 from "./valsetpref/v1beta1/query";
import * as _333 from "./valsetpref/v1beta1/state";
import * as _334 from "./valsetpref/v1beta1/tx";
import * as _707 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _708 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _709 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _710 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _711 from "./gamm/v1beta1/tx.amino";
import * as _712 from "./incentives/tx.amino";
import * as _713 from "./lockup/tx.amino";
import * as _714 from "./poolmanager/v1beta1/tx.amino";
import * as _715 from "./protorev/v1beta1/tx.amino";
import * as _716 from "./smartaccount/v1beta1/tx.amino";
import * as _717 from "./superfluid/tx.amino";
import * as _718 from "./tokenfactory/v1beta1/tx.amino";
import * as _719 from "./txfees/v1beta1/tx.amino";
import * as _720 from "./valsetpref/v1beta1/tx.amino";
import * as _721 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _722 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _723 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _724 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _725 from "./gamm/v1beta1/tx.registry";
import * as _726 from "./incentives/tx.registry";
import * as _727 from "./lockup/tx.registry";
import * as _728 from "./poolmanager/v1beta1/tx.registry";
import * as _729 from "./protorev/v1beta1/tx.registry";
import * as _730 from "./smartaccount/v1beta1/tx.registry";
import * as _731 from "./superfluid/tx.registry";
import * as _732 from "./tokenfactory/v1beta1/tx.registry";
import * as _733 from "./txfees/v1beta1/tx.registry";
import * as _734 from "./valsetpref/v1beta1/tx.registry";
import * as _735 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _736 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _737 from "./gamm/v1beta1/query.rpc.Query";
import * as _738 from "./incentives/query.rpc.Query";
import * as _739 from "./lockup/query.rpc.Query";
import * as _740 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _741 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _742 from "./protorev/v1beta1/query.rpc.Query";
import * as _743 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _744 from "./superfluid/query.rpc.Query";
import * as _745 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _746 from "./txfees/v1beta1/query.rpc.Query";
import * as _747 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _748 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _749 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _750 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _751 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _752 from "./gamm/v1beta1/tx.rpc.msg";
import * as _753 from "./incentives/tx.rpc.msg";
import * as _754 from "./lockup/tx.rpc.msg";
import * as _755 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _756 from "./protorev/v1beta1/tx.rpc.msg";
import * as _757 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _758 from "./superfluid/tx.rpc.msg";
import * as _759 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _760 from "./txfees/v1beta1/tx.rpc.msg";
import * as _761 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _910 from "./rpc.query";
import * as _911 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._256
    };
  }
  export const concentratedliquidity = {
    ..._257,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._707,
          ..._721,
          ..._748
        }
      }
    },
    v1beta1: {
      ..._708,
      ..._722,
      ..._735,
      ..._749
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._258,
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._736
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._270,
          ..._709,
          ..._723,
          ..._750
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._271,
          ..._272,
          ..._710,
          ..._724,
          ..._751
        };
      }
    }
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._279,
      ..._711,
      ..._725,
      ..._737,
      ..._752
    };
  }
  export const incentives = {
    ..._280,
    ..._281,
    ..._282,
    ..._283,
    ..._284,
    ..._285,
    ..._286,
    ..._712,
    ..._726,
    ..._738,
    ..._753
  };
  export const lockup = {
    ..._287,
    ..._288,
    ..._289,
    ..._290,
    ..._291,
    ..._713,
    ..._727,
    ..._739,
    ..._754
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._296,
      ..._740
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._714,
      ..._728,
      ..._741,
      ..._755
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._305,
      ..._306,
      ..._307,
      ..._308,
      ..._309,
      ..._310,
      ..._715,
      ..._729,
      ..._742,
      ..._756
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._311,
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._716,
      ..._730,
      ..._743,
      ..._757
    };
  }
  export const superfluid = {
    ..._316,
    ..._317,
    ..._318,
    ..._319,
    ..._320,
    ..._717,
    ..._731,
    ..._744,
    ..._758
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._321,
      ..._322,
      ..._323,
      ..._324,
      ..._325,
      ..._718,
      ..._732,
      ..._745,
      ..._759
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._330,
      ..._331,
      ..._719,
      ..._733,
      ..._746,
      ..._760
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._332,
      ..._333,
      ..._334,
      ..._720,
      ..._734,
      ..._747,
      ..._761
    };
  }
  export const ClientFactory = {
    ..._910,
    ..._911
  };
}