import * as _153 from "./contractmanager/v1/failure";
import * as _154 from "./cron/genesis";
import * as _155 from "./cron/params";
import * as _156 from "./cron/query";
import * as _157 from "./cron/schedule";
import * as _158 from "./cron/tx";
import * as _159 from "./dex/deposit_record";
import * as _160 from "./dex/genesis";
import * as _161 from "./dex/limit_order_expiration";
import * as _162 from "./dex/limit_order_tranche_user";
import * as _163 from "./dex/limit_order_tranche";
import * as _164 from "./dex/pair_id";
import * as _165 from "./dex/params";
import * as _166 from "./dex/pool_metadata";
import * as _167 from "./dex/pool_reserves";
import * as _168 from "./dex/pool";
import * as _169 from "./dex/query";
import * as _170 from "./dex/tick_liquidity";
import * as _171 from "./dex/trade_pair_id";
import * as _172 from "./dex/tx";
import * as _173 from "./feeburner/genesis";
import * as _174 from "./feeburner/params";
import * as _175 from "./feeburner/query";
import * as _176 from "./feeburner/total_burned_neutrons_amount";
import * as _177 from "./feeburner/tx";
import * as _178 from "./feerefunder/fee";
import * as _179 from "./feerefunder/genesis";
import * as _180 from "./feerefunder/params";
import * as _181 from "./feerefunder/query";
import * as _182 from "./feerefunder/tx";
import * as _183 from "./interchainqueries/genesis";
import * as _184 from "./interchainqueries/params";
import * as _185 from "./interchainqueries/query";
import * as _186 from "./interchainqueries/tx";
import * as _187 from "./interchaintxs/v1/genesis";
import * as _188 from "./interchaintxs/v1/params";
import * as _189 from "./interchaintxs/v1/query";
import * as _190 from "./interchaintxs/v1/tx";
import * as _420 from "./cron/tx.amino";
import * as _421 from "./dex/tx.amino";
import * as _422 from "./feeburner/tx.amino";
import * as _423 from "./feerefunder/tx.amino";
import * as _424 from "./interchainqueries/tx.amino";
import * as _425 from "./interchaintxs/v1/tx.amino";
import * as _426 from "./cron/tx.registry";
import * as _427 from "./dex/tx.registry";
import * as _428 from "./feeburner/tx.registry";
import * as _429 from "./feerefunder/tx.registry";
import * as _430 from "./interchainqueries/tx.registry";
import * as _431 from "./interchaintxs/v1/tx.registry";
import * as _432 from "./cron/query.rpc.Query";
import * as _433 from "./dex/query.rpc.Query";
import * as _434 from "./feeburner/query.rpc.Query";
import * as _435 from "./feerefunder/query.rpc.Query";
import * as _436 from "./interchainqueries/query.rpc.Query";
import * as _437 from "./interchaintxs/v1/query.rpc.Query";
import * as _438 from "./cron/tx.rpc.msg";
import * as _439 from "./dex/tx.rpc.msg";
import * as _440 from "./feeburner/tx.rpc.msg";
import * as _441 from "./feerefunder/tx.rpc.msg";
import * as _442 from "./interchainqueries/tx.rpc.msg";
import * as _443 from "./interchaintxs/v1/tx.rpc.msg";
import * as _547 from "./rpc.query";
import * as _548 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._153
    };
  }
  export const cron = {
    ..._154,
    ..._155,
    ..._156,
    ..._157,
    ..._158,
    ..._420,
    ..._426,
    ..._432,
    ..._438
  };
  export const dex = {
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._163,
    ..._164,
    ..._165,
    ..._166,
    ..._167,
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._421,
    ..._427,
    ..._433,
    ..._439
  };
  export const feeburner = {
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._177,
    ..._422,
    ..._428,
    ..._434,
    ..._440
  };
  export const feerefunder = {
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._182,
    ..._423,
    ..._429,
    ..._435,
    ..._441
  };
  export const interchainqueries = {
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._424,
    ..._430,
    ..._436,
    ..._442
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._187,
      ..._188,
      ..._189,
      ..._190,
      ..._425,
      ..._431,
      ..._437,
      ..._443
    };
  }
  export const ClientFactory = {
    ..._547,
    ..._548
  };
}