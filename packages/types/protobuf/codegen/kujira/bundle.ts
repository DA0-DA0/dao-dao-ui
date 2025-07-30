import * as _186 from "./denom/authorityMetadata";
import * as _187 from "./denom/genesis";
import * as _188 from "./denom/params";
import * as _189 from "./denom/query";
import * as _190 from "./denom/tx";
import * as _191 from "./oracle/genesis";
import * as _192 from "./oracle/oracle";
import * as _193 from "./oracle/query";
import * as _194 from "./oracle/tx";
import * as _195 from "./scheduler/genesis";
import * as _196 from "./scheduler/hook";
import * as _197 from "./scheduler/params";
import * as _198 from "./scheduler/proposal";
import * as _199 from "./scheduler/query";
import * as _653 from "./denom/tx.amino";
import * as _654 from "./oracle/tx.amino";
import * as _655 from "./denom/tx.registry";
import * as _656 from "./oracle/tx.registry";
import * as _657 from "./denom/query.rpc.Query";
import * as _658 from "./oracle/query.rpc.Query";
import * as _659 from "./scheduler/query.rpc.Query";
import * as _660 from "./denom/tx.rpc.msg";
import * as _661 from "./oracle/tx.rpc.msg";
import * as _891 from "./rpc.query";
import * as _892 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._186,
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._653,
    ..._655,
    ..._657,
    ..._660
  };
  export const oracle = {
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._654,
    ..._656,
    ..._658,
    ..._661
  };
  export const scheduler = {
    ..._195,
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._659
  };
  export const ClientFactory = {
    ..._891,
    ..._892
  };
}