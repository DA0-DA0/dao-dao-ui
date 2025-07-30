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
import * as _116 from "./stablestake/debt";
import * as _117 from "./stablestake/genesis";
import * as _118 from "./stablestake/params";
import * as _119 from "./stablestake/pool";
import * as _120 from "./stablestake/query";
import * as _121 from "./stablestake/tx";
import * as _122 from "./stablestake/types";
import * as _601 from "./amm/tx.amino";
import * as _602 from "./stablestake/tx.amino";
import * as _603 from "./amm/tx.registry";
import * as _604 from "./stablestake/tx.registry";
import * as _605 from "./amm/query.rpc.Query";
import * as _606 from "./stablestake/query.rpc.Query";
import * as _607 from "./amm/tx.rpc.msg";
import * as _608 from "./stablestake/tx.rpc.msg";
import * as _879 from "./rpc.query";
import * as _880 from "./rpc.tx";
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
    ..._601,
    ..._603,
    ..._605,
    ..._607
  };
  export const stablestake = {
    ..._116,
    ..._117,
    ..._118,
    ..._119,
    ..._120,
    ..._121,
    ..._122,
    ..._602,
    ..._604,
    ..._606,
    ..._608
  };
  export const ClientFactory = {
    ..._879,
    ..._880
  };
}