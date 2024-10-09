import * as _176 from "./contractmanager/v1/failure";
import * as _177 from "./cron/genesis";
import * as _178 from "./cron/params";
import * as _179 from "./cron/query";
import * as _180 from "./cron/schedule";
import * as _181 from "./cron/tx";
import * as _182 from "./dex/deposit_record";
import * as _183 from "./dex/genesis";
import * as _184 from "./dex/limit_order_expiration";
import * as _185 from "./dex/limit_order_tranche_user";
import * as _186 from "./dex/limit_order_tranche";
import * as _187 from "./dex/pair_id";
import * as _188 from "./dex/params";
import * as _189 from "./dex/pool_metadata";
import * as _190 from "./dex/pool_reserves";
import * as _191 from "./dex/pool";
import * as _192 from "./dex/query";
import * as _193 from "./dex/tick_liquidity";
import * as _194 from "./dex/trade_pair_id";
import * as _195 from "./dex/tx";
import * as _196 from "./feeburner/genesis";
import * as _197 from "./feeburner/params";
import * as _198 from "./feeburner/query";
import * as _199 from "./feeburner/total_burned_neutrons_amount";
import * as _200 from "./feeburner/tx";
import * as _201 from "./feerefunder/fee";
import * as _202 from "./feerefunder/genesis";
import * as _203 from "./feerefunder/params";
import * as _204 from "./feerefunder/query";
import * as _205 from "./feerefunder/tx";
import * as _206 from "./interchainqueries/genesis";
import * as _207 from "./interchainqueries/params";
import * as _208 from "./interchainqueries/query";
import * as _209 from "./interchainqueries/tx";
import * as _210 from "./interchaintxs/v1/genesis";
import * as _211 from "./interchaintxs/v1/params";
import * as _212 from "./interchaintxs/v1/query";
import * as _213 from "./interchaintxs/v1/tx";
import * as _511 from "./cron/tx.amino";
import * as _512 from "./dex/tx.amino";
import * as _513 from "./feeburner/tx.amino";
import * as _514 from "./feerefunder/tx.amino";
import * as _515 from "./interchainqueries/tx.amino";
import * as _516 from "./interchaintxs/v1/tx.amino";
import * as _517 from "./cron/tx.registry";
import * as _518 from "./dex/tx.registry";
import * as _519 from "./feeburner/tx.registry";
import * as _520 from "./feerefunder/tx.registry";
import * as _521 from "./interchainqueries/tx.registry";
import * as _522 from "./interchaintxs/v1/tx.registry";
import * as _523 from "./cron/query.rpc.Query";
import * as _524 from "./dex/query.rpc.Query";
import * as _525 from "./feeburner/query.rpc.Query";
import * as _526 from "./feerefunder/query.rpc.Query";
import * as _527 from "./interchainqueries/query.rpc.Query";
import * as _528 from "./interchaintxs/v1/query.rpc.Query";
import * as _529 from "./cron/tx.rpc.msg";
import * as _530 from "./dex/tx.rpc.msg";
import * as _531 from "./feeburner/tx.rpc.msg";
import * as _532 from "./feerefunder/tx.rpc.msg";
import * as _533 from "./interchainqueries/tx.rpc.msg";
import * as _534 from "./interchaintxs/v1/tx.rpc.msg";
import * as _681 from "./rpc.query";
import * as _682 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._176
    };
  }
  export const cron = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._511,
    ..._517,
    ..._523,
    ..._529
  };
  export const dex = {
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._195,
    ..._512,
    ..._518,
    ..._524,
    ..._530
  };
  export const feeburner = {
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._513,
    ..._519,
    ..._525,
    ..._531
  };
  export const feerefunder = {
    ..._201,
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._514,
    ..._520,
    ..._526,
    ..._532
  };
  export const interchainqueries = {
    ..._206,
    ..._207,
    ..._208,
    ..._209,
    ..._515,
    ..._521,
    ..._527,
    ..._533
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._210,
      ..._211,
      ..._212,
      ..._213,
      ..._516,
      ..._522,
      ..._528,
      ..._534
    };
  }
  export const ClientFactory = {
    ..._681,
    ..._682
  };
}