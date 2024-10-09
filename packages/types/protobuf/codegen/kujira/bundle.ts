import * as _162 from "./denom/authorityMetadata";
import * as _163 from "./denom/genesis";
import * as _164 from "./denom/params";
import * as _165 from "./denom/query";
import * as _166 from "./denom/tx";
import * as _167 from "./oracle/genesis";
import * as _168 from "./oracle/oracle";
import * as _169 from "./oracle/query";
import * as _170 from "./oracle/tx";
import * as _171 from "./scheduler/genesis";
import * as _172 from "./scheduler/hook";
import * as _173 from "./scheduler/params";
import * as _174 from "./scheduler/proposal";
import * as _175 from "./scheduler/query";
import * as _502 from "./denom/tx.amino";
import * as _503 from "./oracle/tx.amino";
import * as _504 from "./denom/tx.registry";
import * as _505 from "./oracle/tx.registry";
import * as _506 from "./denom/query.rpc.Query";
import * as _507 from "./oracle/query.rpc.Query";
import * as _508 from "./scheduler/query.rpc.Query";
import * as _509 from "./denom/tx.rpc.msg";
import * as _510 from "./oracle/tx.rpc.msg";
import * as _679 from "./rpc.query";
import * as _680 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._162,
    ..._163,
    ..._164,
    ..._165,
    ..._166,
    ..._502,
    ..._504,
    ..._506,
    ..._509
  };
  export const oracle = {
    ..._167,
    ..._168,
    ..._169,
    ..._170,
    ..._503,
    ..._505,
    ..._507,
    ..._510
  };
  export const scheduler = {
    ..._171,
    ..._172,
    ..._173,
    ..._174,
    ..._175,
    ..._508
  };
  export const ClientFactory = {
    ..._679,
    ..._680
  };
}