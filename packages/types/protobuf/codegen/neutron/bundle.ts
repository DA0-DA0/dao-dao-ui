import * as _200 from "./contractmanager/v1/failure";
import * as _201 from "./cron/genesis";
import * as _202 from "./cron/params";
import * as _203 from "./cron/query";
import * as _204 from "./cron/schedule";
import * as _205 from "./cron/tx";
import * as _206 from "./dex/deposit_record";
import * as _207 from "./dex/genesis";
import * as _208 from "./dex/limit_order_expiration";
import * as _209 from "./dex/limit_order_tranche_user";
import * as _210 from "./dex/limit_order_tranche";
import * as _211 from "./dex/pair_id";
import * as _212 from "./dex/params";
import * as _213 from "./dex/pool_metadata";
import * as _214 from "./dex/pool_reserves";
import * as _215 from "./dex/pool";
import * as _216 from "./dex/query";
import * as _217 from "./dex/tick_liquidity";
import * as _218 from "./dex/trade_pair_id";
import * as _219 from "./dex/tx";
import * as _220 from "./feeburner/genesis";
import * as _221 from "./feeburner/params";
import * as _222 from "./feeburner/query";
import * as _223 from "./feeburner/total_burned_neutrons_amount";
import * as _224 from "./feeburner/tx";
import * as _225 from "./feerefunder/fee";
import * as _226 from "./feerefunder/genesis";
import * as _227 from "./feerefunder/params";
import * as _228 from "./feerefunder/query";
import * as _229 from "./feerefunder/tx";
import * as _230 from "./interchainqueries/genesis";
import * as _231 from "./interchainqueries/params";
import * as _232 from "./interchainqueries/query";
import * as _233 from "./interchainqueries/tx";
import * as _234 from "./interchaintxs/v1/genesis";
import * as _235 from "./interchaintxs/v1/params";
import * as _236 from "./interchaintxs/v1/query";
import * as _237 from "./interchaintxs/v1/tx";
import * as _238 from "./revenue/genesis";
import * as _239 from "./revenue/params";
import * as _240 from "./revenue/query";
import * as _241 from "./revenue/tx";
import * as _657 from "./cron/tx.amino";
import * as _658 from "./dex/tx.amino";
import * as _659 from "./feeburner/tx.amino";
import * as _660 from "./feerefunder/tx.amino";
import * as _661 from "./interchainqueries/tx.amino";
import * as _662 from "./interchaintxs/v1/tx.amino";
import * as _663 from "./revenue/tx.amino";
import * as _664 from "./cron/tx.registry";
import * as _665 from "./dex/tx.registry";
import * as _666 from "./feeburner/tx.registry";
import * as _667 from "./feerefunder/tx.registry";
import * as _668 from "./interchainqueries/tx.registry";
import * as _669 from "./interchaintxs/v1/tx.registry";
import * as _670 from "./revenue/tx.registry";
import * as _671 from "./cron/query.rpc.Query";
import * as _672 from "./dex/query.rpc.Query";
import * as _673 from "./feeburner/query.rpc.Query";
import * as _674 from "./feerefunder/query.rpc.Query";
import * as _675 from "./interchainqueries/query.rpc.Query";
import * as _676 from "./interchaintxs/v1/query.rpc.Query";
import * as _677 from "./revenue/query.rpc.Query";
import * as _678 from "./cron/tx.rpc.msg";
import * as _679 from "./dex/tx.rpc.msg";
import * as _680 from "./feeburner/tx.rpc.msg";
import * as _681 from "./feerefunder/tx.rpc.msg";
import * as _682 from "./interchainqueries/tx.rpc.msg";
import * as _683 from "./interchaintxs/v1/tx.rpc.msg";
import * as _684 from "./revenue/tx.rpc.msg";
import * as _884 from "./rpc.query";
import * as _885 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._200
    };
  }
  export const cron = {
    ..._201,
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._657,
    ..._664,
    ..._671,
    ..._678
  };
  export const dex = {
    ..._206,
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._211,
    ..._212,
    ..._213,
    ..._214,
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._219,
    ..._658,
    ..._665,
    ..._672,
    ..._679
  };
  export const feeburner = {
    ..._220,
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._659,
    ..._666,
    ..._673,
    ..._680
  };
  export const feerefunder = {
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._229,
    ..._660,
    ..._667,
    ..._674,
    ..._681
  };
  export const interchainqueries = {
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._661,
    ..._668,
    ..._675,
    ..._682
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._662,
      ..._669,
      ..._676,
      ..._683
    };
  }
  export const revenue = {
    ..._238,
    ..._239,
    ..._240,
    ..._241,
    ..._663,
    ..._670,
    ..._677,
    ..._684
  };
  export const ClientFactory = {
    ..._884,
    ..._885
  };
}