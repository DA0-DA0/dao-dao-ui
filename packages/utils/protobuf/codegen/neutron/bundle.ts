import * as _108 from "./contractmanager/v1/failure";
import * as _109 from "./cron/genesis";
import * as _110 from "./cron/params";
import * as _111 from "./cron/query";
import * as _112 from "./cron/schedule";
import * as _113 from "./cron/tx";
import * as _114 from "./dex/deposit_record";
import * as _115 from "./dex/genesis";
import * as _116 from "./dex/limit_order_expiration";
import * as _117 from "./dex/limit_order_tranche_user";
import * as _118 from "./dex/limit_order_tranche";
import * as _119 from "./dex/pair_id";
import * as _120 from "./dex/params";
import * as _121 from "./dex/pool_metadata";
import * as _122 from "./dex/pool_reserves";
import * as _123 from "./dex/pool";
import * as _124 from "./dex/query";
import * as _125 from "./dex/tick_liquidity";
import * as _126 from "./dex/trade_pair_id";
import * as _127 from "./dex/tx";
import * as _128 from "./feeburner/genesis";
import * as _129 from "./feeburner/params";
import * as _130 from "./feeburner/query";
import * as _131 from "./feeburner/total_burned_neutrons_amount";
import * as _132 from "./feeburner/tx";
import * as _133 from "./feerefunder/fee";
import * as _134 from "./feerefunder/genesis";
import * as _135 from "./feerefunder/params";
import * as _136 from "./feerefunder/query";
import * as _137 from "./feerefunder/tx";
import * as _138 from "./interchainqueries/genesis";
import * as _139 from "./interchainqueries/params";
import * as _140 from "./interchainqueries/query";
import * as _141 from "./interchainqueries/tx";
import * as _142 from "./interchaintxs/v1/genesis";
import * as _143 from "./interchaintxs/v1/params";
import * as _144 from "./interchaintxs/v1/query";
import * as _145 from "./interchaintxs/v1/tx";
import * as _325 from "./cron/tx.amino";
import * as _326 from "./dex/tx.amino";
import * as _327 from "./feeburner/tx.amino";
import * as _328 from "./feerefunder/tx.amino";
import * as _329 from "./interchainqueries/tx.amino";
import * as _330 from "./interchaintxs/v1/tx.amino";
import * as _331 from "./cron/tx.registry";
import * as _332 from "./dex/tx.registry";
import * as _333 from "./feeburner/tx.registry";
import * as _334 from "./feerefunder/tx.registry";
import * as _335 from "./interchainqueries/tx.registry";
import * as _336 from "./interchaintxs/v1/tx.registry";
import * as _337 from "./cron/query.rpc.Query";
import * as _338 from "./dex/query.rpc.Query";
import * as _339 from "./feeburner/query.rpc.Query";
import * as _340 from "./feerefunder/query.rpc.Query";
import * as _341 from "./interchainqueries/query.rpc.Query";
import * as _342 from "./interchaintxs/v1/query.rpc.Query";
import * as _343 from "./cron/tx.rpc.msg";
import * as _344 from "./dex/tx.rpc.msg";
import * as _345 from "./feeburner/tx.rpc.msg";
import * as _346 from "./feerefunder/tx.rpc.msg";
import * as _347 from "./interchainqueries/tx.rpc.msg";
import * as _348 from "./interchaintxs/v1/tx.rpc.msg";
import * as _421 from "./rpc.query";
import * as _422 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._108
    };
  }
  export const cron = {
    ..._109,
    ..._110,
    ..._111,
    ..._112,
    ..._113,
    ..._325,
    ..._331,
    ..._337,
    ..._343
  };
  export const dex = {
    ..._114,
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
    ..._326,
    ..._332,
    ..._338,
    ..._344
  };
  export const feeburner = {
    ..._128,
    ..._129,
    ..._130,
    ..._131,
    ..._132,
    ..._327,
    ..._333,
    ..._339,
    ..._345
  };
  export const feerefunder = {
    ..._133,
    ..._134,
    ..._135,
    ..._136,
    ..._137,
    ..._328,
    ..._334,
    ..._340,
    ..._346
  };
  export const interchainqueries = {
    ..._138,
    ..._139,
    ..._140,
    ..._141,
    ..._329,
    ..._335,
    ..._341,
    ..._347
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._142,
      ..._143,
      ..._144,
      ..._145,
      ..._330,
      ..._336,
      ..._342,
      ..._348
    };
  }
  export const ClientFactory = {
    ..._421,
    ..._422
  };
}