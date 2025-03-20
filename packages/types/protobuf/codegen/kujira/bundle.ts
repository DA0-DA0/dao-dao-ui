import * as _172 from "./denom/authorityMetadata";
import * as _173 from "./denom/genesis";
import * as _174 from "./denom/params";
import * as _175 from "./denom/query";
import * as _176 from "./denom/tx";
import * as _177 from "./oracle/genesis";
import * as _178 from "./oracle/oracle";
import * as _179 from "./oracle/query";
import * as _180 from "./oracle/tx";
import * as _181 from "./scheduler/genesis";
import * as _182 from "./scheduler/hook";
import * as _183 from "./scheduler/params";
import * as _184 from "./scheduler/proposal";
import * as _185 from "./scheduler/query";
import * as _538 from "./denom/tx.amino";
import * as _539 from "./oracle/tx.amino";
import * as _540 from "./denom/tx.registry";
import * as _541 from "./oracle/tx.registry";
import * as _542 from "./denom/query.rpc.Query";
import * as _543 from "./oracle/query.rpc.Query";
import * as _544 from "./scheduler/query.rpc.Query";
import * as _545 from "./denom/tx.rpc.msg";
import * as _546 from "./oracle/tx.rpc.msg";
import * as _727 from "./rpc.query";
import * as _728 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._172,
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._538,
    ..._540,
    ..._542,
    ..._545
  };
  export const oracle = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._539,
    ..._541,
    ..._543,
    ..._546
  };
  export const scheduler = {
    ..._181,
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._544
  };
  export const ClientFactory = {
    ..._727,
    ..._728
  };
}