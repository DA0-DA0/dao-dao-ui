import * as _326 from "./amm/v1/event";
import * as _327 from "./amm/v1/genesis";
import * as _328 from "./amm/v1/operations";
import * as _329 from "./amm/v1/oracle_payload";
import * as _330 from "./amm/v1/oracle_price_pair";
import * as _331 from "./amm/v1/order";
import * as _332 from "./amm/v1/pair_match_proposal";
import * as _333 from "./amm/v1/params";
import * as _334 from "./amm/v1/pending_token_introduction";
import * as _335 from "./amm/v1/pool_token";
import * as _336 from "./amm/v1/pool";
import * as _337 from "./amm/v1/query";
import * as _338 from "./amm/v1/route_step";
import * as _339 from "./amm/v1/schedule_order_count";
import * as _340 from "./amm/v1/schedule_order";
import * as _341 from "./amm/v1/token_circuit_breaker_settings";
import * as _342 from "./amm/v1/token_weight";
import * as _343 from "./amm/v1/tx";
import * as _344 from "./amm/v1/virtual_balance_pool_token";
import * as _345 from "./amm/v1/weight_update_timing";
import * as _346 from "./amm/v1/weighted_token";
import * as _347 from "./amm/v1/whitelisted_route";
import * as _348 from "./amm/v1/yamm_configuration";
import * as _349 from "./amm/v2/pair_match_proposal";
import * as _350 from "./amm/v2/tx";
import * as _351 from "./assets/v1/event";
import * as _352 from "./assets/v1/genesis";
import * as _353 from "./assets/v1/maturity_level";
import * as _354 from "./assets/v1/oracle_payload";
import * as _355 from "./assets/v1/params";
import * as _356 from "./assets/v1/query";
import * as _357 from "./assets/v1/refractable_asset";
import * as _358 from "./assets/v1/tx";
import * as _359 from "./icstaking/v1/event";
import * as _360 from "./icstaking/v1/genesis";
import * as _361 from "./icstaking/v1/host_chain";
import * as _362 from "./icstaking/v1/loopback";
import * as _363 from "./icstaking/v1/lsm";
import * as _364 from "./icstaking/v1/multisig";
import * as _365 from "./icstaking/v1/oracle_payload";
import * as _366 from "./icstaking/v1/params";
import * as _367 from "./icstaking/v1/query";
import * as _368 from "./icstaking/v1/reply";
import * as _369 from "./icstaking/v1/sweep";
import * as _370 from "./icstaking/v1/tx";
import * as _371 from "./icstaking/v1/undelegation";
import * as _372 from "./incentives/v1/bond";
import * as _373 from "./incentives/v1/event";
import * as _374 from "./incentives/v1/genesis";
import * as _375 from "./incentives/v1/params";
import * as _376 from "./incentives/v1/pool";
import * as _377 from "./incentives/v1/query";
import * as _378 from "./incentives/v1/tx";
import * as _379 from "./incentives/v1/unbonding";
import * as _380 from "./mint/v1/event";
import * as _381 from "./mint/v1/genesis";
import * as _382 from "./mint/v1/minter";
import * as _383 from "./mint/v1/params";
import * as _384 from "./mint/v1/query";
import * as _385 from "./mint/v1/tx";
import * as _386 from "./pgov/v1/event";
import * as _387 from "./pgov/v1/genesis";
import * as _388 from "./pgov/v1/params";
import * as _389 from "./pgov/v1/proposal";
import * as _390 from "./pgov/v1/query";
import * as _391 from "./pgov/v1/reply";
import * as _392 from "./pgov/v1/staked_p_asset";
import * as _393 from "./pgov/v1/tx";
import * as _394 from "./pgov/v1/vote";
import * as _395 from "./refractor/v1/asset_state";
import * as _396 from "./refractor/v1/event";
import * as _397 from "./refractor/v1/genesis";
import * as _398 from "./refractor/v1/params";
import * as _399 from "./refractor/v1/query";
import * as _400 from "./refractor/v1/tx";
import * as _401 from "./treasury/v1/action";
import * as _402 from "./treasury/v1/event";
import * as _403 from "./treasury/v1/flow_trade";
import * as _404 from "./treasury/v1/genesis";
import * as _405 from "./treasury/v1/params";
import * as _406 from "./treasury/v1/query";
import * as _407 from "./treasury/v1/tx";
import * as _408 from "./ystaking/v1/asset_pool_state";
import * as _409 from "./ystaking/v1/event";
import * as _410 from "./ystaking/v1/genesis";
import * as _411 from "./ystaking/v1/query";
import * as _412 from "./ystaking/v1/tx";
import * as _413 from "./ystaking/v1/user_stake_state";
import * as _749 from "./amm/v1/tx.amino";
import * as _750 from "./amm/v2/tx.amino";
import * as _751 from "./assets/v1/tx.amino";
import * as _752 from "./icstaking/v1/tx.amino";
import * as _753 from "./incentives/v1/tx.amino";
import * as _754 from "./mint/v1/tx.amino";
import * as _755 from "./pgov/v1/tx.amino";
import * as _756 from "./refractor/v1/tx.amino";
import * as _757 from "./treasury/v1/tx.amino";
import * as _758 from "./ystaking/v1/tx.amino";
import * as _759 from "./amm/v1/tx.registry";
import * as _760 from "./amm/v2/tx.registry";
import * as _761 from "./assets/v1/tx.registry";
import * as _762 from "./icstaking/v1/tx.registry";
import * as _763 from "./incentives/v1/tx.registry";
import * as _764 from "./mint/v1/tx.registry";
import * as _765 from "./pgov/v1/tx.registry";
import * as _766 from "./refractor/v1/tx.registry";
import * as _767 from "./treasury/v1/tx.registry";
import * as _768 from "./ystaking/v1/tx.registry";
import * as _769 from "./amm/v1/query.rpc.Query";
import * as _770 from "./assets/v1/query.rpc.Query";
import * as _771 from "./icstaking/v1/query.rpc.Query";
import * as _772 from "./incentives/v1/query.rpc.Query";
import * as _773 from "./mint/v1/query.rpc.Query";
import * as _774 from "./pgov/v1/query.rpc.Query";
import * as _775 from "./refractor/v1/query.rpc.Query";
import * as _776 from "./treasury/v1/query.rpc.Query";
import * as _777 from "./ystaking/v1/query.rpc.Query";
import * as _778 from "./amm/v1/tx.rpc.msg";
import * as _779 from "./amm/v2/tx.rpc.msg";
import * as _780 from "./assets/v1/tx.rpc.msg";
import * as _781 from "./icstaking/v1/tx.rpc.msg";
import * as _782 from "./incentives/v1/tx.rpc.msg";
import * as _783 from "./mint/v1/tx.rpc.msg";
import * as _784 from "./pgov/v1/tx.rpc.msg";
import * as _785 from "./refractor/v1/tx.rpc.msg";
import * as _786 from "./treasury/v1/tx.rpc.msg";
import * as _787 from "./ystaking/v1/tx.rpc.msg";
import * as _899 from "./rpc.query";
import * as _900 from "./rpc.tx";
export namespace pryzm {
  export namespace amm {
    export const v1 = {
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
      ..._338,
      ..._339,
      ..._340,
      ..._341,
      ..._342,
      ..._343,
      ..._344,
      ..._345,
      ..._346,
      ..._347,
      ..._348,
      ..._749,
      ..._759,
      ..._769,
      ..._778
    };
    export const v2 = {
      ..._349,
      ..._350,
      ..._750,
      ..._760,
      ..._779
    };
  }
  export namespace assets {
    export const v1 = {
      ..._351,
      ..._352,
      ..._353,
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._358,
      ..._751,
      ..._761,
      ..._770,
      ..._780
    };
  }
  export namespace icstaking {
    export const v1 = {
      ..._359,
      ..._360,
      ..._361,
      ..._362,
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._368,
      ..._369,
      ..._370,
      ..._371,
      ..._752,
      ..._762,
      ..._771,
      ..._781
    };
  }
  export namespace incentives {
    export const v1 = {
      ..._372,
      ..._373,
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._378,
      ..._379,
      ..._753,
      ..._763,
      ..._772,
      ..._782
    };
  }
  export namespace mint {
    export const v1 = {
      ..._380,
      ..._381,
      ..._382,
      ..._383,
      ..._384,
      ..._385,
      ..._754,
      ..._764,
      ..._773,
      ..._783
    };
  }
  export namespace pgov {
    export const v1 = {
      ..._386,
      ..._387,
      ..._388,
      ..._389,
      ..._390,
      ..._391,
      ..._392,
      ..._393,
      ..._394,
      ..._755,
      ..._765,
      ..._774,
      ..._784
    };
  }
  export namespace refractor {
    export const v1 = {
      ..._395,
      ..._396,
      ..._397,
      ..._398,
      ..._399,
      ..._400,
      ..._756,
      ..._766,
      ..._775,
      ..._785
    };
  }
  export namespace treasury {
    export const v1 = {
      ..._401,
      ..._402,
      ..._403,
      ..._404,
      ..._405,
      ..._406,
      ..._407,
      ..._757,
      ..._767,
      ..._776,
      ..._786
    };
  }
  export namespace ystaking {
    export const v1 = {
      ..._408,
      ..._409,
      ..._410,
      ..._411,
      ..._412,
      ..._413,
      ..._758,
      ..._768,
      ..._777,
      ..._787
    };
  }
  export const ClientFactory = {
    ..._899,
    ..._900
  };
}