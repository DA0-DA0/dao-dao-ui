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
import * as _642 from "./cron/tx.amino";
import * as _643 from "./dex/tx.amino";
import * as _644 from "./feeburner/tx.amino";
import * as _645 from "./feerefunder/tx.amino";
import * as _646 from "./interchainqueries/tx.amino";
import * as _647 from "./interchaintxs/v1/tx.amino";
import * as _648 from "./revenue/tx.amino";
import * as _649 from "./cron/tx.registry";
import * as _650 from "./dex/tx.registry";
import * as _651 from "./feeburner/tx.registry";
import * as _652 from "./feerefunder/tx.registry";
import * as _653 from "./interchainqueries/tx.registry";
import * as _654 from "./interchaintxs/v1/tx.registry";
import * as _655 from "./revenue/tx.registry";
import * as _656 from "./cron/query.rpc.Query";
import * as _657 from "./dex/query.rpc.Query";
import * as _658 from "./feeburner/query.rpc.Query";
import * as _659 from "./feerefunder/query.rpc.Query";
import * as _660 from "./interchainqueries/query.rpc.Query";
import * as _661 from "./interchaintxs/v1/query.rpc.Query";
import * as _662 from "./revenue/query.rpc.Query";
import * as _663 from "./cron/tx.rpc.msg";
import * as _664 from "./dex/tx.rpc.msg";
import * as _665 from "./feeburner/tx.rpc.msg";
import * as _666 from "./feerefunder/tx.rpc.msg";
import * as _667 from "./interchainqueries/tx.rpc.msg";
import * as _668 from "./interchaintxs/v1/tx.rpc.msg";
import * as _669 from "./revenue/tx.rpc.msg";
import * as _869 from "./rpc.query";
import * as _870 from "./rpc.tx";
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
    ..._642,
    ..._649,
    ..._656,
    ..._663
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
    ..._643,
    ..._650,
    ..._657,
    ..._664
  };
  export const feeburner = {
    ..._209,
    ..._210,
    ..._211,
    ..._212,
    ..._213,
    ..._644,
    ..._651,
    ..._658,
    ..._665
  };
  export const feerefunder = {
    ..._214,
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._645,
    ..._652,
    ..._659,
    ..._666
  };
  export const interchainqueries = {
    ..._219,
    ..._220,
    ..._221,
    ..._222,
    ..._646,
    ..._653,
    ..._660,
    ..._667
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._223,
      ..._224,
      ..._225,
      ..._226,
      ..._647,
      ..._654,
      ..._661,
      ..._668
    };
  }
  export const revenue = {
    ..._227,
    ..._228,
    ..._229,
    ..._230,
    ..._648,
    ..._655,
    ..._662,
    ..._669
  };
  export const ClientFactory = {
    ..._869,
    ..._870
  };
}