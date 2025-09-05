import * as _335 from "./amm/v1/event";
import * as _336 from "./amm/v1/genesis";
import * as _337 from "./amm/v1/operations";
import * as _338 from "./amm/v1/oracle_payload";
import * as _339 from "./amm/v1/oracle_price_pair";
import * as _340 from "./amm/v1/order";
import * as _341 from "./amm/v1/pair_match_proposal";
import * as _342 from "./amm/v1/params";
import * as _343 from "./amm/v1/pending_token_introduction";
import * as _344 from "./amm/v1/pool_token";
import * as _345 from "./amm/v1/pool";
import * as _346 from "./amm/v1/query";
import * as _347 from "./amm/v1/route_step";
import * as _348 from "./amm/v1/schedule_order_count";
import * as _349 from "./amm/v1/schedule_order";
import * as _350 from "./amm/v1/token_circuit_breaker_settings";
import * as _351 from "./amm/v1/token_weight";
import * as _352 from "./amm/v1/tx";
import * as _353 from "./amm/v1/virtual_balance_pool_token";
import * as _354 from "./amm/v1/weight_update_timing";
import * as _355 from "./amm/v1/weighted_token";
import * as _356 from "./amm/v1/whitelisted_route";
import * as _357 from "./amm/v1/yamm_configuration";
import * as _358 from "./amm/v2/pair_match_proposal";
import * as _359 from "./amm/v2/tx";
import * as _360 from "./assets/v1/event";
import * as _361 from "./assets/v1/genesis";
import * as _362 from "./assets/v1/maturity_level";
import * as _363 from "./assets/v1/oracle_payload";
import * as _364 from "./assets/v1/params";
import * as _365 from "./assets/v1/query";
import * as _366 from "./assets/v1/refractable_asset";
import * as _367 from "./assets/v1/tx";
import * as _368 from "./icstaking/v1/event";
import * as _369 from "./icstaking/v1/genesis";
import * as _370 from "./icstaking/v1/host_chain";
import * as _371 from "./icstaking/v1/loopback";
import * as _372 from "./icstaking/v1/lsm";
import * as _373 from "./icstaking/v1/multisig";
import * as _374 from "./icstaking/v1/oracle_payload";
import * as _375 from "./icstaking/v1/params";
import * as _376 from "./icstaking/v1/query";
import * as _377 from "./icstaking/v1/reply";
import * as _378 from "./icstaking/v1/sweep";
import * as _379 from "./icstaking/v1/tx";
import * as _380 from "./icstaking/v1/undelegation";
import * as _381 from "./incentives/v1/bond";
import * as _382 from "./incentives/v1/event";
import * as _383 from "./incentives/v1/genesis";
import * as _384 from "./incentives/v1/params";
import * as _385 from "./incentives/v1/pool";
import * as _386 from "./incentives/v1/query";
import * as _387 from "./incentives/v1/tx";
import * as _388 from "./incentives/v1/unbonding";
import * as _389 from "./mint/v1/event";
import * as _390 from "./mint/v1/genesis";
import * as _391 from "./mint/v1/minter";
import * as _392 from "./mint/v1/params";
import * as _393 from "./mint/v1/query";
import * as _394 from "./mint/v1/tx";
import * as _395 from "./pgov/v1/event";
import * as _396 from "./pgov/v1/genesis";
import * as _397 from "./pgov/v1/params";
import * as _398 from "./pgov/v1/proposal";
import * as _399 from "./pgov/v1/query";
import * as _400 from "./pgov/v1/reply";
import * as _401 from "./pgov/v1/staked_p_asset";
import * as _402 from "./pgov/v1/tx";
import * as _403 from "./pgov/v1/vote";
import * as _404 from "./refractor/v1/asset_state";
import * as _405 from "./refractor/v1/event";
import * as _406 from "./refractor/v1/genesis";
import * as _407 from "./refractor/v1/params";
import * as _408 from "./refractor/v1/query";
import * as _409 from "./refractor/v1/tx";
import * as _410 from "./treasury/v1/action";
import * as _411 from "./treasury/v1/event";
import * as _412 from "./treasury/v1/flow_trade";
import * as _413 from "./treasury/v1/genesis";
import * as _414 from "./treasury/v1/params";
import * as _415 from "./treasury/v1/query";
import * as _416 from "./treasury/v1/tx";
import * as _417 from "./ystaking/v1/asset_pool_state";
import * as _418 from "./ystaking/v1/event";
import * as _419 from "./ystaking/v1/genesis";
import * as _420 from "./ystaking/v1/query";
import * as _421 from "./ystaking/v1/tx";
import * as _422 from "./ystaking/v1/user_stake_state";
import * as _762 from "./amm/v1/tx.amino";
import * as _763 from "./amm/v2/tx.amino";
import * as _764 from "./assets/v1/tx.amino";
import * as _765 from "./icstaking/v1/tx.amino";
import * as _766 from "./incentives/v1/tx.amino";
import * as _767 from "./mint/v1/tx.amino";
import * as _768 from "./pgov/v1/tx.amino";
import * as _769 from "./refractor/v1/tx.amino";
import * as _770 from "./treasury/v1/tx.amino";
import * as _771 from "./ystaking/v1/tx.amino";
import * as _772 from "./amm/v1/tx.registry";
import * as _773 from "./amm/v2/tx.registry";
import * as _774 from "./assets/v1/tx.registry";
import * as _775 from "./icstaking/v1/tx.registry";
import * as _776 from "./incentives/v1/tx.registry";
import * as _777 from "./mint/v1/tx.registry";
import * as _778 from "./pgov/v1/tx.registry";
import * as _779 from "./refractor/v1/tx.registry";
import * as _780 from "./treasury/v1/tx.registry";
import * as _781 from "./ystaking/v1/tx.registry";
import * as _782 from "./amm/v1/query.rpc.Query";
import * as _783 from "./assets/v1/query.rpc.Query";
import * as _784 from "./icstaking/v1/query.rpc.Query";
import * as _785 from "./incentives/v1/query.rpc.Query";
import * as _786 from "./mint/v1/query.rpc.Query";
import * as _787 from "./pgov/v1/query.rpc.Query";
import * as _788 from "./refractor/v1/query.rpc.Query";
import * as _789 from "./treasury/v1/query.rpc.Query";
import * as _790 from "./ystaking/v1/query.rpc.Query";
import * as _791 from "./amm/v1/tx.rpc.msg";
import * as _792 from "./amm/v2/tx.rpc.msg";
import * as _793 from "./assets/v1/tx.rpc.msg";
import * as _794 from "./icstaking/v1/tx.rpc.msg";
import * as _795 from "./incentives/v1/tx.rpc.msg";
import * as _796 from "./mint/v1/tx.rpc.msg";
import * as _797 from "./pgov/v1/tx.rpc.msg";
import * as _798 from "./refractor/v1/tx.rpc.msg";
import * as _799 from "./treasury/v1/tx.rpc.msg";
import * as _800 from "./ystaking/v1/tx.rpc.msg";
import * as _912 from "./rpc.query";
import * as _913 from "./rpc.tx";
export namespace pryzm {
  export namespace amm {
    export const v1 = {
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
      ..._349,
      ..._350,
      ..._351,
      ..._352,
      ..._353,
      ..._354,
      ..._355,
      ..._356,
      ..._357,
      ..._762,
      ..._772,
      ..._782,
      ..._791
    };
    export const v2 = {
      ..._358,
      ..._359,
      ..._763,
      ..._773,
      ..._792
    };
  }
  export namespace assets {
    export const v1 = {
      ..._360,
      ..._361,
      ..._362,
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._367,
      ..._764,
      ..._774,
      ..._783,
      ..._793
    };
  }
  export namespace icstaking {
    export const v1 = {
      ..._368,
      ..._369,
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._378,
      ..._379,
      ..._380,
      ..._765,
      ..._775,
      ..._784,
      ..._794
    };
  }
  export namespace incentives {
    export const v1 = {
      ..._381,
      ..._382,
      ..._383,
      ..._384,
      ..._385,
      ..._386,
      ..._387,
      ..._388,
      ..._766,
      ..._776,
      ..._785,
      ..._795
    };
  }
  export namespace mint {
    export const v1 = {
      ..._389,
      ..._390,
      ..._391,
      ..._392,
      ..._393,
      ..._394,
      ..._767,
      ..._777,
      ..._786,
      ..._796
    };
  }
  export namespace pgov {
    export const v1 = {
      ..._395,
      ..._396,
      ..._397,
      ..._398,
      ..._399,
      ..._400,
      ..._401,
      ..._402,
      ..._403,
      ..._768,
      ..._778,
      ..._787,
      ..._797
    };
  }
  export namespace refractor {
    export const v1 = {
      ..._404,
      ..._405,
      ..._406,
      ..._407,
      ..._408,
      ..._409,
      ..._769,
      ..._779,
      ..._788,
      ..._798
    };
  }
  export namespace treasury {
    export const v1 = {
      ..._410,
      ..._411,
      ..._412,
      ..._413,
      ..._414,
      ..._415,
      ..._416,
      ..._770,
      ..._780,
      ..._789,
      ..._799
    };
  }
  export namespace ystaking {
    export const v1 = {
      ..._417,
      ..._418,
      ..._419,
      ..._420,
      ..._421,
      ..._422,
      ..._771,
      ..._781,
      ..._790,
      ..._800
    };
  }
  export const ClientFactory = {
    ..._912,
    ..._913
  };
}