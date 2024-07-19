import * as _168 from "./contractmanager/v1/failure";
import * as _169 from "./cron/genesis";
import * as _170 from "./cron/params";
import * as _171 from "./cron/query";
import * as _172 from "./cron/schedule";
import * as _173 from "./cron/tx";
import * as _174 from "./dex/deposit_record";
import * as _175 from "./dex/genesis";
import * as _176 from "./dex/limit_order_expiration";
import * as _177 from "./dex/limit_order_tranche_user";
import * as _178 from "./dex/limit_order_tranche";
import * as _179 from "./dex/pair_id";
import * as _180 from "./dex/params";
import * as _181 from "./dex/pool_metadata";
import * as _182 from "./dex/pool_reserves";
import * as _183 from "./dex/pool";
import * as _184 from "./dex/query";
import * as _185 from "./dex/tick_liquidity";
import * as _186 from "./dex/trade_pair_id";
import * as _187 from "./dex/tx";
import * as _188 from "./feeburner/genesis";
import * as _189 from "./feeburner/params";
import * as _190 from "./feeburner/query";
import * as _191 from "./feeburner/total_burned_neutrons_amount";
import * as _192 from "./feeburner/tx";
import * as _193 from "./feerefunder/fee";
import * as _194 from "./feerefunder/genesis";
import * as _195 from "./feerefunder/params";
import * as _196 from "./feerefunder/query";
import * as _197 from "./feerefunder/tx";
import * as _198 from "./interchainqueries/genesis";
import * as _199 from "./interchainqueries/params";
import * as _200 from "./interchainqueries/query";
import * as _201 from "./interchainqueries/tx";
import * as _202 from "./interchaintxs/v1/genesis";
import * as _203 from "./interchaintxs/v1/params";
import * as _204 from "./interchaintxs/v1/query";
import * as _205 from "./interchaintxs/v1/tx";
import * as _495 from "./cron/tx.amino";
import * as _496 from "./dex/tx.amino";
import * as _497 from "./feeburner/tx.amino";
import * as _498 from "./feerefunder/tx.amino";
import * as _499 from "./interchainqueries/tx.amino";
import * as _500 from "./interchaintxs/v1/tx.amino";
import * as _501 from "./cron/tx.registry";
import * as _502 from "./dex/tx.registry";
import * as _503 from "./feeburner/tx.registry";
import * as _504 from "./feerefunder/tx.registry";
import * as _505 from "./interchainqueries/tx.registry";
import * as _506 from "./interchaintxs/v1/tx.registry";
import * as _507 from "./cron/query.rpc.Query";
import * as _508 from "./dex/query.rpc.Query";
import * as _509 from "./feeburner/query.rpc.Query";
import * as _510 from "./feerefunder/query.rpc.Query";
import * as _511 from "./interchainqueries/query.rpc.Query";
import * as _512 from "./interchaintxs/v1/query.rpc.Query";
import * as _513 from "./cron/tx.rpc.msg";
import * as _514 from "./dex/tx.rpc.msg";
import * as _515 from "./feeburner/tx.rpc.msg";
import * as _516 from "./feerefunder/tx.rpc.msg";
import * as _517 from "./interchainqueries/tx.rpc.msg";
import * as _518 from "./interchaintxs/v1/tx.rpc.msg";
import * as _662 from "./rpc.query";
import * as _663 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._168
    };
  }
  export const cron = {
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._495,
    ..._501,
    ..._507,
    ..._513
  };
  export const dex = {
    ..._174,
    ..._175,
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._496,
    ..._502,
    ..._508,
    ..._514
  };
  export const feeburner = {
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._497,
    ..._503,
    ..._509,
    ..._515
  };
  export const feerefunder = {
    ..._193,
    ..._194,
    ..._195,
    ..._196,
    ..._197,
    ..._498,
    ..._504,
    ..._510,
    ..._516
  };
  export const interchainqueries = {
    ..._198,
    ..._199,
    ..._200,
    ..._201,
    ..._499,
    ..._505,
    ..._511,
    ..._517
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._500,
      ..._506,
      ..._512,
      ..._518
    };
  }
  export const ClientFactory = {
    ..._662,
    ..._663
  };
}