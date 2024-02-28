import * as _136 from "./contractmanager/v1/failure";
import * as _137 from "./cron/genesis";
import * as _138 from "./cron/params";
import * as _139 from "./cron/query";
import * as _140 from "./cron/schedule";
import * as _141 from "./cron/tx";
import * as _142 from "./dex/deposit_record";
import * as _143 from "./dex/genesis";
import * as _144 from "./dex/limit_order_expiration";
import * as _145 from "./dex/limit_order_tranche_user";
import * as _146 from "./dex/limit_order_tranche";
import * as _147 from "./dex/pair_id";
import * as _148 from "./dex/params";
import * as _149 from "./dex/pool_metadata";
import * as _150 from "./dex/pool_reserves";
import * as _151 from "./dex/pool";
import * as _152 from "./dex/query";
import * as _153 from "./dex/tick_liquidity";
import * as _154 from "./dex/trade_pair_id";
import * as _155 from "./dex/tx";
import * as _156 from "./feeburner/genesis";
import * as _157 from "./feeburner/params";
import * as _158 from "./feeburner/query";
import * as _159 from "./feeburner/total_burned_neutrons_amount";
import * as _160 from "./feeburner/tx";
import * as _161 from "./feerefunder/fee";
import * as _162 from "./feerefunder/genesis";
import * as _163 from "./feerefunder/params";
import * as _164 from "./feerefunder/query";
import * as _165 from "./feerefunder/tx";
import * as _166 from "./interchainqueries/genesis";
import * as _167 from "./interchainqueries/params";
import * as _168 from "./interchainqueries/query";
import * as _169 from "./interchainqueries/tx";
import * as _170 from "./interchaintxs/v1/genesis";
import * as _171 from "./interchaintxs/v1/params";
import * as _172 from "./interchaintxs/v1/query";
import * as _173 from "./interchaintxs/v1/tx";
import * as _388 from "./cron/tx.amino";
import * as _389 from "./dex/tx.amino";
import * as _390 from "./feeburner/tx.amino";
import * as _391 from "./feerefunder/tx.amino";
import * as _392 from "./interchainqueries/tx.amino";
import * as _393 from "./interchaintxs/v1/tx.amino";
import * as _394 from "./cron/tx.registry";
import * as _395 from "./dex/tx.registry";
import * as _396 from "./feeburner/tx.registry";
import * as _397 from "./feerefunder/tx.registry";
import * as _398 from "./interchainqueries/tx.registry";
import * as _399 from "./interchaintxs/v1/tx.registry";
import * as _400 from "./cron/query.rpc.Query";
import * as _401 from "./dex/query.rpc.Query";
import * as _402 from "./feeburner/query.rpc.Query";
import * as _403 from "./feerefunder/query.rpc.Query";
import * as _404 from "./interchainqueries/query.rpc.Query";
import * as _405 from "./interchaintxs/v1/query.rpc.Query";
import * as _406 from "./cron/tx.rpc.msg";
import * as _407 from "./dex/tx.rpc.msg";
import * as _408 from "./feeburner/tx.rpc.msg";
import * as _409 from "./feerefunder/tx.rpc.msg";
import * as _410 from "./interchainqueries/tx.rpc.msg";
import * as _411 from "./interchaintxs/v1/tx.rpc.msg";
import * as _510 from "./rpc.query";
import * as _511 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._136
    };
  }
  export const cron = {
    ..._137,
    ..._138,
    ..._139,
    ..._140,
    ..._141,
    ..._388,
    ..._394,
    ..._400,
    ..._406
  };
  export const dex = {
    ..._142,
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._153,
    ..._154,
    ..._155,
    ..._389,
    ..._395,
    ..._401,
    ..._407
  };
  export const feeburner = {
    ..._156,
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._390,
    ..._396,
    ..._402,
    ..._408
  };
  export const feerefunder = {
    ..._161,
    ..._162,
    ..._163,
    ..._164,
    ..._165,
    ..._391,
    ..._397,
    ..._403,
    ..._409
  };
  export const interchainqueries = {
    ..._166,
    ..._167,
    ..._168,
    ..._169,
    ..._392,
    ..._398,
    ..._404,
    ..._410
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._170,
      ..._171,
      ..._172,
      ..._173,
      ..._393,
      ..._399,
      ..._405,
      ..._411
    };
  }
  export const ClientFactory = {
    ..._510,
    ..._511
  };
}