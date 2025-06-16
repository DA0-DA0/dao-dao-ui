import * as _236 from "./accum/v1beta1/accum";
import * as _237 from "./concentratedliquidity/params";
import * as _238 from "./cosmwasmpool/v1beta1/genesis";
import * as _239 from "./cosmwasmpool/v1beta1/gov";
import * as _240 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _241 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _242 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _243 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _244 from "./cosmwasmpool/v1beta1/model/pool";
import * as _245 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _246 from "./cosmwasmpool/v1beta1/model/tx";
import * as _247 from "./cosmwasmpool/v1beta1/params";
import * as _248 from "./cosmwasmpool/v1beta1/query";
import * as _249 from "./cosmwasmpool/v1beta1/tx";
import * as _250 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _251 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _252 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _253 from "./gamm/v1beta1/balancerPool";
import * as _254 from "./gamm/v1beta1/genesis";
import * as _255 from "./gamm/v1beta1/gov";
import * as _256 from "./gamm/v1beta1/params";
import * as _257 from "./gamm/v1beta1/query";
import * as _258 from "./gamm/v1beta1/shared";
import * as _259 from "./gamm/v1beta1/tx";
import * as _260 from "./incentives/gauge";
import * as _261 from "./incentives/genesis";
import * as _262 from "./incentives/gov";
import * as _263 from "./incentives/group";
import * as _264 from "./incentives/params";
import * as _265 from "./incentives/query";
import * as _266 from "./incentives/tx";
import * as _267 from "./lockup/genesis";
import * as _268 from "./lockup/lock";
import * as _269 from "./lockup/params";
import * as _270 from "./lockup/query";
import * as _271 from "./lockup/tx";
import * as _272 from "./poolincentives/v1beta1/genesis";
import * as _273 from "./poolincentives/v1beta1/gov";
import * as _274 from "./poolincentives/v1beta1/incentives";
import * as _275 from "./poolincentives/v1beta1/query";
import * as _276 from "./poolincentives/v1beta1/shared";
import * as _277 from "./poolmanager/v1beta1/genesis";
import * as _278 from "./poolmanager/v1beta1/gov";
import * as _279 from "./poolmanager/v1beta1/module_route";
import * as _280 from "./poolmanager/v1beta1/query";
import * as _281 from "./poolmanager/v1beta1/swap_route";
import * as _282 from "./poolmanager/v1beta1/taker_fee_share";
import * as _283 from "./poolmanager/v1beta1/tracked_volume";
import * as _284 from "./poolmanager/v1beta1/tx";
import * as _285 from "./protorev/v1beta1/genesis";
import * as _286 from "./protorev/v1beta1/gov";
import * as _287 from "./protorev/v1beta1/params";
import * as _288 from "./protorev/v1beta1/protorev";
import * as _289 from "./protorev/v1beta1/query";
import * as _290 from "./protorev/v1beta1/tx";
import * as _291 from "./smartaccount/v1beta1/genesis";
import * as _292 from "./smartaccount/v1beta1/models";
import * as _293 from "./smartaccount/v1beta1/params";
import * as _294 from "./smartaccount/v1beta1/query";
import * as _295 from "./smartaccount/v1beta1/tx";
import * as _296 from "./superfluid/genesis";
import * as _297 from "./superfluid/params";
import * as _298 from "./superfluid/query";
import * as _299 from "./superfluid/superfluid";
import * as _300 from "./superfluid/tx";
import * as _301 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _302 from "./tokenfactory/v1beta1/genesis";
import * as _303 from "./tokenfactory/v1beta1/params";
import * as _304 from "./tokenfactory/v1beta1/query";
import * as _305 from "./tokenfactory/v1beta1/tx";
import * as _306 from "./txfees/v1beta1/feetoken";
import * as _307 from "./txfees/v1beta1/genesis";
import * as _308 from "./txfees/v1beta1/gov";
import * as _309 from "./txfees/v1beta1/params";
import * as _310 from "./txfees/v1beta1/query";
import * as _311 from "./txfees/v1beta1/tx";
import * as _312 from "./valsetpref/v1beta1/query";
import * as _313 from "./valsetpref/v1beta1/state";
import * as _314 from "./valsetpref/v1beta1/tx";
import * as _674 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _675 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _676 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _677 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _678 from "./gamm/v1beta1/tx.amino";
import * as _679 from "./incentives/tx.amino";
import * as _680 from "./lockup/tx.amino";
import * as _681 from "./poolmanager/v1beta1/tx.amino";
import * as _682 from "./protorev/v1beta1/tx.amino";
import * as _683 from "./smartaccount/v1beta1/tx.amino";
import * as _684 from "./superfluid/tx.amino";
import * as _685 from "./tokenfactory/v1beta1/tx.amino";
import * as _686 from "./txfees/v1beta1/tx.amino";
import * as _687 from "./valsetpref/v1beta1/tx.amino";
import * as _688 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _689 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _690 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _691 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _692 from "./gamm/v1beta1/tx.registry";
import * as _693 from "./incentives/tx.registry";
import * as _694 from "./lockup/tx.registry";
import * as _695 from "./poolmanager/v1beta1/tx.registry";
import * as _696 from "./protorev/v1beta1/tx.registry";
import * as _697 from "./smartaccount/v1beta1/tx.registry";
import * as _698 from "./superfluid/tx.registry";
import * as _699 from "./tokenfactory/v1beta1/tx.registry";
import * as _700 from "./txfees/v1beta1/tx.registry";
import * as _701 from "./valsetpref/v1beta1/tx.registry";
import * as _702 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _703 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _704 from "./gamm/v1beta1/query.rpc.Query";
import * as _705 from "./incentives/query.rpc.Query";
import * as _706 from "./lockup/query.rpc.Query";
import * as _707 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _708 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _709 from "./protorev/v1beta1/query.rpc.Query";
import * as _710 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _711 from "./superfluid/query.rpc.Query";
import * as _712 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _713 from "./txfees/v1beta1/query.rpc.Query";
import * as _714 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _715 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _716 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _717 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _718 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _719 from "./gamm/v1beta1/tx.rpc.msg";
import * as _720 from "./incentives/tx.rpc.msg";
import * as _721 from "./lockup/tx.rpc.msg";
import * as _722 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _723 from "./protorev/v1beta1/tx.rpc.msg";
import * as _724 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _725 from "./superfluid/tx.rpc.msg";
import * as _726 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _727 from "./txfees/v1beta1/tx.rpc.msg";
import * as _728 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _873 from "./rpc.query";
import * as _874 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._236
    };
  }
  export const concentratedliquidity = {
    ..._237,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._674,
          ..._688,
          ..._715
        }
      }
    },
    v1beta1: {
      ..._675,
      ..._689,
      ..._702,
      ..._716
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._703
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._250,
          ..._676,
          ..._690,
          ..._717
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._251,
          ..._252,
          ..._677,
          ..._691,
          ..._718
        };
      }
    }
    export const v1beta1 = {
      ..._253,
      ..._254,
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._259,
      ..._678,
      ..._692,
      ..._704,
      ..._719
    };
  }
  export const incentives = {
    ..._260,
    ..._261,
    ..._262,
    ..._263,
    ..._264,
    ..._265,
    ..._266,
    ..._679,
    ..._693,
    ..._705,
    ..._720
  };
  export const lockup = {
    ..._267,
    ..._268,
    ..._269,
    ..._270,
    ..._271,
    ..._680,
    ..._694,
    ..._706,
    ..._721
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._272,
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._707
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._277,
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._681,
      ..._695,
      ..._708,
      ..._722
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._290,
      ..._682,
      ..._696,
      ..._709,
      ..._723
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._295,
      ..._683,
      ..._697,
      ..._710,
      ..._724
    };
  }
  export const superfluid = {
    ..._296,
    ..._297,
    ..._298,
    ..._299,
    ..._300,
    ..._684,
    ..._698,
    ..._711,
    ..._725
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._301,
      ..._302,
      ..._303,
      ..._304,
      ..._305,
      ..._685,
      ..._699,
      ..._712,
      ..._726
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._306,
      ..._307,
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._686,
      ..._700,
      ..._713,
      ..._727
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._312,
      ..._313,
      ..._314,
      ..._687,
      ..._701,
      ..._714,
      ..._728
    };
  }
  export const ClientFactory = {
    ..._873,
    ..._874
  };
}