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
import * as _471 from "./denom/tx.amino";
import * as _472 from "./oracle/tx.amino";
import * as _473 from "./denom/tx.registry";
import * as _474 from "./oracle/tx.registry";
import * as _475 from "./denom/query.rpc.Query";
import * as _476 from "./oracle/query.rpc.Query";
import * as _477 from "./scheduler/query.rpc.Query";
import * as _478 from "./denom/tx.rpc.msg";
import * as _479 from "./oracle/tx.rpc.msg";
import * as _641 from "./rpc.query";
import * as _642 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._471,
    ..._473,
    ..._475,
    ..._478
  };
  export const oracle = {
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._472,
    ..._474,
    ..._476,
    ..._479
  };
  export const scheduler = {
    ..._157,
    ..._158,
    ..._159,
    ..._160,
    ..._161,
    ..._477
  };
  export const ClientFactory = {
    ..._641,
    ..._642
  };
}