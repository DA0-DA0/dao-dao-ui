import * as _147 from "./denom/authorityMetadata";
import * as _148 from "./denom/genesis";
import * as _149 from "./denom/params";
import * as _150 from "./denom/query";
import * as _151 from "./denom/tx";
import * as _152 from "./oracle/genesis";
import * as _153 from "./oracle/oracle";
import * as _154 from "./oracle/query";
import * as _155 from "./oracle/tx";
import * as _156 from "./scheduler/genesis";
import * as _157 from "./scheduler/hook";
import * as _158 from "./scheduler/params";
import * as _159 from "./scheduler/proposal";
import * as _160 from "./scheduler/query";
import * as _451 from "./denom/tx.amino";
import * as _452 from "./oracle/tx.amino";
import * as _453 from "./denom/tx.registry";
import * as _454 from "./oracle/tx.registry";
import * as _455 from "./denom/query.rpc.Query";
import * as _456 from "./oracle/query.rpc.Query";
import * as _457 from "./scheduler/query.rpc.Query";
import * as _458 from "./denom/tx.rpc.msg";
import * as _459 from "./oracle/tx.rpc.msg";
import * as _602 from "./rpc.query";
import * as _603 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._147,
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._451,
    ..._453,
    ..._455,
    ..._458
  };
  export const oracle = {
    ..._152,
    ..._153,
    ..._154,
    ..._155,
    ..._452,
    ..._454,
    ..._456,
    ..._459
  };
  export const scheduler = {
    ..._156,
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._457
  };
  export const ClientFactory = {
    ..._602,
    ..._603
  };
}