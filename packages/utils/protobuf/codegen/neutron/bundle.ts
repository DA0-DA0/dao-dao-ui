import * as _120 from "./contractmanager/v1/failure";
import * as _121 from "./cron/genesis";
import * as _122 from "./cron/params";
import * as _123 from "./cron/query";
import * as _124 from "./cron/schedule";
import * as _125 from "./cron/tx";
import * as _126 from "./dex/deposit_record";
import * as _127 from "./dex/genesis";
import * as _128 from "./dex/limit_order_expiration";
import * as _129 from "./dex/limit_order_tranche_user";
import * as _130 from "./dex/limit_order_tranche";
import * as _131 from "./dex/pair_id";
import * as _132 from "./dex/params";
import * as _133 from "./dex/pool_metadata";
import * as _134 from "./dex/pool_reserves";
import * as _135 from "./dex/pool";
import * as _136 from "./dex/query";
import * as _137 from "./dex/tick_liquidity";
import * as _138 from "./dex/trade_pair_id";
import * as _139 from "./dex/tx";
import * as _140 from "./feeburner/genesis";
import * as _141 from "./feeburner/params";
import * as _142 from "./feeburner/query";
import * as _143 from "./feeburner/total_burned_neutrons_amount";
import * as _144 from "./feeburner/tx";
import * as _145 from "./feerefunder/fee";
import * as _146 from "./feerefunder/genesis";
import * as _147 from "./feerefunder/params";
import * as _148 from "./feerefunder/query";
import * as _149 from "./feerefunder/tx";
import * as _150 from "./interchainqueries/genesis";
import * as _151 from "./interchainqueries/params";
import * as _152 from "./interchainqueries/query";
import * as _153 from "./interchainqueries/tx";
import * as _154 from "./interchaintxs/v1/genesis";
import * as _155 from "./interchaintxs/v1/params";
import * as _156 from "./interchaintxs/v1/query";
import * as _157 from "./interchaintxs/v1/tx";
import * as _368 from "./cron/tx.amino";
import * as _369 from "./dex/tx.amino";
import * as _370 from "./feeburner/tx.amino";
import * as _371 from "./feerefunder/tx.amino";
import * as _372 from "./interchainqueries/tx.amino";
import * as _373 from "./interchaintxs/v1/tx.amino";
import * as _374 from "./cron/tx.registry";
import * as _375 from "./dex/tx.registry";
import * as _376 from "./feeburner/tx.registry";
import * as _377 from "./feerefunder/tx.registry";
import * as _378 from "./interchainqueries/tx.registry";
import * as _379 from "./interchaintxs/v1/tx.registry";
import * as _380 from "./cron/query.rpc.Query";
import * as _381 from "./dex/query.rpc.Query";
import * as _382 from "./feeburner/query.rpc.Query";
import * as _383 from "./feerefunder/query.rpc.Query";
import * as _384 from "./interchainqueries/query.rpc.Query";
import * as _385 from "./interchaintxs/v1/query.rpc.Query";
import * as _386 from "./cron/tx.rpc.msg";
import * as _387 from "./dex/tx.rpc.msg";
import * as _388 from "./feeburner/tx.rpc.msg";
import * as _389 from "./feerefunder/tx.rpc.msg";
import * as _390 from "./interchainqueries/tx.rpc.msg";
import * as _391 from "./interchaintxs/v1/tx.rpc.msg";
import * as _488 from "./rpc.query";
import * as _489 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._120
    };
  }
  export const cron = {
    ..._121,
    ..._122,
    ..._123,
    ..._124,
    ..._125,
    ..._368,
    ..._374,
    ..._380,
    ..._386
  };
  export const dex = {
    ..._126,
    ..._127,
    ..._128,
    ..._129,
    ..._130,
    ..._131,
    ..._132,
    ..._133,
    ..._134,
    ..._135,
    ..._136,
    ..._137,
    ..._138,
    ..._139,
    ..._369,
    ..._375,
    ..._381,
    ..._387
  };
  export const feeburner = {
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._144,
    ..._370,
    ..._376,
    ..._382,
    ..._388
  };
  export const feerefunder = {
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._149,
    ..._371,
    ..._377,
    ..._383,
    ..._389
  };
  export const interchainqueries = {
    ..._150,
    ..._151,
    ..._152,
    ..._153,
    ..._372,
    ..._378,
    ..._384,
    ..._390
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._373,
      ..._379,
      ..._385,
      ..._391
    };
  }
  export const ClientFactory = {
    ..._488,
    ..._489
  };
}