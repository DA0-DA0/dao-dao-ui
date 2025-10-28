import * as _526 from "./carbon/cdp/asset_params";
import * as _527 from "./carbon/cdp/cdp_liquidations";
import * as _528 from "./carbon/cdp/debt_info";
import * as _529 from "./carbon/cdp/e_mode_category";
import * as _530 from "./carbon/cdp/event";
import * as _531 from "./carbon/cdp/genesis";
import * as _532 from "./carbon/cdp/params";
import * as _533 from "./carbon/cdp/query";
import * as _534 from "./carbon/cdp/rate_strategy_params";
import * as _535 from "./carbon/cdp/reward_scheme";
import * as _536 from "./carbon/cdp/stablecoin_debt_info";
import * as _537 from "./carbon/cdp/stablecoin_interest_info";
import * as _538 from "./carbon/cdp/tx";
import * as _891 from "./carbon/cdp/tx.amino";
import * as _892 from "./carbon/cdp/tx.registry";
import * as _893 from "./carbon/cdp/query.rpc.Query";
import * as _894 from "./carbon/cdp/tx.rpc.msg";
import * as _944 from "./rpc.query";
import * as _945 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._526,
      ..._527,
      ..._528,
      ..._529,
      ..._530,
      ..._531,
      ..._532,
      ..._533,
      ..._534,
      ..._535,
      ..._536,
      ..._537,
      ..._538,
      ..._891,
      ..._892,
      ..._893,
      ..._894
    };
  }
  export const ClientFactory = {
    ..._944,
    ..._945
  };
}