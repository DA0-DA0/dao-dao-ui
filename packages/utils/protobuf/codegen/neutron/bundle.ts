import * as _109 from "./contractmanager/v1/failure";
import * as _110 from "./cron/genesis";
import * as _111 from "./cron/params";
import * as _112 from "./cron/query";
import * as _113 from "./cron/schedule";
import * as _114 from "./cron/tx";
import * as _115 from "./dex/deposit_record";
import * as _116 from "./dex/genesis";
import * as _117 from "./dex/limit_order_expiration";
import * as _118 from "./dex/limit_order_tranche_user";
import * as _119 from "./dex/limit_order_tranche";
import * as _120 from "./dex/pair_id";
import * as _121 from "./dex/params";
import * as _122 from "./dex/pool_metadata";
import * as _123 from "./dex/pool_reserves";
import * as _124 from "./dex/pool";
import * as _125 from "./dex/query";
import * as _126 from "./dex/tick_liquidity";
import * as _127 from "./dex/trade_pair_id";
import * as _128 from "./dex/tx";
import * as _129 from "./feeburner/genesis";
import * as _130 from "./feeburner/params";
import * as _131 from "./feeburner/query";
import * as _132 from "./feeburner/total_burned_neutrons_amount";
import * as _133 from "./feeburner/tx";
import * as _134 from "./feerefunder/fee";
import * as _135 from "./feerefunder/genesis";
import * as _136 from "./feerefunder/params";
import * as _137 from "./feerefunder/query";
import * as _138 from "./feerefunder/tx";
import * as _139 from "./interchainqueries/genesis";
import * as _140 from "./interchainqueries/params";
import * as _141 from "./interchainqueries/query";
import * as _142 from "./interchainqueries/tx";
import * as _143 from "./interchaintxs/v1/genesis";
import * as _144 from "./interchaintxs/v1/params";
import * as _145 from "./interchaintxs/v1/query";
import * as _146 from "./interchaintxs/v1/tx";
import * as _353 from "./cron/tx.amino";
import * as _354 from "./dex/tx.amino";
import * as _355 from "./feeburner/tx.amino";
import * as _356 from "./feerefunder/tx.amino";
import * as _357 from "./interchainqueries/tx.amino";
import * as _358 from "./interchaintxs/v1/tx.amino";
import * as _359 from "./cron/tx.registry";
import * as _360 from "./dex/tx.registry";
import * as _361 from "./feeburner/tx.registry";
import * as _362 from "./feerefunder/tx.registry";
import * as _363 from "./interchainqueries/tx.registry";
import * as _364 from "./interchaintxs/v1/tx.registry";
import * as _365 from "./cron/query.rpc.Query";
import * as _366 from "./dex/query.rpc.Query";
import * as _367 from "./feeburner/query.rpc.Query";
import * as _368 from "./feerefunder/query.rpc.Query";
import * as _369 from "./interchainqueries/query.rpc.Query";
import * as _370 from "./interchaintxs/v1/query.rpc.Query";
import * as _371 from "./cron/tx.rpc.msg";
import * as _372 from "./dex/tx.rpc.msg";
import * as _373 from "./feeburner/tx.rpc.msg";
import * as _374 from "./feerefunder/tx.rpc.msg";
import * as _375 from "./interchainqueries/tx.rpc.msg";
import * as _376 from "./interchaintxs/v1/tx.rpc.msg";
import * as _471 from "./rpc.query";
import * as _472 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._109
    };
  }
  export const cron = {
    ..._110,
    ..._111,
    ..._112,
    ..._113,
    ..._114,
    ..._353,
    ..._359,
    ..._365,
    ..._371
  };
  export const dex = {
    ..._115,
    ..._116,
    ..._117,
    ..._118,
    ..._119,
    ..._120,
    ..._121,
    ..._122,
    ..._123,
    ..._124,
    ..._125,
    ..._126,
    ..._127,
    ..._128,
    ..._354,
    ..._360,
    ..._366,
    ..._372
  };
  export const feeburner = {
    ..._129,
    ..._130,
    ..._131,
    ..._132,
    ..._133,
    ..._355,
    ..._361,
    ..._367,
    ..._373
  };
  export const feerefunder = {
    ..._134,
    ..._135,
    ..._136,
    ..._137,
    ..._138,
    ..._356,
    ..._362,
    ..._368,
    ..._374
  };
  export const interchainqueries = {
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._357,
    ..._363,
    ..._369,
    ..._375
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._143,
      ..._144,
      ..._145,
      ..._146,
      ..._358,
      ..._364,
      ..._370,
      ..._376
    };
  }
  export const ClientFactory = {
    ..._471,
    ..._472
  };
}