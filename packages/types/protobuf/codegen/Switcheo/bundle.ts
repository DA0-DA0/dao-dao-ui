import * as _492 from "./carbon/cdp/asset_params";
import * as _493 from "./carbon/cdp/cdp_liquidations";
import * as _494 from "./carbon/cdp/debt_info";
import * as _495 from "./carbon/cdp/e_mode_category";
import * as _496 from "./carbon/cdp/event";
import * as _497 from "./carbon/cdp/genesis";
import * as _498 from "./carbon/cdp/params";
import * as _499 from "./carbon/cdp/query";
import * as _500 from "./carbon/cdp/rate_strategy_params";
import * as _501 from "./carbon/cdp/reward_scheme";
import * as _502 from "./carbon/cdp/stablecoin_debt_info";
import * as _503 from "./carbon/cdp/stablecoin_interest_info";
import * as _504 from "./carbon/cdp/tx";
import * as _840 from "./carbon/cdp/tx.amino";
import * as _841 from "./carbon/cdp/tx.registry";
import * as _842 from "./carbon/cdp/query.rpc.Query";
import * as _843 from "./carbon/cdp/tx.rpc.msg";
import * as _887 from "./rpc.query";
import * as _888 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._492,
      ..._493,
      ..._494,
      ..._495,
      ..._496,
      ..._497,
      ..._498,
      ..._499,
      ..._500,
      ..._501,
      ..._502,
      ..._503,
      ..._504,
      ..._840,
      ..._841,
      ..._842,
      ..._843
    };
  }
  export const ClientFactory = {
    ..._887,
    ..._888
  };
}