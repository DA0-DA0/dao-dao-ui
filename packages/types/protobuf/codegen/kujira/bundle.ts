import * as _144 from "./denom/authorityMetadata";
import * as _145 from "./denom/genesis";
import * as _146 from "./denom/params";
import * as _147 from "./denom/query";
import * as _148 from "./denom/tx";
import * as _149 from "./oracle/genesis";
import * as _150 from "./oracle/oracle";
import * as _151 from "./oracle/query";
import * as _152 from "./oracle/tx";
import * as _153 from "./scheduler/genesis";
import * as _154 from "./scheduler/hook";
import * as _155 from "./scheduler/params";
import * as _156 from "./scheduler/proposal";
import * as _157 from "./scheduler/query";
import * as _449 from "./denom/tx.amino";
import * as _450 from "./oracle/tx.amino";
import * as _451 from "./denom/tx.registry";
import * as _452 from "./oracle/tx.registry";
import * as _453 from "./denom/query.rpc.Query";
import * as _454 from "./oracle/query.rpc.Query";
import * as _455 from "./scheduler/query.rpc.Query";
import * as _456 from "./denom/tx.rpc.msg";
import * as _457 from "./oracle/tx.rpc.msg";
import * as _604 from "./rpc.query";
import * as _605 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._449,
    ..._451,
    ..._453,
    ..._456
  };
  export const oracle = {
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._450,
    ..._452,
    ..._454,
    ..._457
  };
  export const scheduler = {
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._157,
    ..._455
  };
  export const ClientFactory = {
    ..._604,
    ..._605
  };
}