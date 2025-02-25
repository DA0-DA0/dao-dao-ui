import * as _168 from "./denom/authorityMetadata";
import * as _169 from "./denom/genesis";
import * as _170 from "./denom/params";
import * as _171 from "./denom/query";
import * as _172 from "./denom/tx";
import * as _173 from "./oracle/genesis";
import * as _174 from "./oracle/oracle";
import * as _175 from "./oracle/query";
import * as _176 from "./oracle/tx";
import * as _177 from "./scheduler/genesis";
import * as _178 from "./scheduler/hook";
import * as _179 from "./scheduler/params";
import * as _180 from "./scheduler/proposal";
import * as _181 from "./scheduler/query";
import * as _534 from "./denom/tx.amino";
import * as _535 from "./oracle/tx.amino";
import * as _536 from "./denom/tx.registry";
import * as _537 from "./oracle/tx.registry";
import * as _538 from "./denom/query.rpc.Query";
import * as _539 from "./oracle/query.rpc.Query";
import * as _540 from "./scheduler/query.rpc.Query";
import * as _541 from "./denom/tx.rpc.msg";
import * as _542 from "./oracle/tx.rpc.msg";
import * as _723 from "./rpc.query";
import * as _724 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._534,
    ..._536,
    ..._538,
    ..._541
  };
  export const oracle = {
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._535,
    ..._537,
    ..._539,
    ..._542
  };
  export const scheduler = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._540
  };
  export const ClientFactory = {
    ..._723,
    ..._724
  };
}