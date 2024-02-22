import * as _119 from "./contractmanager/v1/failure";
import * as _120 from "./cron/genesis";
import * as _121 from "./cron/params";
import * as _122 from "./cron/query";
import * as _123 from "./cron/schedule";
import * as _124 from "./cron/tx";
import * as _125 from "./dex/deposit_record";
import * as _126 from "./dex/genesis";
import * as _127 from "./dex/limit_order_expiration";
import * as _128 from "./dex/limit_order_tranche_user";
import * as _129 from "./dex/limit_order_tranche";
import * as _130 from "./dex/pair_id";
import * as _131 from "./dex/params";
import * as _132 from "./dex/pool_metadata";
import * as _133 from "./dex/pool_reserves";
import * as _134 from "./dex/pool";
import * as _135 from "./dex/query";
import * as _136 from "./dex/tick_liquidity";
import * as _137 from "./dex/trade_pair_id";
import * as _138 from "./dex/tx";
import * as _139 from "./feeburner/genesis";
import * as _140 from "./feeburner/params";
import * as _141 from "./feeburner/query";
import * as _142 from "./feeburner/total_burned_neutrons_amount";
import * as _143 from "./feeburner/tx";
import * as _144 from "./feerefunder/fee";
import * as _145 from "./feerefunder/genesis";
import * as _146 from "./feerefunder/params";
import * as _147 from "./feerefunder/query";
import * as _148 from "./feerefunder/tx";
import * as _149 from "./interchainqueries/genesis";
import * as _150 from "./interchainqueries/params";
import * as _151 from "./interchainqueries/query";
import * as _152 from "./interchainqueries/tx";
import * as _153 from "./interchaintxs/v1/genesis";
import * as _154 from "./interchaintxs/v1/params";
import * as _155 from "./interchaintxs/v1/query";
import * as _156 from "./interchaintxs/v1/tx";
import * as _367 from "./cron/tx.amino";
import * as _368 from "./dex/tx.amino";
import * as _369 from "./feeburner/tx.amino";
import * as _370 from "./feerefunder/tx.amino";
import * as _371 from "./interchainqueries/tx.amino";
import * as _372 from "./interchaintxs/v1/tx.amino";
import * as _373 from "./cron/tx.registry";
import * as _374 from "./dex/tx.registry";
import * as _375 from "./feeburner/tx.registry";
import * as _376 from "./feerefunder/tx.registry";
import * as _377 from "./interchainqueries/tx.registry";
import * as _378 from "./interchaintxs/v1/tx.registry";
import * as _379 from "./cron/query.rpc.Query";
import * as _380 from "./dex/query.rpc.Query";
import * as _381 from "./feeburner/query.rpc.Query";
import * as _382 from "./feerefunder/query.rpc.Query";
import * as _383 from "./interchainqueries/query.rpc.Query";
import * as _384 from "./interchaintxs/v1/query.rpc.Query";
import * as _385 from "./cron/tx.rpc.msg";
import * as _386 from "./dex/tx.rpc.msg";
import * as _387 from "./feeburner/tx.rpc.msg";
import * as _388 from "./feerefunder/tx.rpc.msg";
import * as _389 from "./interchainqueries/tx.rpc.msg";
import * as _390 from "./interchaintxs/v1/tx.rpc.msg";
import * as _487 from "./rpc.query";
import * as _488 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._119
    };
  }
  export const cron = {
    ..._120,
    ..._121,
    ..._122,
    ..._123,
    ..._124,
    ..._367,
    ..._373,
    ..._379,
    ..._385
  };
  export const dex = {
    ..._125,
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
    ..._368,
    ..._374,
    ..._380,
    ..._386
  };
  export const feeburner = {
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._369,
    ..._375,
    ..._381,
    ..._387
  };
  export const feerefunder = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._370,
    ..._376,
    ..._382,
    ..._388
  };
  export const interchainqueries = {
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._371,
    ..._377,
    ..._383,
    ..._389
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._372,
      ..._378,
      ..._384,
      ..._390
    };
  }
  export const ClientFactory = {
    ..._487,
    ..._488
  };
}