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
import * as _633 from "./denom/tx.amino";
import * as _634 from "./oracle/tx.amino";
import * as _635 from "./denom/tx.registry";
import * as _636 from "./oracle/tx.registry";
import * as _637 from "./denom/query.rpc.Query";
import * as _638 from "./oracle/query.rpc.Query";
import * as _639 from "./scheduler/query.rpc.Query";
import * as _640 from "./denom/tx.rpc.msg";
import * as _641 from "./oracle/tx.rpc.msg";
import * as _867 from "./rpc.query";
import * as _868 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._175,
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._633,
    ..._635,
    ..._637,
    ..._640
  };
  export const oracle = {
    ..._180,
    ..._181,
    ..._182,
    ..._183,
    ..._634,
    ..._636,
    ..._638,
    ..._641
  };
  export const scheduler = {
    ..._184,
    ..._185,
    ..._186,
    ..._187,
    ..._188,
    ..._639
  };
  export const ClientFactory = {
    ..._867,
    ..._868
  };
}