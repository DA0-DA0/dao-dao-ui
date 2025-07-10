import * as _503 from "./carbon/cdp/asset_params";
import * as _504 from "./carbon/cdp/cdp_liquidations";
import * as _505 from "./carbon/cdp/debt_info";
import * as _506 from "./carbon/cdp/e_mode_category";
import * as _507 from "./carbon/cdp/event";
import * as _508 from "./carbon/cdp/genesis";
import * as _509 from "./carbon/cdp/params";
import * as _510 from "./carbon/cdp/query";
import * as _511 from "./carbon/cdp/rate_strategy_params";
import * as _512 from "./carbon/cdp/reward_scheme";
import * as _513 from "./carbon/cdp/stablecoin_debt_info";
import * as _514 from "./carbon/cdp/stablecoin_interest_info";
import * as _515 from "./carbon/cdp/tx";
import * as _855 from "./carbon/cdp/tx.amino";
import * as _856 from "./carbon/cdp/tx.registry";
import * as _857 from "./carbon/cdp/query.rpc.Query";
import * as _858 from "./carbon/cdp/tx.rpc.msg";
import * as _902 from "./rpc.query";
import * as _903 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._503,
      ..._504,
      ..._505,
      ..._506,
      ..._507,
      ..._508,
      ..._509,
      ..._510,
      ..._511,
      ..._512,
      ..._513,
      ..._514,
      ..._515,
      ..._855,
      ..._856,
      ..._857,
      ..._858
    };
  }
  export const ClientFactory = {
    ..._902,
    ..._903
  };
}