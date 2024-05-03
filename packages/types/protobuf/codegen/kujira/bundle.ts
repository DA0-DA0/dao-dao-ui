import * as _146 from "./denom/authorityMetadata";
import * as _147 from "./denom/genesis";
import * as _148 from "./denom/params";
import * as _149 from "./denom/query";
import * as _150 from "./denom/tx";
import * as _151 from "./oracle/genesis";
import * as _152 from "./oracle/oracle";
import * as _153 from "./oracle/query";
import * as _154 from "./oracle/tx";
import * as _155 from "./scheduler/genesis";
import * as _156 from "./scheduler/hook";
import * as _157 from "./scheduler/params";
import * as _158 from "./scheduler/proposal";
import * as _159 from "./scheduler/query";
import * as _447 from "./denom/tx.amino";
import * as _448 from "./oracle/tx.amino";
import * as _449 from "./denom/tx.registry";
import * as _450 from "./oracle/tx.registry";
import * as _451 from "./denom/query.rpc.Query";
import * as _452 from "./oracle/query.rpc.Query";
import * as _453 from "./scheduler/query.rpc.Query";
import * as _454 from "./denom/tx.rpc.msg";
import * as _455 from "./oracle/tx.rpc.msg";
import * as _597 from "./rpc.query";
import * as _598 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._146,
    ..._147,
    ..._148,
    ..._149,
    ..._150,
    ..._447,
    ..._449,
    ..._451,
    ..._454
  };
  export const oracle = {
    ..._151,
    ..._152,
    ..._153,
    ..._154,
    ..._448,
    ..._450,
    ..._452,
    ..._455
  };
  export const scheduler = {
    ..._155,
    ..._156,
    ..._157,
    ..._158,
    ..._159,
    ..._453
  };
  export const ClientFactory = {
    ..._597,
    ..._598
  };
}