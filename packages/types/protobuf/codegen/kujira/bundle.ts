import * as _139 from "./denom/authorityMetadata";
import * as _140 from "./denom/genesis";
import * as _141 from "./denom/params";
import * as _142 from "./denom/query";
import * as _143 from "./denom/tx";
import * as _144 from "./oracle/genesis";
import * as _145 from "./oracle/oracle";
import * as _146 from "./oracle/query";
import * as _147 from "./oracle/tx";
import * as _148 from "./scheduler/genesis";
import * as _149 from "./scheduler/hook";
import * as _150 from "./scheduler/params";
import * as _151 from "./scheduler/proposal";
import * as _152 from "./scheduler/query";
import * as _411 from "./denom/tx.amino";
import * as _412 from "./oracle/tx.amino";
import * as _413 from "./denom/tx.registry";
import * as _414 from "./oracle/tx.registry";
import * as _415 from "./denom/query.rpc.Query";
import * as _416 from "./oracle/query.rpc.Query";
import * as _417 from "./scheduler/query.rpc.Query";
import * as _418 from "./denom/tx.rpc.msg";
import * as _419 from "./oracle/tx.rpc.msg";
import * as _545 from "./rpc.query";
import * as _546 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._139,
    ..._140,
    ..._141,
    ..._142,
    ..._143,
    ..._411,
    ..._413,
    ..._415,
    ..._418
  };
  export const oracle = {
    ..._144,
    ..._145,
    ..._146,
    ..._147,
    ..._412,
    ..._414,
    ..._416,
    ..._419
  };
  export const scheduler = {
    ..._148,
    ..._149,
    ..._150,
    ..._151,
    ..._152,
    ..._417
  };
  export const ClientFactory = {
    ..._545,
    ..._546
  };
}