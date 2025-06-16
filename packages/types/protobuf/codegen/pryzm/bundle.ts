import * as _315 from "./amm/v1/event";
import * as _316 from "./amm/v1/genesis";
import * as _317 from "./amm/v1/operations";
import * as _318 from "./amm/v1/oracle_payload";
import * as _319 from "./amm/v1/oracle_price_pair";
import * as _320 from "./amm/v1/order";
import * as _321 from "./amm/v1/pair_match_proposal";
import * as _322 from "./amm/v1/params";
import * as _323 from "./amm/v1/pending_token_introduction";
import * as _324 from "./amm/v1/pool_token";
import * as _325 from "./amm/v1/pool";
import * as _326 from "./amm/v1/query";
import * as _327 from "./amm/v1/route_step";
import * as _328 from "./amm/v1/schedule_order_count";
import * as _329 from "./amm/v1/schedule_order";
import * as _330 from "./amm/v1/token_circuit_breaker_settings";
import * as _331 from "./amm/v1/token_weight";
import * as _332 from "./amm/v1/tx";
import * as _333 from "./amm/v1/virtual_balance_pool_token";
import * as _334 from "./amm/v1/weight_update_timing";
import * as _335 from "./amm/v1/weighted_token";
import * as _336 from "./amm/v1/whitelisted_route";
import * as _337 from "./amm/v1/yamm_configuration";
import * as _338 from "./amm/v2/pair_match_proposal";
import * as _339 from "./amm/v2/tx";
import * as _340 from "./assets/v1/event";
import * as _341 from "./assets/v1/genesis";
import * as _342 from "./assets/v1/maturity_level";
import * as _343 from "./assets/v1/oracle_payload";
import * as _344 from "./assets/v1/params";
import * as _345 from "./assets/v1/query";
import * as _346 from "./assets/v1/refractable_asset";
import * as _347 from "./assets/v1/tx";
import * as _348 from "./icstaking/v1/event";
import * as _349 from "./icstaking/v1/genesis";
import * as _350 from "./icstaking/v1/host_chain";
import * as _351 from "./icstaking/v1/loopback";
import * as _352 from "./icstaking/v1/lsm";
import * as _353 from "./icstaking/v1/multisig";
import * as _354 from "./icstaking/v1/oracle_payload";
import * as _355 from "./icstaking/v1/params";
import * as _356 from "./icstaking/v1/query";
import * as _357 from "./icstaking/v1/reply";
import * as _358 from "./icstaking/v1/sweep";
import * as _359 from "./icstaking/v1/tx";
import * as _360 from "./icstaking/v1/undelegation";
import * as _361 from "./incentives/v1/bond";
import * as _362 from "./incentives/v1/event";
import * as _363 from "./incentives/v1/genesis";
import * as _364 from "./incentives/v1/params";
import * as _365 from "./incentives/v1/pool";
import * as _366 from "./incentives/v1/query";
import * as _367 from "./incentives/v1/tx";
import * as _368 from "./incentives/v1/unbonding";
import * as _369 from "./mint/v1/event";
import * as _370 from "./mint/v1/genesis";
import * as _371 from "./mint/v1/minter";
import * as _372 from "./mint/v1/params";
import * as _373 from "./mint/v1/query";
import * as _374 from "./mint/v1/tx";
import * as _375 from "./pgov/v1/event";
import * as _376 from "./pgov/v1/genesis";
import * as _377 from "./pgov/v1/params";
import * as _378 from "./pgov/v1/proposal";
import * as _379 from "./pgov/v1/query";
import * as _380 from "./pgov/v1/reply";
import * as _381 from "./pgov/v1/staked_p_asset";
import * as _382 from "./pgov/v1/tx";
import * as _383 from "./pgov/v1/vote";
import * as _384 from "./refractor/v1/asset_state";
import * as _385 from "./refractor/v1/event";
import * as _386 from "./refractor/v1/genesis";
import * as _387 from "./refractor/v1/params";
import * as _388 from "./refractor/v1/query";
import * as _389 from "./refractor/v1/tx";
import * as _390 from "./treasury/v1/action";
import * as _391 from "./treasury/v1/event";
import * as _392 from "./treasury/v1/flow_trade";
import * as _393 from "./treasury/v1/genesis";
import * as _394 from "./treasury/v1/params";
import * as _395 from "./treasury/v1/query";
import * as _396 from "./treasury/v1/tx";
import * as _397 from "./ystaking/v1/asset_pool_state";
import * as _398 from "./ystaking/v1/event";
import * as _399 from "./ystaking/v1/genesis";
import * as _400 from "./ystaking/v1/query";
import * as _401 from "./ystaking/v1/tx";
import * as _402 from "./ystaking/v1/user_stake_state";
import * as _729 from "./amm/v1/tx.amino";
import * as _730 from "./amm/v2/tx.amino";
import * as _731 from "./assets/v1/tx.amino";
import * as _732 from "./icstaking/v1/tx.amino";
import * as _733 from "./incentives/v1/tx.amino";
import * as _734 from "./mint/v1/tx.amino";
import * as _735 from "./pgov/v1/tx.amino";
import * as _736 from "./refractor/v1/tx.amino";
import * as _737 from "./treasury/v1/tx.amino";
import * as _738 from "./ystaking/v1/tx.amino";
import * as _739 from "./amm/v1/tx.registry";
import * as _740 from "./amm/v2/tx.registry";
import * as _741 from "./assets/v1/tx.registry";
import * as _742 from "./icstaking/v1/tx.registry";
import * as _743 from "./incentives/v1/tx.registry";
import * as _744 from "./mint/v1/tx.registry";
import * as _745 from "./pgov/v1/tx.registry";
import * as _746 from "./refractor/v1/tx.registry";
import * as _747 from "./treasury/v1/tx.registry";
import * as _748 from "./ystaking/v1/tx.registry";
import * as _749 from "./amm/v1/query.rpc.Query";
import * as _750 from "./assets/v1/query.rpc.Query";
import * as _751 from "./icstaking/v1/query.rpc.Query";
import * as _752 from "./incentives/v1/query.rpc.Query";
import * as _753 from "./mint/v1/query.rpc.Query";
import * as _754 from "./pgov/v1/query.rpc.Query";
import * as _755 from "./refractor/v1/query.rpc.Query";
import * as _756 from "./treasury/v1/query.rpc.Query";
import * as _757 from "./ystaking/v1/query.rpc.Query";
import * as _758 from "./amm/v1/tx.rpc.msg";
import * as _759 from "./amm/v2/tx.rpc.msg";
import * as _760 from "./assets/v1/tx.rpc.msg";
import * as _761 from "./icstaking/v1/tx.rpc.msg";
import * as _762 from "./incentives/v1/tx.rpc.msg";
import * as _763 from "./mint/v1/tx.rpc.msg";
import * as _764 from "./pgov/v1/tx.rpc.msg";
import * as _765 from "./refractor/v1/tx.rpc.msg";
import * as _766 from "./treasury/v1/tx.rpc.msg";
import * as _767 from "./ystaking/v1/tx.rpc.msg";
import * as _875 from "./rpc.query";
import * as _876 from "./rpc.tx";
export namespace pryzm {
  export namespace amm {
    export const v1 = {
      ..._315,
      ..._316,
      ..._317,
      ..._318,
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._323,
      ..._324,
      ..._325,
      ..._326,
      ..._327,
      ..._328,
      ..._329,
      ..._330,
      ..._331,
      ..._332,
      ..._333,
      ..._334,
      ..._335,
      ..._336,
      ..._337,
      ..._729,
      ..._739,
      ..._749,
      ..._758
    };
    export const v2 = {
      ..._338,
      ..._339,
      ..._730,
      ..._740,
      ..._759
    };
  }
  export namespace assets {
    export const v1 = {
      ..._340,
      ..._341,
      ..._342,
      ..._343,
      ..._344,
      ..._345,
      ..._346,
      ..._347,
      ..._731,
      ..._741,
      ..._750,
      ..._760
    };
  }
  export namespace icstaking {
    export const v1 = {
      ..._348,
      ..._349,
      ..._350,
      ..._351,
      ..._352,
      ..._353,
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._358,
      ..._359,
      ..._360,
      ..._732,
      ..._742,
      ..._751,
      ..._761
    };
  }
  export namespace incentives {
    export const v1 = {
      ..._361,
      ..._362,
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._368,
      ..._733,
      ..._743,
      ..._752,
      ..._762
    };
  }
  export namespace mint {
    export const v1 = {
      ..._369,
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._374,
      ..._734,
      ..._744,
      ..._753,
      ..._763
    };
  }
  export namespace pgov {
    export const v1 = {
      ..._375,
      ..._376,
      ..._377,
      ..._378,
      ..._379,
      ..._380,
      ..._381,
      ..._382,
      ..._383,
      ..._735,
      ..._745,
      ..._754,
      ..._764
    };
  }
  export namespace refractor {
    export const v1 = {
      ..._384,
      ..._385,
      ..._386,
      ..._387,
      ..._388,
      ..._389,
      ..._736,
      ..._746,
      ..._755,
      ..._765
    };
  }
  export namespace treasury {
    export const v1 = {
      ..._390,
      ..._391,
      ..._392,
      ..._393,
      ..._394,
      ..._395,
      ..._396,
      ..._737,
      ..._747,
      ..._756,
      ..._766
    };
  }
  export namespace ystaking {
    export const v1 = {
      ..._397,
      ..._398,
      ..._399,
      ..._400,
      ..._401,
      ..._402,
      ..._738,
      ..._748,
      ..._757,
      ..._767
    };
  }
  export const ClientFactory = {
    ..._875,
    ..._876
  };
}