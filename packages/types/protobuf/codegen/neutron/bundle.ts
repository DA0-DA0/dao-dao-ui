import * as _161 from "./contractmanager/v1/failure";
import * as _162 from "./cron/genesis";
import * as _163 from "./cron/params";
import * as _164 from "./cron/query";
import * as _165 from "./cron/schedule";
import * as _166 from "./cron/tx";
import * as _167 from "./dex/deposit_record";
import * as _168 from "./dex/genesis";
import * as _169 from "./dex/limit_order_expiration";
import * as _170 from "./dex/limit_order_tranche_user";
import * as _171 from "./dex/limit_order_tranche";
import * as _172 from "./dex/pair_id";
import * as _173 from "./dex/params";
import * as _174 from "./dex/pool_metadata";
import * as _175 from "./dex/pool_reserves";
import * as _176 from "./dex/pool";
import * as _177 from "./dex/query";
import * as _178 from "./dex/tick_liquidity";
import * as _179 from "./dex/trade_pair_id";
import * as _180 from "./dex/tx";
import * as _181 from "./feeburner/genesis";
import * as _182 from "./feeburner/params";
import * as _183 from "./feeburner/query";
import * as _184 from "./feeburner/total_burned_neutrons_amount";
import * as _185 from "./feeburner/tx";
import * as _186 from "./feerefunder/fee";
import * as _187 from "./feerefunder/genesis";
import * as _188 from "./feerefunder/params";
import * as _189 from "./feerefunder/query";
import * as _190 from "./feerefunder/tx";
import * as _191 from "./interchainqueries/genesis";
import * as _192 from "./interchainqueries/params";
import * as _193 from "./interchainqueries/query";
import * as _194 from "./interchainqueries/tx";
import * as _195 from "./interchaintxs/v1/genesis";
import * as _196 from "./interchaintxs/v1/params";
import * as _197 from "./interchaintxs/v1/query";
import * as _198 from "./interchaintxs/v1/tx";
import * as _460 from "./cron/tx.amino";
import * as _461 from "./dex/tx.amino";
import * as _462 from "./feeburner/tx.amino";
import * as _463 from "./feerefunder/tx.amino";
import * as _464 from "./interchainqueries/tx.amino";
import * as _465 from "./interchaintxs/v1/tx.amino";
import * as _466 from "./cron/tx.registry";
import * as _467 from "./dex/tx.registry";
import * as _468 from "./feeburner/tx.registry";
import * as _469 from "./feerefunder/tx.registry";
import * as _470 from "./interchainqueries/tx.registry";
import * as _471 from "./interchaintxs/v1/tx.registry";
import * as _472 from "./cron/query.rpc.Query";
import * as _473 from "./dex/query.rpc.Query";
import * as _474 from "./feeburner/query.rpc.Query";
import * as _475 from "./feerefunder/query.rpc.Query";
import * as _476 from "./interchainqueries/query.rpc.Query";
import * as _477 from "./interchaintxs/v1/query.rpc.Query";
import * as _478 from "./cron/tx.rpc.msg";
import * as _479 from "./dex/tx.rpc.msg";
import * as _480 from "./feeburner/tx.rpc.msg";
import * as _481 from "./feerefunder/tx.rpc.msg";
import * as _482 from "./interchainqueries/tx.rpc.msg";
import * as _483 from "./interchaintxs/v1/tx.rpc.msg";
import * as _604 from "./rpc.query";
import * as _605 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._161
    };
  }
  export const cron = {
    ..._162,
    ..._163,
    ..._164,
    ..._165,
    ..._166,
    ..._460,
    ..._466,
    ..._472,
    ..._478
  };
  export const dex = {
    ..._167,
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._461,
    ..._467,
    ..._473,
    ..._479
  };
  export const feeburner = {
    ..._181,
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._462,
    ..._468,
    ..._474,
    ..._480
  };
  export const feerefunder = {
    ..._186,
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._463,
    ..._469,
    ..._475,
    ..._481
  };
  export const interchainqueries = {
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._464,
    ..._470,
    ..._476,
    ..._482
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._195,
      ..._196,
      ..._197,
      ..._198,
      ..._465,
      ..._471,
      ..._477,
      ..._483
    };
  }
  export const ClientFactory = {
    ..._604,
    ..._605
  };
}