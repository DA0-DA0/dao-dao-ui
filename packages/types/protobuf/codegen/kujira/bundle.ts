import * as _143 from "./denom/authorityMetadata";
import * as _144 from "./denom/genesis";
import * as _145 from "./denom/params";
import * as _146 from "./denom/query";
import * as _147 from "./denom/tx";
import * as _148 from "./oracle/genesis";
import * as _149 from "./oracle/oracle";
import * as _150 from "./oracle/query";
import * as _151 from "./oracle/tx";
import * as _152 from "./scheduler/genesis";
import * as _153 from "./scheduler/hook";
import * as _154 from "./scheduler/params";
import * as _155 from "./scheduler/proposal";
import * as _156 from "./scheduler/query";
import * as _419 from "./denom/tx.amino";
import * as _420 from "./oracle/tx.amino";
import * as _421 from "./denom/tx.registry";
import * as _422 from "./oracle/tx.registry";
import * as _423 from "./denom/query.rpc.Query";
import * as _424 from "./oracle/query.rpc.Query";
import * as _425 from "./scheduler/query.rpc.Query";
import * as _426 from "./denom/tx.rpc.msg";
import * as _427 from "./oracle/tx.rpc.msg";
import * as _553 from "./rpc.query";
import * as _554 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._419,
    ..._421,
    ..._423,
    ..._426
  };
  export const oracle = {
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._420,
    ..._422,
    ..._424,
    ..._427
  };
  export const scheduler = {
    ..._152,
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._425
  };
  export const ClientFactory = {
    ..._553,
    ..._554
  };
}