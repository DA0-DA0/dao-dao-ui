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
import * as _463 from "./denom/tx.amino";
import * as _464 from "./oracle/tx.amino";
import * as _465 from "./denom/tx.registry";
import * as _466 from "./oracle/tx.registry";
import * as _467 from "./denom/query.rpc.Query";
import * as _468 from "./oracle/query.rpc.Query";
import * as _469 from "./scheduler/query.rpc.Query";
import * as _470 from "./denom/tx.rpc.msg";
import * as _471 from "./oracle/tx.rpc.msg";
import * as _631 from "./rpc.query";
import * as _632 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._148,
    ..._463,
    ..._465,
    ..._467,
    ..._470
  };
  export const oracle = {
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._464,
    ..._466,
    ..._468,
    ..._471
  };
  export const scheduler = {
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._157,
    ..._469
  };
  export const ClientFactory = {
    ..._631,
    ..._632
  };
}