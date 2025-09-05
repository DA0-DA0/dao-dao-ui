import * as _105 from "./amm/denom_liquidity";
import * as _106 from "./amm/genesis";
import * as _107 from "./amm/params";
import * as _108 from "./amm/pool_asset";
import * as _109 from "./amm/pool_params";
import * as _110 from "./amm/pool";
import * as _111 from "./amm/proposal";
import * as _112 from "./amm/query";
import * as _113 from "./amm/swap_route";
import * as _114 from "./amm/tx";
import * as _115 from "./amm/types";
import * as _116 from "./commitment/params";
import * as _117 from "./masterchef/external_incentive";
import * as _118 from "./masterchef/genesis";
import * as _119 from "./masterchef/incentive";
import * as _120 from "./masterchef/params";
import * as _121 from "./masterchef/pool";
import * as _122 from "./masterchef/query";
import * as _123 from "./masterchef/tx";
import * as _124 from "./masterchef/types";
import * as _125 from "./stablestake/debt";
import * as _126 from "./stablestake/genesis";
import * as _127 from "./stablestake/params";
import * as _128 from "./stablestake/pool";
import * as _129 from "./stablestake/query";
import * as _130 from "./stablestake/tx";
import * as _131 from "./stablestake/types";
import * as _610 from "./amm/tx.amino";
import * as _611 from "./masterchef/tx.amino";
import * as _612 from "./stablestake/tx.amino";
import * as _613 from "./amm/tx.registry";
import * as _614 from "./masterchef/tx.registry";
import * as _615 from "./stablestake/tx.registry";
import * as _616 from "./amm/query.rpc.Query";
import * as _617 from "./masterchef/query.rpc.Query";
import * as _618 from "./stablestake/query.rpc.Query";
import * as _619 from "./amm/tx.rpc.msg";
import * as _620 from "./masterchef/tx.rpc.msg";
import * as _621 from "./stablestake/tx.rpc.msg";
import * as _892 from "./rpc.query";
import * as _893 from "./rpc.tx";
export namespace elys {
  export const amm = {
    ..._105,
    ..._106,
    ..._107,
    ..._108,
    ..._109,
    ..._110,
    ..._111,
    ..._112,
    ..._113,
    ..._114,
    ..._115,
    ..._610,
    ..._613,
    ..._616,
    ..._619
  };
  export const commitment = {
    ..._116
  };
  export const masterchef = {
    ..._117,
    ..._118,
    ..._119,
    ..._120,
    ..._121,
    ..._122,
    ..._123,
    ..._124,
    ..._611,
    ..._614,
    ..._617,
    ..._620
  };
  export const stablestake = {
    ..._125,
    ..._126,
    ..._127,
    ..._128,
    ..._129,
    ..._130,
    ..._131,
    ..._612,
    ..._615,
    ..._618,
    ..._621
  };
  export const ClientFactory = {
    ..._892,
    ..._893
  };
}