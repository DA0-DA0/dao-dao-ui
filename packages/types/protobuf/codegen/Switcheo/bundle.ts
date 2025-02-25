import * as _393 from "./carbon/cdp/asset_params";
import * as _394 from "./carbon/cdp/cdp_liquidations";
import * as _395 from "./carbon/cdp/debt_info";
import * as _396 from "./carbon/cdp/e_mode_category";
import * as _397 from "./carbon/cdp/event";
import * as _398 from "./carbon/cdp/genesis";
import * as _399 from "./carbon/cdp/params";
import * as _400 from "./carbon/cdp/query";
import * as _401 from "./carbon/cdp/rate_strategy_params";
import * as _402 from "./carbon/cdp/reward_scheme";
import * as _403 from "./carbon/cdp/stablecoin_debt_info";
import * as _404 from "./carbon/cdp/stablecoin_interest_info";
import * as _405 from "./carbon/cdp/tx";
import * as _698 from "./carbon/cdp/tx.amino";
import * as _699 from "./carbon/cdp/tx.registry";
import * as _700 from "./carbon/cdp/query.rpc.Query";
import * as _701 from "./carbon/cdp/tx.rpc.msg";
import * as _741 from "./rpc.query";
import * as _742 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._393,
      ..._394,
      ..._395,
      ..._396,
      ..._397,
      ..._398,
      ..._399,
      ..._400,
      ..._401,
      ..._402,
      ..._403,
      ..._404,
      ..._405,
      ..._698,
      ..._699,
      ..._700,
      ..._701
    };
  }
  export const ClientFactory = {
    ..._741,
    ..._742
  };
}