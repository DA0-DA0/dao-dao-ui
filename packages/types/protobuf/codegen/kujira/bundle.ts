import * as _175 from "./denom/authorityMetadata";
import * as _176 from "./denom/genesis";
import * as _177 from "./denom/params";
import * as _178 from "./denom/query";
import * as _179 from "./denom/tx";
import * as _180 from "./oracle/genesis";
import * as _181 from "./oracle/oracle";
import * as _182 from "./oracle/query";
import * as _183 from "./oracle/tx";
import * as _184 from "./scheduler/genesis";
import * as _185 from "./scheduler/hook";
import * as _186 from "./scheduler/params";
import * as _187 from "./scheduler/proposal";
import * as _188 from "./scheduler/query";
import * as _545 from "./denom/tx.amino";
import * as _546 from "./oracle/tx.amino";
import * as _547 from "./denom/tx.registry";
import * as _548 from "./oracle/tx.registry";
import * as _549 from "./denom/query.rpc.Query";
import * as _550 from "./oracle/query.rpc.Query";
import * as _551 from "./scheduler/query.rpc.Query";
import * as _552 from "./denom/tx.rpc.msg";
import * as _553 from "./oracle/tx.rpc.msg";
import * as _740 from "./rpc.query";
import * as _741 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._175,
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._545,
    ..._547,
    ..._549,
    ..._552
  };
  export const oracle = {
    ..._180,
    ..._181,
    ..._182,
    ..._183,
    ..._546,
    ..._548,
    ..._550,
    ..._553
  };
  export const scheduler = {
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._188,
    ..._551
  };
  export const ClientFactory = {
    ..._740,
    ..._741
  };
}