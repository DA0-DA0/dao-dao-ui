import * as _397 from "./carbon/cdp/asset_params";
import * as _398 from "./carbon/cdp/cdp_liquidations";
import * as _399 from "./carbon/cdp/debt_info";
import * as _400 from "./carbon/cdp/e_mode_category";
import * as _401 from "./carbon/cdp/event";
import * as _402 from "./carbon/cdp/genesis";
import * as _403 from "./carbon/cdp/params";
import * as _404 from "./carbon/cdp/query";
import * as _405 from "./carbon/cdp/rate_strategy_params";
import * as _406 from "./carbon/cdp/reward_scheme";
import * as _407 from "./carbon/cdp/stablecoin_debt_info";
import * as _408 from "./carbon/cdp/stablecoin_interest_info";
import * as _409 from "./carbon/cdp/tx";
import * as _702 from "./carbon/cdp/tx.amino";
import * as _703 from "./carbon/cdp/tx.registry";
import * as _704 from "./carbon/cdp/query.rpc.Query";
import * as _705 from "./carbon/cdp/tx.rpc.msg";
import * as _745 from "./rpc.query";
import * as _746 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._397,
      ..._398,
      ..._399,
      ..._400,
      ..._401,
      ..._402,
      ..._403,
      ..._404,
      ..._405,
      ..._406,
      ..._407,
      ..._408,
      ..._409,
      ..._702,
      ..._703,
      ..._704,
      ..._705
    };
  }
  export const ClientFactory = {
    ..._745,
    ..._746
  };
}