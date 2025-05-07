import * as _404 from "./carbon/cdp/asset_params";
import * as _405 from "./carbon/cdp/cdp_liquidations";
import * as _406 from "./carbon/cdp/debt_info";
import * as _407 from "./carbon/cdp/e_mode_category";
import * as _408 from "./carbon/cdp/event";
import * as _409 from "./carbon/cdp/genesis";
import * as _410 from "./carbon/cdp/params";
import * as _411 from "./carbon/cdp/query";
import * as _412 from "./carbon/cdp/rate_strategy_params";
import * as _413 from "./carbon/cdp/reward_scheme";
import * as _414 from "./carbon/cdp/stablecoin_debt_info";
import * as _415 from "./carbon/cdp/stablecoin_interest_info";
import * as _416 from "./carbon/cdp/tx";
import * as _713 from "./carbon/cdp/tx.amino";
import * as _714 from "./carbon/cdp/tx.registry";
import * as _715 from "./carbon/cdp/query.rpc.Query";
import * as _716 from "./carbon/cdp/tx.rpc.msg";
import * as _758 from "./rpc.query";
import * as _759 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._404,
      ..._405,
      ..._406,
      ..._407,
      ..._408,
      ..._409,
      ..._410,
      ..._411,
      ..._412,
      ..._413,
      ..._414,
      ..._415,
      ..._416,
      ..._713,
      ..._714,
      ..._715,
      ..._716
    };
  }
  export const ClientFactory = {
    ..._758,
    ..._759
  };
}