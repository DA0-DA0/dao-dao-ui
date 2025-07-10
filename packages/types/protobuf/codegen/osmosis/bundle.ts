import * as _247 from "./accum/v1beta1/accum";
import * as _248 from "./concentratedliquidity/params";
import * as _249 from "./cosmwasmpool/v1beta1/genesis";
import * as _250 from "./cosmwasmpool/v1beta1/gov";
import * as _251 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _252 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _253 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _254 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _255 from "./cosmwasmpool/v1beta1/model/pool";
import * as _256 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _257 from "./cosmwasmpool/v1beta1/model/tx";
import * as _258 from "./cosmwasmpool/v1beta1/params";
import * as _259 from "./cosmwasmpool/v1beta1/query";
import * as _260 from "./cosmwasmpool/v1beta1/tx";
import * as _261 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _262 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _263 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _264 from "./gamm/v1beta1/balancerPool";
import * as _265 from "./gamm/v1beta1/genesis";
import * as _266 from "./gamm/v1beta1/gov";
import * as _267 from "./gamm/v1beta1/params";
import * as _268 from "./gamm/v1beta1/query";
import * as _269 from "./gamm/v1beta1/shared";
import * as _270 from "./gamm/v1beta1/tx";
import * as _271 from "./incentives/gauge";
import * as _272 from "./incentives/genesis";
import * as _273 from "./incentives/gov";
import * as _274 from "./incentives/group";
import * as _275 from "./incentives/params";
import * as _276 from "./incentives/query";
import * as _277 from "./incentives/tx";
import * as _278 from "./lockup/genesis";
import * as _279 from "./lockup/lock";
import * as _280 from "./lockup/params";
import * as _281 from "./lockup/query";
import * as _282 from "./lockup/tx";
import * as _283 from "./poolincentives/v1beta1/genesis";
import * as _284 from "./poolincentives/v1beta1/gov";
import * as _285 from "./poolincentives/v1beta1/incentives";
import * as _286 from "./poolincentives/v1beta1/query";
import * as _287 from "./poolincentives/v1beta1/shared";
import * as _288 from "./poolmanager/v1beta1/genesis";
import * as _289 from "./poolmanager/v1beta1/gov";
import * as _290 from "./poolmanager/v1beta1/module_route";
import * as _291 from "./poolmanager/v1beta1/query";
import * as _292 from "./poolmanager/v1beta1/swap_route";
import * as _293 from "./poolmanager/v1beta1/taker_fee_share";
import * as _294 from "./poolmanager/v1beta1/tracked_volume";
import * as _295 from "./poolmanager/v1beta1/tx";
import * as _296 from "./protorev/v1beta1/genesis";
import * as _297 from "./protorev/v1beta1/gov";
import * as _298 from "./protorev/v1beta1/params";
import * as _299 from "./protorev/v1beta1/protorev";
import * as _300 from "./protorev/v1beta1/query";
import * as _301 from "./protorev/v1beta1/tx";
import * as _302 from "./smartaccount/v1beta1/genesis";
import * as _303 from "./smartaccount/v1beta1/models";
import * as _304 from "./smartaccount/v1beta1/params";
import * as _305 from "./smartaccount/v1beta1/query";
import * as _306 from "./smartaccount/v1beta1/tx";
import * as _307 from "./superfluid/genesis";
import * as _308 from "./superfluid/params";
import * as _309 from "./superfluid/query";
import * as _310 from "./superfluid/superfluid";
import * as _311 from "./superfluid/tx";
import * as _312 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _313 from "./tokenfactory/v1beta1/genesis";
import * as _314 from "./tokenfactory/v1beta1/params";
import * as _315 from "./tokenfactory/v1beta1/query";
import * as _316 from "./tokenfactory/v1beta1/tx";
import * as _317 from "./txfees/v1beta1/feetoken";
import * as _318 from "./txfees/v1beta1/genesis";
import * as _319 from "./txfees/v1beta1/gov";
import * as _320 from "./txfees/v1beta1/params";
import * as _321 from "./txfees/v1beta1/query";
import * as _322 from "./txfees/v1beta1/tx";
import * as _323 from "./valsetpref/v1beta1/query";
import * as _324 from "./valsetpref/v1beta1/state";
import * as _325 from "./valsetpref/v1beta1/tx";
import * as _689 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _690 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _691 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _692 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _693 from "./gamm/v1beta1/tx.amino";
import * as _694 from "./incentives/tx.amino";
import * as _695 from "./lockup/tx.amino";
import * as _696 from "./poolmanager/v1beta1/tx.amino";
import * as _697 from "./protorev/v1beta1/tx.amino";
import * as _698 from "./smartaccount/v1beta1/tx.amino";
import * as _699 from "./superfluid/tx.amino";
import * as _700 from "./tokenfactory/v1beta1/tx.amino";
import * as _701 from "./txfees/v1beta1/tx.amino";
import * as _702 from "./valsetpref/v1beta1/tx.amino";
import * as _703 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _704 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _705 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _706 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _707 from "./gamm/v1beta1/tx.registry";
import * as _708 from "./incentives/tx.registry";
import * as _709 from "./lockup/tx.registry";
import * as _710 from "./poolmanager/v1beta1/tx.registry";
import * as _711 from "./protorev/v1beta1/tx.registry";
import * as _712 from "./smartaccount/v1beta1/tx.registry";
import * as _713 from "./superfluid/tx.registry";
import * as _714 from "./tokenfactory/v1beta1/tx.registry";
import * as _715 from "./txfees/v1beta1/tx.registry";
import * as _716 from "./valsetpref/v1beta1/tx.registry";
import * as _717 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _718 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _719 from "./gamm/v1beta1/query.rpc.Query";
import * as _720 from "./incentives/query.rpc.Query";
import * as _721 from "./lockup/query.rpc.Query";
import * as _722 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _723 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _724 from "./protorev/v1beta1/query.rpc.Query";
import * as _725 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _726 from "./superfluid/query.rpc.Query";
import * as _727 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _728 from "./txfees/v1beta1/query.rpc.Query";
import * as _729 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _730 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _731 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _732 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _733 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _734 from "./gamm/v1beta1/tx.rpc.msg";
import * as _735 from "./incentives/tx.rpc.msg";
import * as _736 from "./lockup/tx.rpc.msg";
import * as _737 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _738 from "./protorev/v1beta1/tx.rpc.msg";
import * as _739 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _740 from "./superfluid/tx.rpc.msg";
import * as _741 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _742 from "./txfees/v1beta1/tx.rpc.msg";
import * as _743 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _888 from "./rpc.query";
import * as _889 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._247
    };
  }
  export const concentratedliquidity = {
    ..._248,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._689,
          ..._703,
          ..._730
        }
      }
    },
    v1beta1: {
      ..._690,
      ..._704,
      ..._717,
      ..._731
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._249,
      ..._250,
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._259,
      ..._260,
      ..._718
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._261,
          ..._691,
          ..._705,
          ..._732
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._262,
          ..._263,
          ..._692,
          ..._706,
          ..._733
        };
      }
    }
    export const v1beta1 = {
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._693,
      ..._707,
      ..._719,
      ..._734
    };
  }
  export const incentives = {
    ..._271,
    ..._272,
    ..._273,
    ..._274,
    ..._275,
    ..._276,
    ..._277,
    ..._694,
    ..._708,
    ..._720,
    ..._735
  };
  export const lockup = {
    ..._278,
    ..._279,
    ..._280,
    ..._281,
    ..._282,
    ..._695,
    ..._709,
    ..._721,
    ..._736
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._283,
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._722
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._288,
      ..._289,
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._696,
      ..._710,
      ..._723,
      ..._737
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._296,
      ..._297,
      ..._298,
      ..._299,
      ..._300,
      ..._301,
      ..._697,
      ..._711,
      ..._724,
      ..._738
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._302,
      ..._303,
      ..._304,
      ..._305,
      ..._306,
      ..._698,
      ..._712,
      ..._725,
      ..._739
    };
  }
  export const superfluid = {
    ..._307,
    ..._308,
    ..._309,
    ..._310,
    ..._311,
    ..._699,
    ..._713,
    ..._726,
    ..._740
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._700,
      ..._714,
      ..._727,
      ..._741
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._317,
      ..._318,
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._701,
      ..._715,
      ..._728,
      ..._742
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._323,
      ..._324,
      ..._325,
      ..._702,
      ..._716,
      ..._729,
      ..._743
    };
  }
  export const ClientFactory = {
    ..._888,
    ..._889
  };
}