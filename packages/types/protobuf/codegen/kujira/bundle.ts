import * as _154 from "./denom/authorityMetadata";
import * as _155 from "./denom/genesis";
import * as _156 from "./denom/params";
import * as _157 from "./denom/query";
import * as _158 from "./denom/tx";
import * as _159 from "./oracle/genesis";
import * as _160 from "./oracle/oracle";
import * as _161 from "./oracle/query";
import * as _162 from "./oracle/tx";
import * as _163 from "./scheduler/genesis";
import * as _164 from "./scheduler/hook";
import * as _165 from "./scheduler/params";
import * as _166 from "./scheduler/proposal";
import * as _167 from "./scheduler/query";
import * as _486 from "./denom/tx.amino";
import * as _487 from "./oracle/tx.amino";
import * as _488 from "./denom/tx.registry";
import * as _489 from "./oracle/tx.registry";
import * as _490 from "./denom/query.rpc.Query";
import * as _491 from "./oracle/query.rpc.Query";
import * as _492 from "./scheduler/query.rpc.Query";
import * as _493 from "./denom/tx.rpc.msg";
import * as _494 from "./oracle/tx.rpc.msg";
import * as _660 from "./rpc.query";
import * as _661 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._154,
    ..._155,
    ..._156,
    ..._157,
    ..._158,
    ..._486,
    ..._488,
    ..._490,
    ..._493
  };
  export const oracle = {
    ..._159,
    ..._160,
    ..._161,
    ..._162,
    ..._487,
    ..._489,
    ..._491,
    ..._494
  };
  export const scheduler = {
    ..._163,
    ..._164,
    ..._165,
    ..._166,
    ..._167,
    ..._492
  };
  export const ClientFactory = {
    ..._660,
    ..._661
  };
}