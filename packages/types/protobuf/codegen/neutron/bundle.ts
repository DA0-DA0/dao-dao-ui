import * as _157 from "./contractmanager/v1/failure";
import * as _158 from "./cron/genesis";
import * as _159 from "./cron/params";
import * as _160 from "./cron/query";
import * as _161 from "./cron/schedule";
import * as _162 from "./cron/tx";
import * as _163 from "./dex/deposit_record";
import * as _164 from "./dex/genesis";
import * as _165 from "./dex/limit_order_expiration";
import * as _166 from "./dex/limit_order_tranche_user";
import * as _167 from "./dex/limit_order_tranche";
import * as _168 from "./dex/pair_id";
import * as _169 from "./dex/params";
import * as _170 from "./dex/pool_metadata";
import * as _171 from "./dex/pool_reserves";
import * as _172 from "./dex/pool";
import * as _173 from "./dex/query";
import * as _174 from "./dex/tick_liquidity";
import * as _175 from "./dex/trade_pair_id";
import * as _176 from "./dex/tx";
import * as _177 from "./feeburner/genesis";
import * as _178 from "./feeburner/params";
import * as _179 from "./feeburner/query";
import * as _180 from "./feeburner/total_burned_neutrons_amount";
import * as _181 from "./feeburner/tx";
import * as _182 from "./feerefunder/fee";
import * as _183 from "./feerefunder/genesis";
import * as _184 from "./feerefunder/params";
import * as _185 from "./feerefunder/query";
import * as _186 from "./feerefunder/tx";
import * as _187 from "./interchainqueries/genesis";
import * as _188 from "./interchainqueries/params";
import * as _189 from "./interchainqueries/query";
import * as _190 from "./interchainqueries/tx";
import * as _191 from "./interchaintxs/v1/genesis";
import * as _192 from "./interchaintxs/v1/params";
import * as _193 from "./interchaintxs/v1/query";
import * as _194 from "./interchaintxs/v1/tx";
import * as _428 from "./cron/tx.amino";
import * as _429 from "./dex/tx.amino";
import * as _430 from "./feeburner/tx.amino";
import * as _431 from "./feerefunder/tx.amino";
import * as _432 from "./interchainqueries/tx.amino";
import * as _433 from "./interchaintxs/v1/tx.amino";
import * as _434 from "./cron/tx.registry";
import * as _435 from "./dex/tx.registry";
import * as _436 from "./feeburner/tx.registry";
import * as _437 from "./feerefunder/tx.registry";
import * as _438 from "./interchainqueries/tx.registry";
import * as _439 from "./interchaintxs/v1/tx.registry";
import * as _440 from "./cron/query.rpc.Query";
import * as _441 from "./dex/query.rpc.Query";
import * as _442 from "./feeburner/query.rpc.Query";
import * as _443 from "./feerefunder/query.rpc.Query";
import * as _444 from "./interchainqueries/query.rpc.Query";
import * as _445 from "./interchaintxs/v1/query.rpc.Query";
import * as _446 from "./cron/tx.rpc.msg";
import * as _447 from "./dex/tx.rpc.msg";
import * as _448 from "./feeburner/tx.rpc.msg";
import * as _449 from "./feerefunder/tx.rpc.msg";
import * as _450 from "./interchainqueries/tx.rpc.msg";
import * as _451 from "./interchaintxs/v1/tx.rpc.msg";
import * as _555 from "./rpc.query";
import * as _556 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._157
    };
  }
  export const cron = {
    ..._158,
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._428,
    ..._434,
    ..._440,
    ..._446
  };
  export const dex = {
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
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._429,
    ..._435,
    ..._441,
    ..._447
  };
  export const feeburner = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._430,
    ..._436,
    ..._442,
    ..._448
  };
  export const feerefunder = {
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._431,
    ..._437,
    ..._443,
    ..._449
  };
  export const interchainqueries = {
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._432,
    ..._438,
    ..._444,
    ..._450
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._191,
      ..._192,
      ..._193,
      ..._194,
      ..._433,
      ..._439,
      ..._445,
      ..._451
    };
  }
  export const ClientFactory = {
    ..._555,
    ..._556
  };
}