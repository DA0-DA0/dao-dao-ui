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
import * as _440 from "./denom/tx.amino";
import * as _441 from "./oracle/tx.amino";
import * as _442 from "./denom/tx.registry";
import * as _443 from "./oracle/tx.registry";
import * as _444 from "./denom/query.rpc.Query";
import * as _445 from "./oracle/query.rpc.Query";
import * as _446 from "./scheduler/query.rpc.Query";
import * as _447 from "./denom/tx.rpc.msg";
import * as _448 from "./oracle/tx.rpc.msg";
import * as _590 from "./rpc.query";
import * as _591 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._143,
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._440,
    ..._442,
    ..._444,
    ..._447
  };
  export const oracle = {
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._441,
    ..._443,
    ..._445,
    ..._448
  };
  export const scheduler = {
    ..._152,
    ..._153,
    ..._154,
    ..._155,
    ..._156,
    ..._446
  };
  export const ClientFactory = {
    ..._590,
    ..._591
  };
}