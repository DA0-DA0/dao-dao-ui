import * as _182 from "./contractmanager/v1/failure";
import * as _183 from "./cron/genesis";
import * as _184 from "./cron/params";
import * as _185 from "./cron/query";
import * as _186 from "./cron/schedule";
import * as _187 from "./cron/tx";
import * as _188 from "./dex/deposit_record";
import * as _189 from "./dex/genesis";
import * as _190 from "./dex/limit_order_expiration";
import * as _191 from "./dex/limit_order_tranche_user";
import * as _192 from "./dex/limit_order_tranche";
import * as _193 from "./dex/pair_id";
import * as _194 from "./dex/params";
import * as _195 from "./dex/pool_metadata";
import * as _196 from "./dex/pool_reserves";
import * as _197 from "./dex/pool";
import * as _198 from "./dex/query";
import * as _199 from "./dex/tick_liquidity";
import * as _200 from "./dex/trade_pair_id";
import * as _201 from "./dex/tx";
import * as _202 from "./feeburner/genesis";
import * as _203 from "./feeburner/params";
import * as _204 from "./feeburner/query";
import * as _205 from "./feeburner/total_burned_neutrons_amount";
import * as _206 from "./feeburner/tx";
import * as _207 from "./feerefunder/fee";
import * as _208 from "./feerefunder/genesis";
import * as _209 from "./feerefunder/params";
import * as _210 from "./feerefunder/query";
import * as _211 from "./feerefunder/tx";
import * as _212 from "./interchainqueries/genesis";
import * as _213 from "./interchainqueries/params";
import * as _214 from "./interchainqueries/query";
import * as _215 from "./interchainqueries/tx";
import * as _216 from "./interchaintxs/v1/genesis";
import * as _217 from "./interchaintxs/v1/params";
import * as _218 from "./interchaintxs/v1/query";
import * as _219 from "./interchaintxs/v1/tx";
import * as _220 from "./revenue/genesis";
import * as _221 from "./revenue/params";
import * as _222 from "./revenue/query";
import * as _223 from "./revenue/tx";
import * as _543 from "./cron/tx.amino";
import * as _544 from "./dex/tx.amino";
import * as _545 from "./feeburner/tx.amino";
import * as _546 from "./feerefunder/tx.amino";
import * as _547 from "./interchainqueries/tx.amino";
import * as _548 from "./interchaintxs/v1/tx.amino";
import * as _549 from "./revenue/tx.amino";
import * as _550 from "./cron/tx.registry";
import * as _551 from "./dex/tx.registry";
import * as _552 from "./feeburner/tx.registry";
import * as _553 from "./feerefunder/tx.registry";
import * as _554 from "./interchainqueries/tx.registry";
import * as _555 from "./interchaintxs/v1/tx.registry";
import * as _556 from "./revenue/tx.registry";
import * as _557 from "./cron/query.rpc.Query";
import * as _558 from "./dex/query.rpc.Query";
import * as _559 from "./feeburner/query.rpc.Query";
import * as _560 from "./feerefunder/query.rpc.Query";
import * as _561 from "./interchainqueries/query.rpc.Query";
import * as _562 from "./interchaintxs/v1/query.rpc.Query";
import * as _563 from "./revenue/query.rpc.Query";
import * as _564 from "./cron/tx.rpc.msg";
import * as _565 from "./dex/tx.rpc.msg";
import * as _566 from "./feeburner/tx.rpc.msg";
import * as _567 from "./feerefunder/tx.rpc.msg";
import * as _568 from "./interchainqueries/tx.rpc.msg";
import * as _569 from "./interchaintxs/v1/tx.rpc.msg";
import * as _570 from "./revenue/tx.rpc.msg";
import * as _729 from "./rpc.query";
import * as _730 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._182
    };
  }
  export const cron = {
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._543,
    ..._550,
    ..._557,
    ..._564
  };
  export const dex = {
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._195,
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._544,
    ..._551,
    ..._558,
    ..._565
  };
  export const feeburner = {
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._206,
    ..._545,
    ..._552,
    ..._559,
    ..._566
  };
  export const feerefunder = {
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._211,
    ..._546,
    ..._553,
    ..._560,
    ..._567
  };
  export const interchainqueries = {
    ..._212,
    ..._213,
    ..._214,
    ..._215,
    ..._547,
    ..._554,
    ..._561,
    ..._568
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._216,
      ..._217,
      ..._218,
      ..._219,
      ..._548,
      ..._555,
      ..._562,
      ..._569
    };
  }
  export const revenue = {
    ..._220,
    ..._221,
    ..._222,
    ..._223,
    ..._549,
    ..._556,
    ..._563,
    ..._570
  };
  export const ClientFactory = {
    ..._729,
    ..._730
  };
}