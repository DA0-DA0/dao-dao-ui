import * as _148 from "./denom/authorityMetadata";
import * as _149 from "./denom/genesis";
import * as _150 from "./denom/params";
import * as _151 from "./denom/query";
import * as _152 from "./denom/tx";
import * as _153 from "./oracle/genesis";
import * as _154 from "./oracle/oracle";
import * as _155 from "./oracle/query";
import * as _156 from "./oracle/tx";
import * as _157 from "./scheduler/genesis";
import * as _158 from "./scheduler/hook";
import * as _159 from "./scheduler/params";
import * as _160 from "./scheduler/proposal";
import * as _161 from "./scheduler/query";
import * as _457 from "./denom/tx.amino";
import * as _458 from "./oracle/tx.amino";
import * as _459 from "./denom/tx.registry";
import * as _460 from "./oracle/tx.registry";
import * as _461 from "./denom/query.rpc.Query";
import * as _462 from "./oracle/query.rpc.Query";
import * as _463 from "./scheduler/query.rpc.Query";
import * as _464 from "./denom/tx.rpc.msg";
import * as _465 from "./oracle/tx.rpc.msg";
import * as _614 from "./rpc.query";
import * as _615 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._457,
    ..._459,
    ..._461,
    ..._464
  };
  export const oracle = {
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._458,
    ..._460,
    ..._462,
    ..._465
  };
  export const scheduler = {
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._161,
    ..._463
  };
  export const ClientFactory = {
    ..._614,
    ..._615
  };
}