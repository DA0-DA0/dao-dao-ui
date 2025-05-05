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
import * as _530 from "./denom/tx.amino";
import * as _531 from "./oracle/tx.amino";
import * as _532 from "./denom/tx.registry";
import * as _533 from "./oracle/tx.registry";
import * as _534 from "./denom/query.rpc.Query";
import * as _535 from "./oracle/query.rpc.Query";
import * as _536 from "./scheduler/query.rpc.Query";
import * as _537 from "./denom/tx.rpc.msg";
import * as _538 from "./oracle/tx.rpc.msg";
import * as _719 from "./rpc.query";
import * as _720 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._530,
    ..._532,
    ..._534,
    ..._537
  };
  export const oracle = {
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._531,
    ..._533,
    ..._535,
    ..._538
  };
  export const scheduler = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._536
  };
  export const ClientFactory = {
    ..._719,
    ..._720
  };
}