import * as _186 from "./contractmanager/v1/failure";
import * as _187 from "./cron/genesis";
import * as _188 from "./cron/params";
import * as _189 from "./cron/query";
import * as _190 from "./cron/schedule";
import * as _191 from "./cron/tx";
import * as _192 from "./dex/deposit_record";
import * as _193 from "./dex/genesis";
import * as _194 from "./dex/limit_order_expiration";
import * as _195 from "./dex/limit_order_tranche_user";
import * as _196 from "./dex/limit_order_tranche";
import * as _197 from "./dex/pair_id";
import * as _198 from "./dex/params";
import * as _199 from "./dex/pool_metadata";
import * as _200 from "./dex/pool_reserves";
import * as _201 from "./dex/pool";
import * as _202 from "./dex/query";
import * as _203 from "./dex/tick_liquidity";
import * as _204 from "./dex/trade_pair_id";
import * as _205 from "./dex/tx";
import * as _206 from "./feeburner/genesis";
import * as _207 from "./feeburner/params";
import * as _208 from "./feeburner/query";
import * as _209 from "./feeburner/total_burned_neutrons_amount";
import * as _210 from "./feeburner/tx";
import * as _211 from "./feerefunder/fee";
import * as _212 from "./feerefunder/genesis";
import * as _213 from "./feerefunder/params";
import * as _214 from "./feerefunder/query";
import * as _215 from "./feerefunder/tx";
import * as _216 from "./interchainqueries/genesis";
import * as _217 from "./interchainqueries/params";
import * as _218 from "./interchainqueries/query";
import * as _219 from "./interchainqueries/tx";
import * as _220 from "./interchaintxs/v1/genesis";
import * as _221 from "./interchaintxs/v1/params";
import * as _222 from "./interchaintxs/v1/query";
import * as _223 from "./interchaintxs/v1/tx";
import * as _547 from "./cron/tx.amino";
import * as _548 from "./dex/tx.amino";
import * as _549 from "./feeburner/tx.amino";
import * as _550 from "./feerefunder/tx.amino";
import * as _551 from "./interchainqueries/tx.amino";
import * as _552 from "./interchaintxs/v1/tx.amino";
import * as _553 from "./cron/tx.registry";
import * as _554 from "./dex/tx.registry";
import * as _555 from "./feeburner/tx.registry";
import * as _556 from "./feerefunder/tx.registry";
import * as _557 from "./interchainqueries/tx.registry";
import * as _558 from "./interchaintxs/v1/tx.registry";
import * as _559 from "./cron/query.rpc.Query";
import * as _560 from "./dex/query.rpc.Query";
import * as _561 from "./feeburner/query.rpc.Query";
import * as _562 from "./feerefunder/query.rpc.Query";
import * as _563 from "./interchainqueries/query.rpc.Query";
import * as _564 from "./interchaintxs/v1/query.rpc.Query";
import * as _565 from "./cron/tx.rpc.msg";
import * as _566 from "./dex/tx.rpc.msg";
import * as _567 from "./feeburner/tx.rpc.msg";
import * as _568 from "./feerefunder/tx.rpc.msg";
import * as _569 from "./interchainqueries/tx.rpc.msg";
import * as _570 from "./interchaintxs/v1/tx.rpc.msg";
import * as _729 from "./rpc.query";
import * as _730 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._186
    };
  }
  export const cron = {
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._547,
    ..._553,
    ..._559,
    ..._565
  };
  export const dex = {
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
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._548,
    ..._554,
    ..._560,
    ..._566
  };
  export const feeburner = {
    ..._206,
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._549,
    ..._555,
    ..._561,
    ..._567
  };
  export const feerefunder = {
    ..._211,
    ..._212,
    ..._213,
    ..._214,
    ..._215,
    ..._550,
    ..._556,
    ..._562,
    ..._568
  };
  export const interchainqueries = {
    ..._216,
    ..._217,
    ..._218,
    ..._219,
    ..._551,
    ..._557,
    ..._563,
    ..._569
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._552,
      ..._558,
      ..._564,
      ..._570
    };
  }
  export const ClientFactory = {
    ..._729,
    ..._730
  };
}