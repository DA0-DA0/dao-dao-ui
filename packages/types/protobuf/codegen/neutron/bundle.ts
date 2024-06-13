import * as _158 from "./contractmanager/v1/failure";
import * as _159 from "./cron/genesis";
import * as _160 from "./cron/params";
import * as _161 from "./cron/query";
import * as _162 from "./cron/schedule";
import * as _163 from "./cron/tx";
import * as _164 from "./dex/deposit_record";
import * as _165 from "./dex/genesis";
import * as _166 from "./dex/limit_order_expiration";
import * as _167 from "./dex/limit_order_tranche_user";
import * as _168 from "./dex/limit_order_tranche";
import * as _169 from "./dex/pair_id";
import * as _170 from "./dex/params";
import * as _171 from "./dex/pool_metadata";
import * as _172 from "./dex/pool_reserves";
import * as _173 from "./dex/pool";
import * as _174 from "./dex/query";
import * as _175 from "./dex/tick_liquidity";
import * as _176 from "./dex/trade_pair_id";
import * as _177 from "./dex/tx";
import * as _178 from "./feeburner/genesis";
import * as _179 from "./feeburner/params";
import * as _180 from "./feeburner/query";
import * as _181 from "./feeburner/total_burned_neutrons_amount";
import * as _182 from "./feeburner/tx";
import * as _183 from "./feerefunder/fee";
import * as _184 from "./feerefunder/genesis";
import * as _185 from "./feerefunder/params";
import * as _186 from "./feerefunder/query";
import * as _187 from "./feerefunder/tx";
import * as _188 from "./interchainqueries/genesis";
import * as _189 from "./interchainqueries/params";
import * as _190 from "./interchainqueries/query";
import * as _191 from "./interchainqueries/tx";
import * as _192 from "./interchaintxs/v1/genesis";
import * as _193 from "./interchaintxs/v1/params";
import * as _194 from "./interchaintxs/v1/query";
import * as _195 from "./interchaintxs/v1/tx";
import * as _458 from "./cron/tx.amino";
import * as _459 from "./dex/tx.amino";
import * as _460 from "./feeburner/tx.amino";
import * as _461 from "./feerefunder/tx.amino";
import * as _462 from "./interchainqueries/tx.amino";
import * as _463 from "./interchaintxs/v1/tx.amino";
import * as _464 from "./cron/tx.registry";
import * as _465 from "./dex/tx.registry";
import * as _466 from "./feeburner/tx.registry";
import * as _467 from "./feerefunder/tx.registry";
import * as _468 from "./interchainqueries/tx.registry";
import * as _469 from "./interchaintxs/v1/tx.registry";
import * as _470 from "./cron/query.rpc.Query";
import * as _471 from "./dex/query.rpc.Query";
import * as _472 from "./feeburner/query.rpc.Query";
import * as _473 from "./feerefunder/query.rpc.Query";
import * as _474 from "./interchainqueries/query.rpc.Query";
import * as _475 from "./interchaintxs/v1/query.rpc.Query";
import * as _476 from "./cron/tx.rpc.msg";
import * as _477 from "./dex/tx.rpc.msg";
import * as _478 from "./feeburner/tx.rpc.msg";
import * as _479 from "./feerefunder/tx.rpc.msg";
import * as _480 from "./interchainqueries/tx.rpc.msg";
import * as _481 from "./interchaintxs/v1/tx.rpc.msg";
import * as _606 from "./rpc.query";
import * as _607 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._158
    };
  }
  export const cron = {
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._163,
    ..._458,
    ..._464,
    ..._470,
    ..._476
  };
  export const dex = {
    ..._164,
    ..._165,
    ..._166,
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
    ..._459,
    ..._465,
    ..._471,
    ..._477
  };
  export const feeburner = {
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._182,
    ..._460,
    ..._466,
    ..._472,
    ..._478
  };
  export const feerefunder = {
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._461,
    ..._467,
    ..._473,
    ..._479
  };
  export const interchainqueries = {
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._462,
    ..._468,
    ..._474,
    ..._480
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._192,
      ..._193,
      ..._194,
      ..._195,
      ..._463,
      ..._469,
      ..._475,
      ..._481
    };
  }
  export const ClientFactory = {
    ..._606,
    ..._607
  };
}