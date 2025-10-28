import * as _512 from "./carbon/cdp/asset_params";
import * as _513 from "./carbon/cdp/cdp_liquidations";
import * as _514 from "./carbon/cdp/debt_info";
import * as _515 from "./carbon/cdp/e_mode_category";
import * as _516 from "./carbon/cdp/event";
import * as _517 from "./carbon/cdp/genesis";
import * as _518 from "./carbon/cdp/params";
import * as _519 from "./carbon/cdp/query";
import * as _520 from "./carbon/cdp/rate_strategy_params";
import * as _521 from "./carbon/cdp/reward_scheme";
import * as _522 from "./carbon/cdp/stablecoin_debt_info";
import * as _523 from "./carbon/cdp/stablecoin_interest_info";
import * as _524 from "./carbon/cdp/tx";
import * as _873 from "./carbon/cdp/tx.amino";
import * as _874 from "./carbon/cdp/tx.registry";
import * as _875 from "./carbon/cdp/query.rpc.Query";
import * as _876 from "./carbon/cdp/tx.rpc.msg";
import * as _924 from "./rpc.query";
import * as _925 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._512,
      ..._513,
      ..._514,
      ..._515,
      ..._516,
      ..._517,
      ..._518,
      ..._519,
      ..._520,
      ..._521,
      ..._522,
      ..._523,
      ..._524,
      ..._873,
      ..._874,
      ..._875,
      ..._876
    };
  }
  export const ClientFactory = {
    ..._924,
    ..._925
  };
}