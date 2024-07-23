import * as _161 from "./denom/authorityMetadata";
import * as _162 from "./denom/genesis";
import * as _163 from "./denom/params";
import * as _164 from "./denom/query";
import * as _165 from "./denom/tx";
import * as _166 from "./oracle/genesis";
import * as _167 from "./oracle/oracle";
import * as _168 from "./oracle/query";
import * as _169 from "./oracle/tx";
import * as _170 from "./scheduler/genesis";
import * as _171 from "./scheduler/hook";
import * as _172 from "./scheduler/params";
import * as _173 from "./scheduler/proposal";
import * as _174 from "./scheduler/query";
import * as _497 from "./denom/tx.amino";
import * as _498 from "./oracle/tx.amino";
import * as _499 from "./denom/tx.registry";
import * as _500 from "./oracle/tx.registry";
import * as _501 from "./denom/query.rpc.Query";
import * as _502 from "./oracle/query.rpc.Query";
import * as _503 from "./scheduler/query.rpc.Query";
import * as _504 from "./denom/tx.rpc.msg";
import * as _505 from "./oracle/tx.rpc.msg";
import * as _673 from "./rpc.query";
import * as _674 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._161,
    ..._162,
    ..._163,
    ..._164,
    ..._165,
    ..._497,
    ..._499,
    ..._501,
    ..._504
  };
  export const oracle = {
    ..._166,
    ..._167,
    ..._168,
    ..._169,
    ..._498,
    ..._500,
    ..._502,
    ..._505
  };
  export const scheduler = {
    ..._170,
    ..._171,
    ..._172,
    ..._173,
    ..._174,
    ..._503
  };
  export const ClientFactory = {
    ..._673,
    ..._674
  };
}