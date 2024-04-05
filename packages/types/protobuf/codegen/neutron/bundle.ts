import * as _139 from "./contractmanager/v1/failure";
import * as _140 from "./cron/genesis";
import * as _141 from "./cron/params";
import * as _142 from "./cron/query";
import * as _143 from "./cron/schedule";
import * as _144 from "./cron/tx";
import * as _145 from "./dex/deposit_record";
import * as _146 from "./dex/genesis";
import * as _147 from "./dex/limit_order_expiration";
import * as _148 from "./dex/limit_order_tranche_user";
import * as _149 from "./dex/limit_order_tranche";
import * as _150 from "./dex/pair_id";
import * as _151 from "./dex/params";
import * as _152 from "./dex/pool_metadata";
import * as _153 from "./dex/pool_reserves";
import * as _154 from "./dex/pool";
import * as _155 from "./dex/query";
import * as _156 from "./dex/tick_liquidity";
import * as _157 from "./dex/trade_pair_id";
import * as _158 from "./dex/tx";
import * as _159 from "./feeburner/genesis";
import * as _160 from "./feeburner/params";
import * as _161 from "./feeburner/query";
import * as _162 from "./feeburner/total_burned_neutrons_amount";
import * as _163 from "./feeburner/tx";
import * as _164 from "./feerefunder/fee";
import * as _165 from "./feerefunder/genesis";
import * as _166 from "./feerefunder/params";
import * as _167 from "./feerefunder/query";
import * as _168 from "./feerefunder/tx";
import * as _169 from "./interchainqueries/genesis";
import * as _170 from "./interchainqueries/params";
import * as _171 from "./interchainqueries/query";
import * as _172 from "./interchainqueries/tx";
import * as _173 from "./interchaintxs/v1/genesis";
import * as _174 from "./interchaintxs/v1/params";
import * as _175 from "./interchaintxs/v1/query";
import * as _176 from "./interchaintxs/v1/tx";
import * as _395 from "./cron/tx.amino";
import * as _396 from "./dex/tx.amino";
import * as _397 from "./feeburner/tx.amino";
import * as _398 from "./feerefunder/tx.amino";
import * as _399 from "./interchainqueries/tx.amino";
import * as _400 from "./interchaintxs/v1/tx.amino";
import * as _401 from "./cron/tx.registry";
import * as _402 from "./dex/tx.registry";
import * as _403 from "./feeburner/tx.registry";
import * as _404 from "./feerefunder/tx.registry";
import * as _405 from "./interchainqueries/tx.registry";
import * as _406 from "./interchaintxs/v1/tx.registry";
import * as _407 from "./cron/query.rpc.Query";
import * as _408 from "./dex/query.rpc.Query";
import * as _409 from "./feeburner/query.rpc.Query";
import * as _410 from "./feerefunder/query.rpc.Query";
import * as _411 from "./interchainqueries/query.rpc.Query";
import * as _412 from "./interchaintxs/v1/query.rpc.Query";
import * as _413 from "./cron/tx.rpc.msg";
import * as _414 from "./dex/tx.rpc.msg";
import * as _415 from "./feeburner/tx.rpc.msg";
import * as _416 from "./feerefunder/tx.rpc.msg";
import * as _417 from "./interchainqueries/tx.rpc.msg";
import * as _418 from "./interchaintxs/v1/tx.rpc.msg";
import * as _517 from "./rpc.query";
import * as _518 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._139
    };
  }
  export const cron = {
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._144,
    ..._395,
    ..._401,
    ..._407,
    ..._413
  };
  export const dex = {
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
    ..._156,
    ..._157,
    ..._158,
    ..._396,
    ..._402,
    ..._408,
    ..._414
  };
  export const feeburner = {
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._163,
    ..._397,
    ..._403,
    ..._409,
    ..._415
  };
  export const feerefunder = {
    ..._164,
    ..._165,
    ..._166,
    ..._167,
    ..._168,
    ..._398,
    ..._404,
    ..._410,
    ..._416
  };
  export const interchainqueries = {
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._399,
    ..._405,
    ..._411,
    ..._417
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._173,
      ..._174,
      ..._175,
      ..._176,
      ..._400,
      ..._406,
      ..._412,
      ..._418
    };
  }
  export const ClientFactory = {
    ..._517,
    ..._518
  };
}