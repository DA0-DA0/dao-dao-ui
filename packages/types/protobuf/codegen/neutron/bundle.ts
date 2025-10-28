import * as _209 from "./contractmanager/v1/failure";
import * as _210 from "./cron/genesis";
import * as _211 from "./cron/params";
import * as _212 from "./cron/query";
import * as _213 from "./cron/schedule";
import * as _214 from "./cron/tx";
import * as _215 from "./dex/deposit_record";
import * as _216 from "./dex/genesis";
import * as _217 from "./dex/limit_order_expiration";
import * as _218 from "./dex/limit_order_tranche_user";
import * as _219 from "./dex/limit_order_tranche";
import * as _220 from "./dex/pair_id";
import * as _221 from "./dex/params";
import * as _222 from "./dex/pool_metadata";
import * as _223 from "./dex/pool_reserves";
import * as _224 from "./dex/pool";
import * as _225 from "./dex/query";
import * as _226 from "./dex/tick_liquidity";
import * as _227 from "./dex/trade_pair_id";
import * as _228 from "./dex/tx";
import * as _229 from "./feeburner/genesis";
import * as _230 from "./feeburner/params";
import * as _231 from "./feeburner/query";
import * as _232 from "./feeburner/total_burned_neutrons_amount";
import * as _233 from "./feeburner/tx";
import * as _234 from "./feerefunder/fee";
import * as _235 from "./feerefunder/genesis";
import * as _236 from "./feerefunder/params";
import * as _237 from "./feerefunder/query";
import * as _238 from "./feerefunder/tx";
import * as _239 from "./interchainqueries/genesis";
import * as _240 from "./interchainqueries/params";
import * as _241 from "./interchainqueries/query";
import * as _242 from "./interchainqueries/tx";
import * as _243 from "./interchaintxs/v1/genesis";
import * as _244 from "./interchaintxs/v1/params";
import * as _245 from "./interchaintxs/v1/query";
import * as _246 from "./interchaintxs/v1/tx";
import * as _247 from "./revenue/genesis";
import * as _248 from "./revenue/params";
import * as _249 from "./revenue/query";
import * as _250 from "./revenue/tx";
import * as _675 from "./cron/tx.amino";
import * as _676 from "./dex/tx.amino";
import * as _677 from "./feeburner/tx.amino";
import * as _678 from "./feerefunder/tx.amino";
import * as _679 from "./interchainqueries/tx.amino";
import * as _680 from "./interchaintxs/v1/tx.amino";
import * as _681 from "./revenue/tx.amino";
import * as _682 from "./cron/tx.registry";
import * as _683 from "./dex/tx.registry";
import * as _684 from "./feeburner/tx.registry";
import * as _685 from "./feerefunder/tx.registry";
import * as _686 from "./interchainqueries/tx.registry";
import * as _687 from "./interchaintxs/v1/tx.registry";
import * as _688 from "./revenue/tx.registry";
import * as _689 from "./cron/query.rpc.Query";
import * as _690 from "./dex/query.rpc.Query";
import * as _691 from "./feeburner/query.rpc.Query";
import * as _692 from "./feerefunder/query.rpc.Query";
import * as _693 from "./interchainqueries/query.rpc.Query";
import * as _694 from "./interchaintxs/v1/query.rpc.Query";
import * as _695 from "./revenue/query.rpc.Query";
import * as _696 from "./cron/tx.rpc.msg";
import * as _697 from "./dex/tx.rpc.msg";
import * as _698 from "./feeburner/tx.rpc.msg";
import * as _699 from "./feerefunder/tx.rpc.msg";
import * as _700 from "./interchainqueries/tx.rpc.msg";
import * as _701 from "./interchaintxs/v1/tx.rpc.msg";
import * as _702 from "./revenue/tx.rpc.msg";
import * as _906 from "./rpc.query";
import * as _907 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._209
    };
  }
  export const cron = {
    ..._210,
    ..._211,
    ..._212,
    ..._213,
    ..._214,
    ..._675,
    ..._682,
    ..._689,
    ..._696
  };
  export const dex = {
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._219,
    ..._220,
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._225,
    ..._226,
    ..._227,
    ..._228,
    ..._676,
    ..._683,
    ..._690,
    ..._697
  };
  export const feeburner = {
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._233,
    ..._677,
    ..._684,
    ..._691,
    ..._698
  };
  export const feerefunder = {
    ..._234,
    ..._235,
    ..._236,
    ..._237,
    ..._238,
    ..._678,
    ..._685,
    ..._692,
    ..._699
  };
  export const interchainqueries = {
    ..._239,
    ..._240,
    ..._241,
    ..._242,
    ..._679,
    ..._686,
    ..._693,
    ..._700
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._680,
      ..._687,
      ..._694,
      ..._701
    };
  }
  export const revenue = {
    ..._247,
    ..._248,
    ..._249,
    ..._250,
    ..._681,
    ..._688,
    ..._695,
    ..._702
  };
  export const ClientFactory = {
    ..._906,
    ..._907
  };
}