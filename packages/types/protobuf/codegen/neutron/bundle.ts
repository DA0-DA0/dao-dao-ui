import * as _189 from "./contractmanager/v1/failure";
import * as _190 from "./cron/genesis";
import * as _191 from "./cron/params";
import * as _192 from "./cron/query";
import * as _193 from "./cron/schedule";
import * as _194 from "./cron/tx";
import * as _195 from "./dex/deposit_record";
import * as _196 from "./dex/genesis";
import * as _197 from "./dex/limit_order_expiration";
import * as _198 from "./dex/limit_order_tranche_user";
import * as _199 from "./dex/limit_order_tranche";
import * as _200 from "./dex/pair_id";
import * as _201 from "./dex/params";
import * as _202 from "./dex/pool_metadata";
import * as _203 from "./dex/pool_reserves";
import * as _204 from "./dex/pool";
import * as _205 from "./dex/query";
import * as _206 from "./dex/tick_liquidity";
import * as _207 from "./dex/trade_pair_id";
import * as _208 from "./dex/tx";
import * as _209 from "./feeburner/genesis";
import * as _210 from "./feeburner/params";
import * as _211 from "./feeburner/query";
import * as _212 from "./feeburner/total_burned_neutrons_amount";
import * as _213 from "./feeburner/tx";
import * as _214 from "./feerefunder/fee";
import * as _215 from "./feerefunder/genesis";
import * as _216 from "./feerefunder/params";
import * as _217 from "./feerefunder/query";
import * as _218 from "./feerefunder/tx";
import * as _219 from "./interchainqueries/genesis";
import * as _220 from "./interchainqueries/params";
import * as _221 from "./interchainqueries/query";
import * as _222 from "./interchainqueries/tx";
import * as _223 from "./interchaintxs/v1/genesis";
import * as _224 from "./interchaintxs/v1/params";
import * as _225 from "./interchaintxs/v1/query";
import * as _226 from "./interchaintxs/v1/tx";
import * as _227 from "./revenue/genesis";
import * as _228 from "./revenue/params";
import * as _229 from "./revenue/query";
import * as _230 from "./revenue/tx";
import * as _554 from "./cron/tx.amino";
import * as _555 from "./dex/tx.amino";
import * as _556 from "./feeburner/tx.amino";
import * as _557 from "./feerefunder/tx.amino";
import * as _558 from "./interchainqueries/tx.amino";
import * as _559 from "./interchaintxs/v1/tx.amino";
import * as _560 from "./revenue/tx.amino";
import * as _561 from "./cron/tx.registry";
import * as _562 from "./dex/tx.registry";
import * as _563 from "./feeburner/tx.registry";
import * as _564 from "./feerefunder/tx.registry";
import * as _565 from "./interchainqueries/tx.registry";
import * as _566 from "./interchaintxs/v1/tx.registry";
import * as _567 from "./revenue/tx.registry";
import * as _568 from "./cron/query.rpc.Query";
import * as _569 from "./dex/query.rpc.Query";
import * as _570 from "./feeburner/query.rpc.Query";
import * as _571 from "./feerefunder/query.rpc.Query";
import * as _572 from "./interchainqueries/query.rpc.Query";
import * as _573 from "./interchaintxs/v1/query.rpc.Query";
import * as _574 from "./revenue/query.rpc.Query";
import * as _575 from "./cron/tx.rpc.msg";
import * as _576 from "./dex/tx.rpc.msg";
import * as _577 from "./feeburner/tx.rpc.msg";
import * as _578 from "./feerefunder/tx.rpc.msg";
import * as _579 from "./interchainqueries/tx.rpc.msg";
import * as _580 from "./interchaintxs/v1/tx.rpc.msg";
import * as _581 from "./revenue/tx.rpc.msg";
import * as _742 from "./rpc.query";
import * as _743 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._189
    };
  }
  export const cron = {
    ..._190,
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._554,
    ..._561,
    ..._568,
    ..._575
  };
  export const dex = {
    ..._195,
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._206,
    ..._207,
    ..._208,
    ..._555,
    ..._562,
    ..._569,
    ..._576
  };
  export const feeburner = {
    ..._209,
    ..._210,
    ..._211,
    ..._212,
    ..._213,
    ..._556,
    ..._563,
    ..._570,
    ..._577
  };
  export const feerefunder = {
    ..._214,
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._557,
    ..._564,
    ..._571,
    ..._578
  };
  export const interchainqueries = {
    ..._219,
    ..._220,
    ..._221,
    ..._222,
    ..._558,
    ..._565,
    ..._572,
    ..._579
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._223,
      ..._224,
      ..._225,
      ..._226,
      ..._559,
      ..._566,
      ..._573,
      ..._580
    };
  }
  export const revenue = {
    ..._227,
    ..._228,
    ..._229,
    ..._230,
    ..._560,
    ..._567,
    ..._574,
    ..._581
  };
  export const ClientFactory = {
    ..._742,
    ..._743
  };
}